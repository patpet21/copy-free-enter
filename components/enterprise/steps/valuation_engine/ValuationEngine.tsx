
import React, { useState } from 'react';
import { Button } from '../../../ui/Button';
import { valuationService, ProjectContext, ValuationReport, ValuationAssumptions } from '../../../../enterprise/valuation_engine/services/valuation_service';
import { ValuationForm } from '../../../../enterprise/valuation_engine/ui/ValuationForm';
import { ValuationReportView } from '../../../../enterprise/valuation_engine/ui/ValuationReportView';

export const ValuationEngine: React.FC = () => {
  // View State
  const [activeTab, setActiveTab] = useState<'INPUT' | 'REPORT'>('INPUT');
  
  // Data State
  const [projectData, setProjectData] = useState<ProjectContext>({
    id: 'temp-1',
    name: '',
    assetType: 'Real Estate',
    location: '',
    status: 'Stabilized',
    financials: { grossIncome: 0, opex: 0 },
    size: { amount: 0, unit: 'sqm' }
  });

  const [report, setReport] = useState<ValuationReport | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Handlers ---

  const handleRunInitial = async () => {
      if (!projectData.name || !projectData.location) {
          alert("Please enter Project Name and Location.");
          return;
      }
      
      setIsProcessing(true);
      try {
          const result = await valuationService.runValuationWorkflow(projectData);
          setReport(result);
          setActiveTab('REPORT');
      } catch (e) {
          console.error(e);
          alert("AI Analysis Failed. Please try again.");
      } finally {
          setIsProcessing(false);
      }
  };

  const handleRecalculate = (newAssumptions: ValuationAssumptions) => {
      if (!report) return;
      const updatedReport = valuationService.recalculate(report, newAssumptions);
      setReport(updatedReport);
      setActiveTab('REPORT');
  };

  return (
    <div className="h-full flex flex-col animate-fadeIn">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
              <h2 className="text-2xl font-bold text-white font-display">Valuation Engine</h2>
              <p className="text-slate-400 text-sm">AI-Enhanced Automated Valuation Model (AVM)</p>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button 
                  onClick={() => setActiveTab('INPUT')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'INPUT' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  Input & Config
              </button>
              <button 
                  onClick={() => setActiveTab('REPORT')}
                  disabled={!report}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'REPORT' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 disabled:opacity-30'}`}
              >
                  Valuation Report
              </button>
          </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-12">
          
          {/* TAB: INPUT */}
          {activeTab === 'INPUT' && (
              <div className="max-w-5xl mx-auto">
                  {!report ? (
                      // Initial Setup State
                      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                          <div className="text-center mb-10">
                              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-lg shadow-indigo-500/20 mb-6">
                                  📊
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-2">Initialize Project</h3>
                              <p className="text-slate-400 max-w-md mx-auto">Enter core asset details to let the AI generate the initial financial model and assumptions.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                              <div className="space-y-4">
                                  <input 
                                      placeholder="Project Name"
                                      value={projectData.name}
                                      onChange={e => setProjectData({...projectData, name: e.target.value})}
                                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                  />
                                  <input 
                                      placeholder="City, Country"
                                      value={projectData.location}
                                      onChange={e => setProjectData({...projectData, location: e.target.value})}
                                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                  />
                                  <select 
                                      value={projectData.assetType}
                                      onChange={e => setProjectData({...projectData, assetType: e.target.value})}
                                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                  >
                                      <option>Real Estate</option>
                                      <option>Business</option>
                                      <option>Infrastructure</option>
                                  </select>
                              </div>
                              <div className="space-y-4">
                                  <select 
                                      value={projectData.status}
                                      onChange={e => setProjectData({...projectData, status: e.target.value as any})}
                                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                  >
                                      <option value="Stabilized">Stabilized (Yielding)</option>
                                      <option value="Value-Add">Value-Add (Renovation)</option>
                                      <option value="Development">Ground-Up Development</option>
                                  </select>
                                  <div className="grid grid-cols-2 gap-4">
                                      <input 
                                          type="number"
                                          placeholder="Gross Income ($)"
                                          value={projectData.financials.grossIncome || ''}
                                          onChange={e => setProjectData({...projectData, financials: {...projectData.financials, grossIncome: parseFloat(e.target.value)}})}
                                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                                      />
                                      <input 
                                          type="number"
                                          placeholder="OPEX ($)"
                                          value={projectData.financials.opex || ''}
                                          onChange={e => setProjectData({...projectData, financials: {...projectData.financials, opex: parseFloat(e.target.value)}})}
                                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-red-500 transition-all font-mono"
                                      />
                                  </div>
                              </div>
                          </div>
                          
                          <div className="max-w-3xl mx-auto mt-8">
                              <Button 
                                  onClick={handleRunInitial}
                                  isLoading={isProcessing}
                                  className="w-full py-4 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/20"
                              >
                                  {isProcessing ? 'Running AI Analysis...' : 'Generate Valuation Model'}
                              </Button>
                          </div>
                      </div>
                  ) : (
                      // Advanced Form State (After Initial Run)
                      <div className="animate-slideUp">
                          <div className="mb-8 flex items-center gap-4">
                              <button onClick={() => setReport(null)} className="text-slate-500 hover:text-white text-sm">← Reset Project</button>
                              <div className="h-px bg-slate-800 flex-1"></div>
                          </div>
                          <ValuationForm 
                              assumptions={report.assumptions}
                              onChange={(newAssumptions) => setReport({...report, assumptions: newAssumptions})}
                              onRecalculate={() => handleRecalculate(report.assumptions)}
                          />
                      </div>
                  )}
              </div>
          )}

          {/* TAB: REPORT */}
          {activeTab === 'REPORT' && report && (
              <div className="max-w-6xl mx-auto">
                  <ValuationReportView report={report} />
              </div>
          )}

      </div>
    </div>
  );
};
