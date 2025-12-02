
import React from 'react';
import { UserProfile } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SettingsTabProps {
  userProfile: UserProfile | null;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ userProfile }) => {
  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn pb-12">
      
      {/* Profile Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Personal Information</h3>
         </div>
         <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
               <div className="shrink-0">
                  <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-sm overflow-hidden relative group">
                     <img 
                       src={userProfile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.email || 'default'}`} 
                       alt="Avatar" 
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-white text-xs font-bold">Change</span>
                     </div>
                  </div>
               </div>
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <Input id="fname" label="Full Name" defaultValue={userProfile?.full_name || ''} />
                  <Input id="email" label="Email Address" defaultValue={userProfile?.email || ''} disabled className="opacity-70 bg-slate-100" />
                  <Input id="country" label="Residence" defaultValue={userProfile?.country || ''} />
                  <Input id="phone" label="Phone Number" placeholder="+1 (555) 000-0000" />
               </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-100">
               <Button className="bg-slate-900 text-white shadow-lg">Save Changes</Button>
            </div>
         </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Security & KYC</h3>
         </div>
         <div className="p-6 md:p-8 space-y-6">
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
               <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${userProfile?.kyc_verified ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {userProfile?.kyc_verified ? '🛡️' : '⚠️'}
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-900 text-sm">Identity Verification (KYC)</h4>
                     <p className="text-xs text-slate-500">
                        {userProfile?.kyc_verified ? "Your identity is verified. You can trade freely." : "Verification required to withdraw funds."}
                     </p>
                  </div>
               </div>
               <button className={`px-4 py-1.5 text-xs font-bold uppercase rounded-full ${userProfile?.kyc_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-900 text-white shadow-lg'}`}>
                  {userProfile?.kyc_verified ? 'Verified' : 'Start KYC'}
               </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">🔒</div>
                  <div>
                     <h4 className="font-bold text-slate-900 text-sm">Two-Factor Authentication (2FA)</h4>
                     <p className="text-xs text-slate-500">Secure your account with Google Authenticator.</p>
                  </div>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
               </label>
            </div>

         </div>
      </div>

    </div>
  );
};
