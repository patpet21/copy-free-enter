
import React, { useEffect, useState } from 'react';
import { enterpriseMarketService, MarketStat, EnterpriseProfile } from '../services/enterprise_market_service';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

// --- SUB-COMPONENT: LOGIN / SIGNUP ---
const EnterpriseAuth: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin();
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-amber-500/20 border border-white/10">
                        🏛️
                    </div>
                    <h2 className="text-3xl font-bold text-white font-display mb-2">Enterprise Portal</h2>
                    <p className="text-slate-400 text-sm mb-8">Institutional Access Gateway</p>

                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <Input id="email" label="Work Email" placeholder="name@institution.com" className="bg-slate-950 border-slate-700 text-white" />
                        <Input id="password" label="Password" type="password" placeholder="••••••••" className="bg-slate-950 border-slate-700 text-white" />
                        
                        {mode === 'SIGNUP' && (
                            <Input id="org" label="Organization Name" placeholder="Global Capital Ltd." className="bg-slate-950 border-slate-700 text-white" />
                        )}

                        <Button 
                            type="submit" 
                            isLoading={loading}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold shadow-lg shadow-amber-900/20 mt-4"
                        >
                            {mode === 'LOGIN' ? 'Secure Login' : 'Request Access'}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500">
                        {mode === 'LOGIN' ? "New Institution? " : "Already onboarded? "}
                        <button 
                            onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                            className="text-amber-500 font-bold hover:text-amber-400 transition-colors"
                        >
                            {mode === 'LOGIN' ? 'Apply for Account' : 'Login Here'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: SETTINGS ---
const EnterpriseSettings: React.FC<{ profile: EnterpriseProfile }> = ({ profile }) => {
    return (
        <div className="space-y-8 animate-fadeIn max-w-4xl">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 bg-slate-950/50">
                    <h3 className="text-lg font-bold text-white">Organization Profile</h3>
                    <p className="text-xs text-slate-500">Manage institutional details and API access.</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Company Name</label>
                        <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white" defaultValue={profile.organization.name} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Jurisdiction HQ</label>
                        <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white" defaultValue={profile.organization.region} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-2">KYB Status</label>
                        <div className="flex items-center gap-2 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm font-bold">
                            <span>✓</span> {profile.organization.kybStatus}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Tier</label>
                        <div className="flex items-center gap-2 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg text-amber-400 text-sm font-bold">
                            <span>👑</span> {profile.organization.tier}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 bg-slate-950/50">
                    <h3 className="text-lg font-bold text-white">Personal Security</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div>
                            <h4 className="text-white font-bold text-sm">Admin Name</h4>
                            <p className="text-xs text-slate-500">{profile.fullName}</p>
                        </div>
                        <button className="text-xs text-slate-400 hover:text-white font-bold">Edit</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div>
                            <h4 className="text-white font-bold text-sm">Email Address</h4>
                            <p className="text-xs text-slate-500">{profile.email}</p>
                        </div>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Verified</span>
                    </div>
                </div>
                <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
                     <Button className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold">Save Changes</Button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
export const EnterpriseDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SETTINGS'>('OVERVIEW');
  const [stats, setStats] = useState<MarketStat | null>(null);
  const [profile, setProfile] = useState<EnterpriseProfile | null>(null);

  useEffect(() => {
    // Load data even if not logged in, ready to show
    setStats(enterpriseMarketService.getGlobalStats());
    setProfile(enterpriseMarketService.getEnterpriseProfile());
  }, []);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  if (!isLoggedIn) {
      return <EnterpriseAuth onLogin={() => setIsLoggedIn(true)} />;
  }

  if (!stats || !profile) return <div className="p-8 text-slate-500">Loading Dashboard...</div>;

  return (
    <div className="animate-fadeIn space-y-8 h-full flex flex-col">
      
      {/* Authenticated Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-600 p-[2px]">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">
                    {profile.fullName.charAt(0)}
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold text-white font-display">{profile.organization.name}</h2>
                <p className="text-slate-400 text-xs flex items-center gap-2">
                    {profile.fullName} • <span className="text-amber-500">{profile.role}</span>
                </p>
            </div>
        </div>
        
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
                onClick={() => setActiveTab('OVERVIEW')}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'OVERVIEW' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Overview
            </button>
            <button 
                onClick={() => setActiveTab('SETTINGS')}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'SETTINGS' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Settings
            </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-20">
        
        {activeTab === 'SETTINGS' ? (
            <EnterpriseSettings profile={profile} />
        ) : (
            <div className="space-y-8 animate-slideUp">
                
                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
                        <div className="relative z-10">
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Total AUM</p>
                            <h3 className="text-3xl font-bold text-white font-display">{formatCurrency(stats.totalAum)}</h3>
                            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-400">
                            <span className="bg-emerald-500/10 px-1.5 py-0.5 rounded">+12.5%</span>
                            <span className="text-slate-500">vs last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
                        <div className="relative z-10">
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Capital Deployed</p>
                            <h3 className="text-3xl font-bold text-white font-display">{formatCurrency(stats.capitalDeployed)}</h3>
                            <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
                        <div className="relative z-10">
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Active Projects</p>
                            <h3 className="text-3xl font-bold text-white font-display">{stats.activeProjects}</h3>
                            <div className="flex items-center gap-2 mt-3 text-xs text-amber-400">
                                <span>● 2 Launching Soon</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
                        <div className="relative z-10">
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Compliance Score</p>
                            <h3 className="text-3xl font-bold text-white font-display">{stats.complianceScore}%</h3>
                            <p className="text-xs text-slate-500 mt-3">
                                <span className="text-emerald-400">Audit Passed</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Visuals */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col min-h-[350px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold">Global Asset Map</h3>
                            <div className="flex gap-2">
                                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">Real Estate</span>
                                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">Energy</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-10 bg-center bg-no-repeat bg-contain filter invert"></div>
                            {/* Interactive Dots */}
                            <div className="absolute top-[40%] left-[25%] w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                            <div className="absolute top-[40%] left-[25%] w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 cursor-pointer hover:scale-125 transition-transform" title="New York Assets"></div>
                            
                            <div className="absolute top-[35%] left-[50%] w-2 h-2 bg-amber-500 rounded-full animate-ping delay-75"></div>
                            <div className="absolute top-[35%] left-[50%] w-2 h-2 bg-amber-500 rounded-full border-2 border-slate-900 cursor-pointer hover:scale-125 transition-transform" title="London HQ"></div>

                            <div className="absolute bottom-[30%] right-[20%] w-4 h-4 bg-indigo-500 rounded-full animate-ping delay-150"></div>
                            <div className="absolute bottom-[30%] right-[20%] w-4 h-4 bg-indigo-500 rounded-full border-2 border-slate-900 cursor-pointer hover:scale-125 transition-transform" title="Singapore Hub"></div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
                        <h3 className="text-white font-bold mb-4">Activity Feed</h3>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[300px]">
                        {[
                            { time: '2m ago', action: 'Investment', details: '$250k in Skyline Tower', user: 'Family Office A' },
                            { time: '15m ago', action: 'Compliance', details: 'KYC Approved', user: 'Investor #992' },
                            { time: '1h ago', action: 'Deployment', details: 'Smart Contract Verified', user: 'System' },
                            { time: '3h ago', action: 'Document', details: 'PPM Signed', user: 'Tech Growth VC' },
                            { time: '5h ago', action: 'Investment', details: '$10k in Green Energy', user: 'Retail Pool' },
                        ].map((log, i) => (
                            <div key={i} className="flex gap-3 items-start group">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 group-hover:bg-amber-500 transition-colors"></div>
                                <div>
                                    <p className="text-xs text-slate-300 leading-snug">
                                        <span className="font-bold text-white">{log.user}</span> - {log.action}: {log.details}
                                    </p>
                                    <p className="text-[10px] text-slate-600">{log.time}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                        <button className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold rounded-lg transition-colors border border-slate-700">
                            Export Logs
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl flex items-center justify-between group hover:bg-indigo-900/30 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 text-xl">🚀</div>
                            <div>
                                <h4 className="text-white font-bold text-sm">New SPV</h4>
                                <p className="text-slate-400 text-xs">Start wizard</p>
                            </div>
                        </div>
                        <span className="text-indigo-500 group-hover:translate-x-1 transition-transform">→</span>
                    </button>

                    <button className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl flex items-center justify-between group hover:bg-emerald-900/30 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-xl">💸</div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Distributions</h4>
                                <p className="text-slate-400 text-xs">Pay dividends</p>
                            </div>
                        </div>
                        <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
                    </button>

                    <button className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-xl flex items-center justify-between group hover:bg-amber-900/30 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 text-xl">🛡️</div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Audits</h4>
                                <p className="text-slate-400 text-xs">Review reports</p>
                            </div>
                        </div>
                        <span className="text-amber-500 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
