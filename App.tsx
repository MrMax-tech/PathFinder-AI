
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Compass, 
  GraduationCap, 
  MessageSquare, 
  Briefcase,
  Trophy,
  Settings,
  Info
} from 'lucide-react';
import DashboardView from './views/DashboardView';
import ResumeAnalyzerView from './views/ResumeAnalyzerView';
import CareerPathfinderView from './views/CareerPathfinderView';
import LearningView from './views/LearningView';
import MentorChatView from './views/MentorChatView';
import JobMatchingView from './views/JobMatchingView';
import SystemDesignView from './views/SystemDesignView';

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
  <Link to={path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}>
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

// Fix for children missing error by marking it optional in props type
const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col bg-slate-900/50 backdrop-blur-xl">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <Compass className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">PathFinder</h1>
              <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">AI Intelligence</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" active={location.pathname === '/'} />
          <SidebarItem icon={FileText} label="Resume Analyzer" path="/resume" active={location.pathname === '/resume'} />
          <SidebarItem icon={Compass} label="Career Pathfinder" path="/paths" active={location.pathname === '/paths'} />
          <SidebarItem icon={GraduationCap} label="Learning Center" path="/learning" active={location.pathname === '/learning'} />
          <SidebarItem icon={MessageSquare} label="AI Mentor" path="/mentor" active={location.pathname === '/mentor'} />
          <SidebarItem icon={Briefcase} label="Jobs & Internships" path="/jobs" active={location.pathname === '/jobs'} />
        </nav>

        <div className="p-3 border-t border-slate-800">
           <SidebarItem icon={Info} label="System Design" path="/design" active={location.pathname === '/design'} />
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-slate-100 truncate">Alex Developer</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-indigo-500"></div>
                </div>
                <span className="text-[10px] text-slate-400">LV 14</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/30 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-slate-200">
            {location.pathname === '/' ? 'Welcome back, Alex!' : 
             location.pathname === '/resume' ? 'Resume Strategy' : 
             location.pathname === '/paths' ? 'Career Roadmaps' : 
             location.pathname === '/learning' ? 'My Progress' : 
             location.pathname === '/mentor' ? 'AI Personal Mentor' : 
             location.pathname === '/jobs' ? 'Opportunities' : 'Architecture'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded-full border border-amber-500/20">
              <Trophy size={16} />
              <span className="text-sm font-bold">1,250 XP</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/resume" element={<ResumeAnalyzerView />} />
          <Route path="/paths" element={<CareerPathfinderView />} />
          <Route path="/learning" element={<LearningView />} />
          <Route path="/mentor" element={<MentorChatView />} />
          <Route path="/jobs" element={<JobMatchingView />} />
          <Route path="/design" element={<SystemDesignView />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
};

export default App;
