
import React, { useState } from 'react';
import { 
  FileUp, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Download,
  Search,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { analyzeResume } from '../geminiService';
import { ResumeAnalysis } from '../types';

const ResumeAnalyzerView = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    setUploadedFile(file.name);

    // Simulate reading PDF text. In a real app, use a PDF parser library.
    const mockText = `
      John Doe
      Software Engineer
      Skills: React, Node.js, JavaScript, Python
      Experience: 
      - Developed web applications using React.
      - Worked on backend services with Node.js.
    `;

    try {
      const result = await analyzeResume(mockText);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Upload Section */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="bg-slate-900 border-2 border-dashed border-slate-700 p-8 rounded-3xl text-center hover:border-indigo-500 transition-colors group">
            <input 
              type="file" 
              className="hidden" 
              id="resume-upload" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileUpload}
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileUp className="text-slate-400 group-hover:text-indigo-400" size={32} />
              </div>
              <p className="text-slate-200 font-bold mb-1">Upload Resume</p>
              <p className="text-slate-400 text-xs">PDF, DOCX supported (Max 5MB)</p>
            </label>
          </div>

          {uploadedFile && (
            <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3 border border-slate-700">
              <FileText className="text-indigo-400" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-slate-200 truncate">{uploadedFile}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Ready for scan</p>
              </div>
              <button 
                onClick={() => { setAnalysis(null); setUploadedFile(null); }}
                className="text-slate-500 hover:text-red-400"
              >
                <XCircle size={18} />
              </button>
            </div>
          )}

          <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl">
            <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-2">
              <Zap size={16} />
              Why ATS Matters?
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              75% of resumes are rejected by Applicant Tracking Systems before a human sees them. PathFinder AI uses the same scoring logic as top tech companies.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1">
          {analyzing ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-20 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <Search className="absolute inset-0 m-auto text-indigo-500 animate-pulse" size={32} />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Analyzing your strategy...</h3>
                <p className="text-slate-400 max-w-xs">Scanning 5,000+ keywords and industry-standard patterns.</p>
              </div>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              {/* Score Card */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex items-center gap-12">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="#1e293b" strokeWidth="8" fill="none" />
                    <circle 
                      cx="64" cy="64" r="58" 
                      stroke="#6366f1" strokeWidth="8" fill="none" 
                      strokeDasharray={364}
                      strokeDashoffset={364 - (364 * analysis.score) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-white">{analysis.score}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Score</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Resume Strength: {analysis.score >= 80 ? 'Exceptional' : 'Needs Work'}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {analysis.extractedSkills.slice(0, 5).map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keyword Gaps & Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <h4 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-400" />
                    Keyword Gaps Detected
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywordGaps.map((gap, i) => (
                      <span key={i} className="px-3 py-1 bg-red-400/10 text-red-400 border border-red-400/20 rounded-lg text-xs font-bold">
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <h4 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    Strategic Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bullet Point Improvements */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-100 mb-6">AI-Powered Rewrites</h4>
                <div className="space-y-6">
                  {analysis.bulletPointImprovements.map((item, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Original</p>
                        <p className="text-sm text-slate-400 italic">"{item.original}"</p>
                      </div>
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/30">
                        <p className="text-[10px] uppercase font-bold text-indigo-400 mb-2">AI Improved</p>
                        <p className="text-sm text-slate-200 font-medium">"{item.improved}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3">
                  <Download size={20} />
                  Download Improved Resume
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-slate-600 mb-2">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-300">No Data Yet</h3>
              <p className="text-slate-500 max-w-sm">Upload your resume to see your score and receive personalized career advice.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerView;
