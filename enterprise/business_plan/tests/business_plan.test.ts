
declare var describe: (name: string, callback: () => void) => void;
declare var it: (name: string, callback: () => void) => void;
declare var expect: (value: any) => any;

import { businessPlanService } from '../services/business_plan_service';

describe('BusinessPlanService', () => {
  it('should generate a plan with all required chapters', async () => {
    const plan = await businessPlanService.generatePlan({}, {}, {}, {});
    expect(plan.executiveSummary).toBeDefined();
    expect(plan.financialPlan).toBeDefined();
    expect(plan.status).toBe('generated');
  });
});
