
import { v4 as uuidv4 } from 'uuid';
import { EnterpriseAI } from '../../core/ai_service';
import { InvestorPackageEntity, DeckSlide, FAQItem } from '../domain/investor_package.entity';
import { KPIEntity } from '../domain/kpi.entity';

export class InvestorPackageService {

  async generatePackage(
    project: any,
    spv: any,
    valuation: any,
    token: any
  ): Promise<InvestorPackageEntity> {
    
    // 1. Generate KPIs
    const kpis: KPIEntity[] = [
      { 
        label: 'Projected IRR', 
        value: valuation?.metrics?.irr || '12%', 
        category: 'Financial', 
        trend: 'up',
        description: 'Internal Rate of Return over 5 years.'
      },
      { 
        label: 'Est. Yield (APY)', 
        value: valuation?.metrics?.grossYield || '6.5%', 
        category: 'Financial',
        description: 'Annual cash-on-cash return.'
      },
      { 
        label: 'Token Price', 
        value: token?.tokenPrice || '$50', 
        category: 'Market',
        unit: 'USD'
      },
      { 
        label: 'Hard Cap', 
        value: token?.hardCap || '$5M', 
        category: 'Market',
        unit: 'USD'
      }
    ];

    // 2. Generate Outline (Mock AI)
    const outline: DeckSlide[] = [
      {
        id: '1',
        slideTitle: 'Investment Opportunity',
        keyPoints: [
            `Access to premium ${project?.assetType || 'Real Estate'}`,
            `Targeting ${kpis[0].value} IRR`,
            'Fully regulated security token structure'
        ],
        visualSuggestion: 'High-res photo of asset with overlay text.'
      },
      {
        id: '2',
        slideTitle: 'The Asset',
        keyPoints: [
            `Located in ${project?.location || 'Prime Market'}`,
            'Strong historical occupancy',
            'Value-add potential via renovation'
        ],
        visualSuggestion: 'Map view and floor plans.'
      },
      {
        id: '3',
        slideTitle: 'Financial Overview',
        keyPoints: [
            `Valuation: ${valuation?.valueCentral || '$10M'}`,
            `Projected Exit: Year 5`,
            `Distributions: Quarterly via USDC`
        ],
        visualSuggestion: 'Cashflow waterfall bar chart.'
      },
      {
        id: '4',
        slideTitle: 'Structure & Security',
        keyPoints: [
            `Asset held by ${spv?.legalForm || 'SPV'}`,
            `Compliance: ${spv?.jurisdictionCode || 'US-DE'} Law`,
            'Token holders have legal claim on equity'
        ],
        visualSuggestion: 'Corporate structure diagram (SPV -> Asset).'
      }
    ];

    // 3. Generate Narrative
    const narrative = `
### Executive Summary
We are excited to present **${project?.name || 'Project Alpha'}**, a unique opportunity to participate in the ownership of a premier ${project?.assetType || 'Asset'} located in ${project?.location || 'Global Market'}. Through blockchain tokenization, we are lowering the barrier to entry, allowing eligible investors to access institutional-grade returns previously reserved for private equity.

### The Value Proposition
This asset targets a net **IRR of ${kpis[0].value}** and a stable cash yield of **${kpis[1].value}**. By leveraging the efficiency of the ${token?.tokenStandard || 'ERC-3643'} standard, we reduce administrative costs and pass those savings directly to investors.

### Security & Structure
Your investment is backed by real equity in a bankruptcy-remote **${spv?.legalForm || 'SPV'}**. This is not a crypto-currency; it is a compliant digital security representing legal ownership rights.
    `;

    // 4. Generate FAQ
    const faq: FAQItem[] = [
      {
        id: 'f1',
        category: 'Financial',
        question: 'How are dividends paid?',
        answer: 'Dividends are distributed quarterly in USDC directly to your whitelisted wallet. You can claim them via the Investor Dashboard.'
      },
      {
        id: 'f2',
        category: 'Legal',
        question: 'What do I actually own?',
        answer: `You own tokens representing non-voting Class A shares in the ${spv?.legalForm || 'SPV'}, which holds the title to the asset.`
      },
      {
        id: 'f3',
        category: 'Token',
        question: 'Can I sell my tokens?',
        answer: 'Yes, after the initial 12-month lock-up period (Reg D), tokens can be traded on our partner ATS or peer-to-peer among whitelisted investors.'
      }
    ];

    return {
      id: uuidv4(),
      projectId: project?.id || 'temp',
      deckOutline: outline,
      narrativeMarkdown: narrative.trim(),
      headlines: [
        `Own High-Yield ${project?.assetType} in ${project?.location}`,
        "Institutional Assets. Digital Access.",
        `Targeting ${kpis[0].value} IRR with Quarterly Payouts`
      ],
      faq,
      keyMetrics: kpis,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'generated'
    };
  }

  // Placeholder for regenerating specific sections
  async regenerateSection(section: 'narrative' | 'faq', context: any): Promise<any> {
      // Call EnterpriseAI here
      return "Updated content...";
  }
}

export const investorPackageService = new InvestorPackageService();
