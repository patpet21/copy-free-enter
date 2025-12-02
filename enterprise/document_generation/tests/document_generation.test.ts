import { docMergeService } from '../services/doc_merge_service';

declare var describe: (name: string, callback: () => void) => void;
declare var it: (name: string, callback: () => void) => void;
declare var expect: (value: any) => any;

describe('DocMergeService', () => {
  
  it('should generate a document and replace placeholders', async () => {
    const mockContext = {
      project: { name: 'Test Tower', location: 'London' },
      valuation: { valueCentral: 1000000 },
      token: { tokenPrice: 10 }
    };

    const doc = await docMergeService.generateDocument('investor_factsheet', mockContext);
    
    expect(doc).toBeDefined();
    expect(doc.contentMarkdown).toContain('Test Tower');
    expect(doc.contentMarkdown).toContain('London');
    expect(doc.contentMarkdown).not.toContain('{{PROJECT_NAME}}');
  });

  it('should handle missing data gracefully', async () => {
    const mockContext = {
      project: { name: 'Empty Project' }
      // missing valuation, token, etc.
    };

    const doc = await docMergeService.generateDocument('simulation_report', mockContext);
    
    expect(doc.contentMarkdown).toContain('Empty Project');
    expect(doc.contentMarkdown).toContain('N/A'); // Service should fallback to N/A or defaults
  });

});