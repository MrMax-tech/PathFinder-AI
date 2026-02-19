
import React from 'react';
import { Layers, Database, Cpu, Globe, Server, Code2 } from 'lucide-react';

const SystemDesignView = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <section className="space-y-4">
        <h2 className="text-3xl font-black text-white">PathFinder AI: System Architecture</h2>
        <p className="text-slate-400 max-w-3xl">This blueprint outlines the production-grade architecture of the PathFinder platform, optimized for high scalability, real-time intelligence, and cross-domain career insights.</p>
      </section>

      {/* Architecture Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <Layers className="text-indigo-500 mb-6" size={32} />
          <h3 className="text-xl font-bold text-white mb-4">Core System Overview</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
              <span><strong className="text-slate-200">Frontend:</strong> React 18 SPA with Tailwind CSS for high-performance, responsive dashboards.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
              <span><strong className="text-slate-200">Backend:</strong> Python FastAPI microservices managing parsing, recommendation logic, and state.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
              <span><strong className="text-slate-200">Orchestration:</strong> Docker + Kubernetes for seamless scaling and CI/CD pipelines.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <Cpu className="text-purple-500 mb-6" size={32} />
          <h3 className="text-xl font-bold text-white mb-4">AI & Machine Learning Layer</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0"></div>
              <span><strong className="text-slate-200">LLM Engine:</strong> Gemini 3 Pro for complex reasoning and career path generation.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0"></div>
              <span><strong className="text-slate-200">Vector Search:</strong> FAISS for mapping student skills to a global taxonomy of roles.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0"></div>
              <span><strong className="text-slate-200">Parser:</strong> spaCy combined with custom transformer models for NER (Named Entity Recognition) on resumes.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Database Schema Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Database className="text-emerald-500" />
          Database Schema
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="p-6">
              <h4 className="font-mono text-emerald-400 text-xs font-bold mb-4 uppercase">User Model</h4>
              <ul className="space-y-2 font-mono text-[11px] text-slate-500">
                <li>id: UUID (PK)</li>
                <li>profile_data: JSONB</li>
                <li>xp_score: INT</li>
                <li>streak_count: INT</li>
                <li>created_at: TIMESTAMP</li>
              </ul>
            </div>
            <div className="p-6">
              <h4 className="font-mono text-indigo-400 text-xs font-bold mb-4 uppercase">Career Paths</h4>
              <ul className="space-y-2 font-mono text-[11px] text-slate-500">
                <li>path_id: UUID (PK)</li>
                <li>title: VARCHAR</li>
                <li>skills_required: TEXT[]</li>
                <li>market_demand_index: FLOAT</li>
                <li>roadmap_steps: JSONB</li>
              </ul>
            </div>
            <div className="p-6">
              <h4 className="font-mono text-amber-400 text-xs font-bold mb-4 uppercase">Analytics</h4>
              <ul className="space-y-2 font-mono text-[11px] text-slate-500">
                <li>event_id: UUID</li>
                <li>user_id: FK</li>
                <li>action_type: ENUM</li>
                <li>time_spent: INTERVAL</li>
                <li>test_results: JSONB</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* API Strategy */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Globe className="text-sky-500" />
          API Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { method: 'POST', path: '/api/v1/analyze-resume', desc: 'Parses binary resume and returns ATS insights.' },
             { method: 'GET', path: '/api/v1/recommend-paths', desc: 'Hybrid recommendation engine output.' },
             { method: 'POST', path: '/api/v1/generate-quiz', desc: 'Dynamic testing based on learning progress.' },
             { method: 'GET', path: '/api/v1/job-sync', desc: 'Real-time sync with external job boards APIs.' },
           ].map((api, i) => (
             <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
               <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded ${api.method === 'POST' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                 {api.method}
               </span>
               <div className="flex-1">
                 <p className="font-mono text-xs text-slate-200">{api.path}</p>
                 <p className="text-[11px] text-slate-500 mt-0.5">{api.desc}</p>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default SystemDesignView;
