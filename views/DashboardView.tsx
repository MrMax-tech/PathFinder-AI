
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Flame, 
  Target, 
  Zap, 
  Clock, 
  ChevronRight,
  Plus
} from 'lucide-react';

const activityData = [
  { day: 'Mon', xp: 400 },
  { day: 'Tue', xp: 300 },
  { day: 'Wed', xp: 600 },
  { day: 'Thu', xp: 800 },
  { day: 'Fri', xp: 500 },
  { day: 'Sat', xp: 200 },
  { day: 'Sun', xp: 100 },
];

const DashboardView = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Ready to level up your career?</h2>
          <p className="text-indigo-100 max-w-lg mb-6">
            You are currently <span className="font-bold">64%</span> ready for a Full Stack Developer role. 
            Complete today's learning module to hit your weekly goal!
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2">
            Continue Learning
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl mr-10 -mb-10"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Learning Streak</p>
            <p className="text-2xl font-bold text-white">12 Days</p>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500">
            <Target size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Skill Score</p>
            <p className="text-2xl font-bold text-white">742</p>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Courses Completed</p>
            <p className="text-2xl font-bold text-white">4</p>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center text-sky-500">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Hours</p>
            <p className="text-2xl font-bold text-white">84.5h</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <BarChart size={18} className="text-indigo-500" />
              Weekly XP Activity
            </h3>
            <select className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}} 
                  contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc'}}
                />
                <Bar dataKey="xp" radius={[4, 4, 0, 0]}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.xp > 500 ? '#6366f1' : '#475569'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Career Path Quick Look */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="font-bold text-slate-100 mb-6 flex items-center justify-between">
            Active Paths
            <button className="text-indigo-400 hover:text-indigo-300">
              <Plus size={20} />
            </button>
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Full Stack Web Dev', progress: 64, color: 'bg-indigo-500' },
              { title: 'Cloud Architect', progress: 28, color: 'bg-emerald-500' },
              { title: 'Data Analytics', progress: 12, color: 'bg-amber-500' },
            ].map((path, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-200">{path.title}</span>
                  <span className="text-xs font-bold text-slate-400">{path.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${path.color} transition-all duration-1000`} style={{ width: `${path.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium">
            Explore New Roles
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
