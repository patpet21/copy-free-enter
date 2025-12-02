
import { investorPackageService } from '../services/investor_package_service';

declare var describe: (name: string, callback: () => void) => void;
declare var it: (name: string, callback: () => void) => void;
declare var expect: (value: any) => any;

describe('InvestorPackageBuilder', () => {
  it('should generate a complete package', async () => {
    const result = await investorPackageService.generatePackage(
        { name: "Test" }, {}, {}, {}
    );

    expect(result).toBeDefined();
    expect(result.deckOutline.length).toBeGreaterThan(0);
    expect(result.faq.length).toBeGreaterThan(0);
    expect(result.status).toBe('generated');
  });
});
