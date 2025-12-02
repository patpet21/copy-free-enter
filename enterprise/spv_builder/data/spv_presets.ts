
export interface ImplementationStep {
  id: string;
  title: string;
  desc: string;
  duration: string;
  requiredRole: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface LegalFormPreset {
  id: string;
  label: string;
  description: string;
  badge: string;
  minCapital: string;
  setupTime: string;
  pros: string[];
  cons: string[];
  roadmap: ImplementationStep[];
}

export interface JurisdictionPreset {
  code: string;
  name: string;
  flag: string;
  forms: LegalFormPreset[];
}

export const SPV_PRESETS: Record<string, JurisdictionPreset> = {
  'IT': {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    forms: [
      {
        id: 'SRL',
        label: 'S.r.l. (Limited Liability Co)',
        description: 'Standard vehicle for Real Estate SPVs. Flexible governance, limited liability.',
        badge: 'Most Popular',
        minCapital: '€10,000',
        setupTime: '1-2 Weeks',
        pros: ['Full Liability Shield', 'Crowdfunding Eligible', 'Flexible Management'],
        cons: ['Public Notary Mandatory', 'Annual Filing Costs'],
        roadmap: [
          { id: '1', title: 'Draft By-Laws (Statuto)', desc: 'Define governance and profit distribution rules.', duration: '2 Days', requiredRole: 'Legal Counsel', status: 'completed' },
          { id: '2', title: 'Deposit Share Capital', desc: 'Wire 25% of capital to provisional bank account.', duration: '1 Day', requiredRole: 'Sponsor', status: 'pending' },
          { id: '3', title: 'Notarial Deed', desc: 'Physical meeting with Public Notary to sign incorporation.', duration: '1 Day', requiredRole: 'Notary', status: 'pending' },
          { id: '4', title: 'Tax ID & VAT (P.IVA)', desc: 'Obtain fiscal code from Agenzia delle Entrate.', duration: '1 Day', requiredRole: 'Accountant', status: 'pending' },
          { id: '5', title: 'Chamber of Commerce', desc: 'Register in "Registro delle Imprese".', duration: '3-5 Days', requiredRole: 'Admin', status: 'pending' },
          { id: '6', title: 'PEC Activation', desc: 'Certified Email setup for official comms.', duration: 'Instant', requiredRole: 'IT Admin', status: 'pending' }
        ]
      },
      {
        id: 'SPA',
        label: 'S.p.A. (Joint Stock Co)',
        description: 'For large-scale capital raises (>€50M). Shares are tradable securities.',
        badge: 'Institutional',
        minCapital: '€50,000',
        setupTime: '3-4 Weeks',
        pros: ['Tradable Shares', 'High Credibility', 'Multiple Share Classes'],
        cons: ['Board of Auditors Required', 'Higher Maint. Costs'],
        roadmap: [
          { id: '1', title: 'Draft Articles of Association', desc: 'Complex structuring of share classes.', duration: '5 Days', requiredRole: 'Legal Counsel', status: 'pending' },
          { id: '2', title: 'Full Capital Deposit', desc: '100% of capital must be subscribed.', duration: '2 Days', requiredRole: 'Investors', status: 'pending' },
          { id: '3', title: 'Public Deed', desc: 'Notarial Act.', duration: '1 Day', requiredRole: 'Notary', status: 'pending' },
          { id: '4', title: 'Appoint Auditors', desc: 'Collegio Sindacale appointment.', duration: 'N/A', requiredRole: 'Shareholders', status: 'pending' }
        ]
      }
    ]
  },
  'US-DE': {
    code: 'US-DE',
    name: 'USA (Delaware)',
    flag: '🇺🇸',
    forms: [
      {
        id: 'LLC',
        label: 'Series LLC',
        description: 'Create unlimited segregated "cells" under one parent. Ideal for multi-asset platforms.',
        badge: 'Scalable',
        minCapital: '$0',
        setupTime: '24 Hours',
        pros: ['Segregated Liability', 'One Filing Fee', 'Pass-through Tax'],
        cons: ['Banking Complexity', 'Franchise Tax per Series'],
        roadmap: [
          { id: '1', title: 'Name Availability Search', desc: 'Check Delaware Corporate Registry.', duration: 'Instant', requiredRole: 'Auto', status: 'completed' },
          { id: '2', title: 'File Cert. of Formation', desc: 'Submit Division of Corporations filing.', duration: '24h', requiredRole: 'Reg. Agent', status: 'pending' },
          { id: '3', title: 'Operating Agreement', desc: 'Internal contract defining Series rules.', duration: '2 Days', requiredRole: 'Legal', status: 'pending' },
          { id: '4', title: 'Obtain EIN', desc: 'IRS Tax ID for the Master LLC.', duration: '1 Day', requiredRole: 'Admin', status: 'pending' }
        ]
      },
      {
        id: 'C-CORP',
        label: 'C-Corporation',
        description: 'Standard for Venture Capital. Issues shares, not membership units.',
        badge: 'VC Standard',
        minCapital: '$0',
        setupTime: '2-3 Days',
        pros: ['Preferred Shares', 'QSBS Tax Exemptions', 'Easy Exit'],
        cons: ['Double Taxation', 'Rigid Governance'],
        roadmap: [
          { id: '1', title: 'File Certificate', desc: 'Delaware filing.', duration: '24h', requiredRole: 'Reg. Agent', status: 'pending' },
          { id: '2', title: 'Adopt Bylaws', desc: 'Governance rules.', duration: '2 Days', requiredRole: 'Board', status: 'pending' },
          { id: '3', title: 'First Board Meeting', desc: 'Appoint officers and issue stock.', duration: '1 Day', requiredRole: 'Board', status: 'pending' }
        ]
      }
    ]
  },
  'UK': {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    forms: [
      {
        id: 'LTD',
        label: 'Private Ltd Company',
        description: 'Fastest setup globally. Trusted common law framework.',
        badge: 'Fast',
        minCapital: '£1',
        setupTime: '4 Hours',
        pros: ['Online Formation', 'No Notary', 'Global Trust'],
        cons: ['Public PSC Register (Privacy)', 'Corp Tax'],
        roadmap: [
          { id: '1', title: 'Companies House Filing', desc: 'Online submission IN01.', duration: '4h', requiredRole: 'Auto', status: 'pending' },
          { id: '2', title: 'Articles of Association', desc: 'Model articles or custom.', duration: 'Instant', requiredRole: 'Admin', status: 'pending' },
          { id: '3', title: 'PSC Register', desc: 'Declare beneficial owners.', duration: 'N/A', requiredRole: 'Compliance', status: 'pending' }
        ]
      }
    ]
  },
  'AE-DIFC': {
    code: 'AE-DIFC',
    name: 'UAE (DIFC)',
    flag: '🇦🇪',
    forms: [
      {
        id: 'SPV',
        label: 'Prescribed Company (SPV)',
        description: 'Lightweight entity for holding assets. 0% Tax.',
        badge: 'Tax Neutral',
        minCapital: '$100',
        setupTime: '5-7 Days',
        pros: ['Common Law', '0% Corp Tax', 'No Office Required'],
        cons: ['Requires Corp Service Provider', 'Annual Fees'],
        roadmap: [
          { id: '1', title: 'Hire CSP', desc: 'Appoint Corporate Service Provider.', duration: '2 Days', requiredRole: 'Sponsor', status: 'pending' },
          { id: '2', title: 'Initial Approval', desc: 'ROC Name Reservation.', duration: '2 Days', requiredRole: 'CSP', status: 'pending' },
          { id: '3', title: 'Submit UBO Data', desc: 'Strict KYC on owners.', duration: '3 Days', requiredRole: 'Compliance', status: 'pending' },
          { id: '4', title: 'License Issuance', desc: 'Final incorporation certificate.', duration: '1 Day', requiredRole: 'Registrar', status: 'pending' }
        ]
      }
    ]
  }
};
