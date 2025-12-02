
import React, { useState, useEffect, useMemo } from 'react';
import { StepProps } from '../../../types';
import { VISION_LOGIC } from '../../../content/pro/visionLogic';
import { ProStepFooter } from '../ProStepFooter';

type VisionTab = 'project_identity' | 'raise_objectives' | 'strategy_orientation' | 'investor_scope' | 'timeline_intent';

export const ProVisionStep: React.FC<StepProps & { activeTabId?: string, onTabChange?: (id: string) => void, onNextStep?: () => void }> = ({ 
    data, 
    updateData, 
    onValidationChange,
    activeTabId,
    onTabChange,
    onNextStep 
}) => {
  const { projectInfo, property } = data;
  
  // Logic Engine
  const assetClass = property.category || 'Real Estate';
  const logic = VISION_LOGIC[assetClass] || VISION_LOGIC['Other'];

  const allTabs: { id: VisionTab; label: string; icon: string }[] = [
    { id: 'project_identity', label: 'Project Identity', icon: '🆔' },
    { id: 'raise_objectives', label: 'Raise Objectives', icon: '🎯' },
    { id: 'strategy_orientation', label: 'Strategy', icon: '♟️' },
    { id: 'investor_scope', label: 'Investor Scope', icon: '👥' },
    { id: 'timeline_intent', label: 'Timeline', icon: '🗓️' },
  ];

  const visibleTabs = useMemo(() => {
    return allTabs.filter(tab => 
        logic.required_tabs.includes(tab.id) || 
        (logic.optional_tabs && logic.optional_tabs.includes(tab.id))
    );
  }, [logic]);

  const [activeTab, setActiveTab] = useState<VisionTab>(visibleTabs[0].id as VisionTab);

  // Sync with parent sidebar
  useEffect(() => {
      if (activeTabId && visibleTabs.find(t => t.id === activeTabId)) {
          setActiveTab(activeTabId as VisionTab);
      }
  }, [activeTabId]);

  const handleTabChange = (id: VisionTab) => {
      setActiveTab(id);
      if (onTabChange) onTabChange(id);
  };

  const handleNext = () => {
      const idx = visibleTabs.findIndex(t => t.id === activeTab);
      if (idx < visibleTabs.length - 1) {
          handleTabChange(visibleTabs[idx + 1].id as VisionTab);
      } else {
          if (onNextStep) onNextStep();
      }
  };

  const handleBack = () => {
      const idx = visibleTabs.findIndex(t => t.id === activeTab);
      if (idx > 0) handleTabChange(visibleTabs[idx - 1].id as VisionTab);
  };

  const handleUpdate = (field: keyof typeof projectInfo, value: any) => {
    updateData('projectInfo', { [field]: value });
  };

  const currentIndex = visibleTabs.findIndex(t => t.id === activeTab);
  const nextTab = currentIndex < visibleTabs.length - 1 ? visibleTabs[currentIndex + 1] : null;

  // Summary Data for Report
  const summaryData = {
      'Project Name': projectInfo.projectName,
      'Target Raise': `$${projectInfo.targetRaiseAmount?.toLocaleString()}`,
      'Asset Class': assetClass,
      'Geo Intent': projectInfo.geoIntent,
      'Investor Type': projectInfo.targetInvestorType,
      'Launch Speed': projectInfo.launchSpeed
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      
      {/* 1. Header with Internal Nav (Visible only on Desktop/Tablet usually, sidebar handles mobile) */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-4 gap-4">
        <div>
            <h3 className="text-xl font-bold font-display text-white mb-1">Vision & Goals</h3>
            <p className="text-slate-400 text-sm">
                Configured for <span className="text-amber-500 font-bold">{assetClass}</span> Mode.
            </p>
        </div>
        <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 custom-scrollbar">
            {visibleTabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as VisionTab)}
                    className={`
                        px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap
                        ${activeTab === tab.id 
                            ? 'bg-amber-500 text-slate-900 shadow-md' 
                            : 'bg-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-700'
                        }
                    `}
                >
                    <span>{tab.icon}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          
          {activeTab === 'project_identity' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                  {/* ... (Existing Content for Identity) ... */}
                  <div className="lg:col-span-6 bg-slate-900 rounded-xl p-5 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Project Name</label>
                      <input 
                          value={projectInfo.projectName}
                          onChange={(e) => handleUpdate('projectName', e.target.value)}
                          placeholder="e.g. Manhattan Office Trust I"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                      />
                  </div>
                  <div className="lg:col-span-6 bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Asset Class</label>
                      <div className="text-xl font-bold text-white">{assetClass}</div>
                  </div>
                  <div className="lg:col-span-12 bg-slate-900 rounded-xl p-5 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Description</label>
                      <textarea 
                          value={projectInfo.description}
                          onChange={(e) => handleUpdate('description', e.target.value)}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white h-24 focus:border-amber-500 outline-none resize-none"
                      />
                  </div>
                  <div className="lg:col-span-12 bg-slate-900 rounded-xl p-5 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Key Value Proposition</label>
                      <textarea 
                          value={projectInfo.valueProposition || ''}
                          onChange={(e) => handleUpdate('valueProposition', e.target.value)}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white h-24 focus:border-amber-500 outline-none resize-none"
                          placeholder="Why should investors care?"
                      />
                  </div>
              </div>
          )}

          {activeTab === 'raise_objectives' && (
              <div className="space-y-6">
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Target Raise ($)</label>
                          <input 
                              type="number"
                              value={projectInfo.targetRaiseAmount || ''}
                              onChange={(e) => handleUpdate('targetRaiseAmount', parseFloat(e.target.value))}
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white"
                          />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Soft Cap ($)</label>
                          <input 
                              type="number"
                              value={projectInfo.raiseAmountMin || ''}
                              onChange={(e) => handleUpdate('raiseAmountMin', parseFloat(e.target.value))}
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white"
                          />
                      </div>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Use of Funds</label>
                      <textarea 
                          value={projectInfo.raiseRationale || ''}
                          onChange={(e) => handleUpdate('raiseRationale', e.target.value)}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white h-24"
                      />
                  </div>
              </div>
          )}

          {activeTab === 'strategy_orientation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Investment Model</label>
                      <div className="grid grid-cols-3 gap-2">
                          {['Yield', 'Appreciation', 'Mixed'].map(m => (
                              <button 
                                key={m} 
                                onClick={() => handleUpdate('investmentModel', m)}
                                className={`p-3 rounded-lg border text-xs font-bold ${projectInfo.investmentModel === m ? 'bg-amber-500 text-slate-900 border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-600'}`}
                              >
                                  {m}
                              </button>
                          ))}
                      </div>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Geographic Intent</label>
                      <div className="space-y-2">
                          {['Local', 'National', 'Global'].map(g => (
                              <button 
                                key={g} 
                                onClick={() => handleUpdate('geoIntent', g)}
                                className={`w-full text-left p-3 rounded-lg border text-sm font-bold ${projectInfo.geoIntent === g ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-800 text-slate-400 border-slate-600'}`}
                              >
                                  {g}
                              </button>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'investor_scope' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Target Investor</label>
                      {['Retail', 'Accredited', 'Institutional'].map(t => (
                          <button 
                            key={t}
                            onClick={() => handleUpdate('targetInvestorType', t)}
                            className={`w-full text-left p-3 mb-2 rounded-lg border text-sm font-bold ${projectInfo.targetInvestorType === t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-800 text-slate-400 border-slate-600'}`}
                          >
                              {t}
                          </button>
                      ))}
                  </div>
              </div>
          )}

          {activeTab === 'timeline_intent' && (
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Launch Speed</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Fast', 'Standard', 'Long-Term'].map(s => (
                          <button 
                            key={s}
                            onClick={() => handleUpdate('launchSpeed', s)}
                            className={`p-4 rounded-xl border text-center font-bold ${projectInfo.launchSpeed === s ? 'bg-slate-800 border-white text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                          >
                              {s}
                          </button>
                      ))}
                  </div>
              </div>
          )}

      </div>

      <ProStepFooter 
          onNext={handleNext}
          onBack={currentIndex > 0 ? handleBack : undefined}
          isLastTab={currentIndex === visibleTabs.length - 1}
          isStepValid={true}
          currentTabLabel={visibleTabs[currentIndex].label}
          nextTabLabel={nextTab?.label}
          summaryData={summaryData}
          stepTitle="Vision & Strategy"
      />
    </div>
  );
};
