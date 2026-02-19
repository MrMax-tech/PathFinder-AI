
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeAnalysis, CareerPath } from "./types";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeResume = async (text: string): Promise<ResumeAnalysis> => {
  const response = await ai.models.generateContent({
    // Use gemini-3-pro-preview for complex reasoning tasks like resume analysis.
    model: "gemini-3-pro-preview",
    contents: `Analyze this resume text and provide feedback in JSON format: ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          extractedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          keywordGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          bulletPointImprovements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                improved: { type: Type.STRING }
              },
              required: ["original", "improved"]
            }
          }
        },
        required: ["score", "extractedSkills", "keywordGaps", "suggestions", "bulletPointImprovements"]
      }
    }
  });

  // Extract text using the property .text as per guidelines.
  return JSON.parse(response.text || '{}');
};

export const getCareerRecommendations = async (skills: string[], interests: string[]): Promise<CareerPath[]> => {
  const response = await ai.models.generateContent({
    // Use gemini-3-pro-preview for complex reasoning tasks like career path generation.
    model: "gemini-3-pro-preview",
    contents: `Based on skills: ${skills.join(', ')} and interests: ${interests.join(', ')}, recommend 3 career paths with roadmaps in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            marketDemand: { type: Type.STRING },
            matchScore: { type: Type.NUMBER },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING },
                  title: { type: Type.STRING },
                  topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                  resources: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        type: { type: Type.STRING },
                        title: { type: Type.STRING },
                        url: { type: Type.STRING }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  // Extract text using the property .text as per guidelines.
  return JSON.parse(response.text || '[]');
};

export const chatWithMentor = async (message: string, context: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a career mentor on PathFinder AI. Context: ${context}. Help students with roadmaps, technical concepts, and interview prep.`,
    },
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};
