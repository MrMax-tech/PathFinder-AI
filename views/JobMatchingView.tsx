
import React from 'react';
import { Briefcase, MapPin, DollarSign, ExternalLink, ShieldCheck } from 'lucide-react';

const JobMatchingView = () => {
  const jobs = [
    { title: 'Frontend Developer Intern', company: 'TechFlow Systems', location: 'Remote', salary: '$2,000 - $4,000 /mo', match: 94 },
    { title: 'Associate Cloud Engineer', company: 'SkyScale Cloud', location: 'San Francisco, CA', salary: '$110k - $140k', match: 82 },
    { title: 'Junior Data Analyst', company: 'MarketSense AI', location: 'Austin, TX', salary: '$75k - $95k', match: 71 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl group hover:border-indigo-500 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400">
                <Briefcase size={24} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-black text-slate-500 mb-1">Match Score</span>
                <span className={`text-xl font-black ${job.match >= 90 ? 'text-emerald-500' : 'text-indigo-400'}`}>{job.match}%</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
            <p className="text-slate-400 text-sm mb-4 font-medium">{job.company}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <DollarSign size={14} />
                <span>{job.salary}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-[10px] text-emerald-500 font-bold uppercase">Skills Verified</span>
            </div>

            <button className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
              Apply with PathFinder Profile
              <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobMatchingView;
