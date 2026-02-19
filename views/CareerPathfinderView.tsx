
import React, { useState } from 'react';
import { 
  Compass, 
  ChevronRight, 
  BrainCircuit, 
  Map as MapIcon, 
  TrendingUp, 
  Users,
  Star
} from 'lucide-react';
import { getCareerRecommendations } from '../geminiService';
import { CareerPath } from '../types';

const CareerPathfinderView = () => {
  const [loading, setLoading] = useState(false);
  const [paths, setPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  const fetchPaths = async () => {
    setLoading(true);
    try {
      const results = await getCareerRecommendations(['Python', 'SQL', 'Problem Solving'], ['Data Science', 'AI', 'Cloud']);
      setPaths(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Career Intelligence Engine</h2>
          <p className="text-slate-400">Personalized matching based on your skill profile and market demand.</p>
        </div>
        <button 
          onClick={fetchPaths}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <BrainCircuit size={20} />
          Analyze Matching Roles
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-900 border border-slate-800 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : paths.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path) => (
            <div 
              key={path.id} 
              onClick={() => setSelectedPath(path)}
              className={`bg-slate-900 border p-6 rounded-3xl cursor-pointer transition-all hover:scale-[1.02] ${selectedPath?.id === path.id ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-800 hover:border-slate-700'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${path.marketDemand === 'High' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {path.marketDemand} Demand
                </div>
                <div className="flex items-center gap-1 text-indigo-400 font-bold">
                  <Star size={14} fill="currentColor" />
                  <span>{path.matchScore}% Match</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-2 mb-6">{path.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                      <Users size={12} className="text-slate-400" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                    +1k
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-600" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-32 text-center">
           <MapIcon size={64} className="mx-auto text-slate-700 mb-6" />
           <h3 className="text-xl font-bold text-slate-400">Your future path is one click away</h3>
           <p className="text-slate-500 mt-2">Click the analyze button to find career domains matching your personality.</p>
        </div>
      )}

      {selectedPath && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden animate-in slide-in-from-bottom-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8">
            <h3 className="text-3xl font-black text-white">{selectedPath.title} Roadmap</h3>
            <p className="text-indigo-100 mt-2 max-w-2xl">A complete end-to-end journey from beginner fundamentals to industry-ready proficiency.</p>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedPath.roadmap.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-indigo-400 border border-slate-700">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white leading-none">{step.level}</h4>
                    <p className="text-xs text-slate-400 mt-1">{step.title}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {step.topics.map((topic, tidx) => (
                    <div key={tidx} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 flex items-center gap-3 group hover:border-indigo-500/50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-indigo-500"></div>
                      <span className="text-sm text-slate-200">{topic}</span>
                    </div>
                  ))}
                </div>
                {idx < selectedPath.roadmap.length - 1 && (
                  <div className="hidden md:block absolute top-5 -right-6 w-12 h-px bg-slate-700"></div>
                )}
              </div>
            ))}
          </div>
          <div className="p-8 border-t border-slate-800 flex justify-center">
            <button className="bg-slate-100 text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-white transition-all">
              Save Roadmap & Track Progress
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPathfinderView;
