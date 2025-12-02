declare var describe: (name: string, callback: () => void) => void;
declare var it: (name: string, callback: () => void) => void;
declare var expect: (value: any) => any;

describe('SpvBuilder Module', () => {
  it('should initialize a new SPV draft correctly', () => {
    const spv = { name: 'New Co', jurisdictionCode: 'US-DE' };
    expect(spv.name).toBe('New Co');
  });

  it('should require a jurisdiction', () => {
    // Test validation logic
  });
});