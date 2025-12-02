
import React from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const ReturnsAnalysis: React.FC<Props> = ({ data }) => {
  const updateData = (data as any).updateData as (section: keyof TokenizationState, payload: any) => void;
  const marketData: ProMarketData = data.proMarketData || {};
  const category = data.property.category;

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-900 text-xs">4</span>
              Returns Analysis
          </h4>
          
          <select 
            value={marketData.returnProfileType || ''}
            onChange={(e) => handleUpdate({ returnProfileType: e.target.value as any })}
            className="bg-slate-800 text-xs text-slate-300 border border-slate-700 rounded-lg px-2 py-1 outline-none"
          >
              <option value="">Select Profile</option>
              <option value="Income">Income (Yield Focus)</option>
              <option value="Growth">Growth (Appreciation)</option>
              <option value="Mixed">Mixed / Balanced</option>
              <option value="Appreciation">Pure Appreciation</option>
          </select>
      </div>

      {/* 1. REAL ESTATE */}
      {category === 'Real Estate' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Net Operating Income (NOI)</label>
                  <input 
                      type="number"
                      value={marketData.noiAnnual || marketData.noi || ''}
                      onChange={(e) => handleUpdate({ noiAnnual: parseFloat(e.target.value), noi: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="0"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Net Cashflow (Post-Debt)</label>
                  <input 
                      type="number"
                      value={marketData.netCashflowAnnual || ''}
                      onChange={(e) => handleUpdate({ netCashflowAnnual: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-emerald-400 font-mono text-lg p-2 rounded border border-slate-600 focus:border-emerald-500 outline-none"
                      placeholder="0"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Payback Period (Years)</label>
                  <input 
                      type="number"
                      step="0.1"
                      value={marketData.paybackPeriodYears || ''}
                      onChange={(e) => handleUpdate({ paybackPeriodYears: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="0.0"
                  />
              </div>
          </div>
      )}

      {/* 2. BUSINESS / EQUITY */}
      {category === 'Business' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">EBITDA Projection</label>
                  <input 
                      type="number"
                      value={marketData.ebitda || ''}
                      onChange={(e) => handleUpdate({ ebitda: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="0"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Target Exit Multiple (x)</label>
                  <input 
                      type="number"
                      step="0.5"
                      value={marketData.exitMultiple || ''}
                      onChange={(e) => handleUpdate({ exitMultiple: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-emerald-400 font-mono text-lg p-2 rounded border border-slate-600 focus:border-emerald-500 outline-none"
                      placeholder="e.g. 5.0"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">EBITDA Multiple at Exit</p>
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Revenue Growth (%)</label>
                  <input 
                      type="number"
                      step="1"
                      value={marketData.revenueGrowthExpectation || ''}
                      onChange={(e) => handleUpdate({ revenueGrowthExpectation: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="0%"
                  />
              </div>
          </div>
      )}

      {/* 3. ART */}
      {category === 'Art' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Est. Annual Appreciation (%)</label>
                  <input 
                      type="number"
                      step="0.5"
                      value={data.property.appreciation_rate || ''}
                      onChange={(e) => updateData('property', { appreciation_rate: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-emerald-400 font-mono text-lg p-2 rounded border border-slate-600 focus:border-emerald-500 outline-none"
                      placeholder="e.g. 12.5"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Holding Period (Years)</label>
                  <input 
                      type="number"
                      step="1"
                      value={data.property.lockup_months ? data.property.lockup_months / 12 : ''}
                      onChange={(e) => updateData('property', { lockup_months: parseFloat(e.target.value) * 12 })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="e.g. 5"
                  />
              </div>
          </div>
      )}

      {/* 4. DEBT */}
      {category === 'Debt' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Coupon Rate (%)</label>
                  <input 
                      type="number" step="0.1"
                      value={data.property.loan_interest_rate || ''}
                      onChange={(e) => updateData('property', { loan_interest_rate: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-emerald-400 font-mono text-lg p-2 rounded border border-slate-600 focus:border-emerald-500 outline-none"
                      placeholder="0.0%"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Maturity (Months)</label>
                  <input 
                      type="number"
                      value={data.property.lockup_months || ''}
                      onChange={(e) => updateData('property', { lockup_months: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="e.g. 36"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Yield to Maturity</label>
                  <input 
                      type="number" step="0.1"
                      value={marketData.investorYieldTarget || ''}
                      onChange={(e) => handleUpdate({ investorYieldTarget: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="0.0%"
                  />
              </div>
          </div>
      )}

      {/* 5. ENERGY */}
      {category === 'Energy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">PPA Rate ($/MWh)</label>
                  <input 
                      type="number"
                      value={marketData.ppaRate || ''}
                      onChange={(e) => handleUpdate({ ppaRate: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="0.00"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Project Capacity (MW)</label>
                  <input 
                      type="number"
                      value={marketData.capacityMw || ''}
                      onChange={(e) => handleUpdate({ capacityMw: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="0"
                  />
              </div>
          </div>
      )}

      {/* 6. FUNDS */}
      {category === 'Funds' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Target IRR (%)</label>
                  <input 
                      type="number" step="0.1"
                      value={marketData.projectedIrr || ''}
                      onChange={(e) => handleUpdate({ projectedIrr: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-emerald-400 font-mono text-lg p-2 rounded border border-slate-600 focus:border-emerald-500 outline-none"
                      placeholder="0.0%"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Management Fee (%)</label>
                  <input 
                      type="number" step="0.1"
                      value={data.property.management_fee_percentage || ''}
                      onChange={(e) => updateData('property', { management_fee_percentage: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="2.0%"
                  />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Carried Interest (%)</label>
                  <input 
                      type="number" step="1"
                      // Reusing platform_fees temporarily or assume field
                      placeholder="20%"
                      className="w-full bg-slate-800 text-white font-mono text-lg p-2 rounded border border-slate-600 focus:border-amber-500 outline-none"
                  />
              </div>
          </div>
      )}

      {/* Common KPI Footer */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Key Return Indicators</h5>
          <div className="grid grid-cols-3 gap-8">
              
              <div className="text-center">
                  <label className="text-xs text-slate-500 block mb-2">Projected IRR</label>
                  <div className="relative inline-block">
                      <input 
                          type="number"
                          step="0.1"
                          value={marketData.projectedIrr || ''}
                          onChange={(e) => handleUpdate({ projectedIrr: parseFloat(e.target.value) })}
                          className="w-24 bg-transparent text-center text-3xl font-bold text-emerald-400 outline-none border-b border-slate-700 focus:border-emerald-500"
                          placeholder="0.0"
                      />
                      <span className="text-sm text-slate-600 absolute -right-4 bottom-2">%</span>
                  </div>
              </div>

              <div className="text-center border-x border-slate-800">
                  <label className="text-xs text-slate-500 block mb-2">Equity Multiple</label>
                  <div className="relative inline-block">
                      <input 
                          type="number"
                          step="0.1"
                          value={marketData.equityMultiple || ''}
                          onChange={(e) => handleUpdate({ equityMultiple: parseFloat(e.target.value) })}
                          className="w-24 bg-transparent text-center text-3xl font-bold text-white outline-none border-b border-slate-700 focus:border-amber-500"
                          placeholder="0.0"
                      />
                      <span className="text-sm text-slate-600 absolute -right-4 bottom-2">x</span>
                  </div>
              </div>

              <div className="text-center">
                  <label className="text-xs text-slate-500 block mb-2">Target Yield</label>
                  <div className="relative inline-block">
                      <input 
                          type="number"
                          step="0.1"
                          value={marketData.investorYieldTarget || ''}
                          onChange={(e) => handleUpdate({ investorYieldTarget: parseFloat(e.target.value) })}
                          className="w-24 bg-transparent text-center text-3xl font-bold text-amber-400 outline-none border-b border-slate-700 focus:border-amber-500"
                          placeholder="0.0"
                      />
                      <span className="text-sm text-slate-600 absolute -right-4 bottom-2">%</span>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};
