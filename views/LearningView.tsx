
import React from 'react';
import { PlayCircle, FileText, CheckCircle2, Lock, Clock, Calendar } from 'lucide-react';

const LearningView = () => {
  const courses = [
    { title: 'Python for Data Science', provider: 'Google Developers', type: 'video', duration: '4.5h', completed: true },
    { title: 'Linear Algebra Fundamentals', provider: 'MIT OpenCourseWare', type: 'doc', duration: '12h', completed: false },
    { title: 'Advanced Neural Networks', provider: 'PathFinder AI', type: 'video', duration: '8h', completed: false, locked: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="text-indigo-400" />
            Continue Learning
          </h3>
          <div className="space-y-4">
            {courses.map((course, i) => (
              <div key={i} className={`p-5 rounded-2xl border flex items-center gap-4 transition-all ${course.locked ? 'bg-slate-900/30 border-slate-800 opacity-60' : 'bg-slate-900 border-slate-800 hover:border-slate-700 cursor-pointer'}`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${course.type === 'video' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {course.type === 'video' ? <PlayCircle size={28} /> : <FileText size={28} />}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-100">{course.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{course.provider} • {course.duration}</p>
                </div>
                {course.completed ? (
                  <CheckCircle2 className="text-emerald-500" size={24} />
                ) : course.locked ? (
                  <Lock className="text-slate-700" size={20} />
                ) : (
                  <button className="text-indigo-400 font-bold text-sm">Resume</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-indigo-400" />
              Daily Challenge
            </h3>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-4">
              <p className="text-sm text-slate-200 font-medium mb-3">Which complexity represents the Big-O for Binary Search?</p>
              <div className="space-y-2">
                {['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'].map((opt, i) => (
                  <button key={i} className="w-full p-2 text-xs text-left bg-slate-800 border border-slate-700 rounded hover:border-indigo-500 transition-colors">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-center text-slate-500 font-bold uppercase">+50 XP for correct answer</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 p-6 rounded-2xl">
            <h4 className="text-indigo-300 font-bold text-sm mb-2">Adaptive Learning System</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our AI tracks your weak spots. We've detected you struggle with <span className="text-indigo-400 font-bold">Asynchronous Logic</span>. Your next 3 recommended resources will focus on this.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningView;
