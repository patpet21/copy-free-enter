
import { ProjectEntity } from "../../client_projects/domain/project.entity";

export interface MarketStat {
  totalAum: number;
  activeProjects: number;
  totalInvestors: number;
  capitalDeployed: number;
  complianceScore: number;
}

export interface EnterpriseProfile {
  id: string;
  fullName: string;
  email: string;
  role: 'Super Admin' | 'Compliance Officer' | 'Analyst';
  organization: {
    name: string;
    tier: 'Enterprise' | 'Institution';
    region: string;
    kybStatus: 'Verified';
    apiKey: string;
  };
}

export interface MarketListing {
  id: string;
  name: string;
  ticker: string;
  assetType: string;
  jurisdiction: string;
  valuation: number;
  targetRaise: number;
  raised: number;
  minTicket: number;
  apy: number;
  status: 'Live' | 'Coming Soon' | 'Closed';
  image?: string;
}

export interface TradeTicker {
  id: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  orders: { price: number; amount: number; type: 'buy' | 'sell' }[];
}

export class EnterpriseMarketService {
  
  getGlobalStats(): MarketStat {
    return {
      totalAum: 145000000, // $145M
      activeProjects: 12,
      totalInvestors: 3420,
      capitalDeployed: 89000000, // $89M
      complianceScore: 98.5
    };
  }

  getEnterpriseProfile(): EnterpriseProfile {
    return {
      id: 'ent-admin-01',
      fullName: 'Alexander Sterling',
      email: 'a.sterling@blackrock-sim.com',
      role: 'Super Admin',
      organization: {
        name: 'Sterling Capital Partners',
        tier: 'Institution',
        region: 'New York, USA',
        kybStatus: 'Verified',
        apiKey: 'pk_live_51H...'
      }
    };
  }

  getListings(): MarketListing[] {
    return [
      {
        id: '1',
        name: 'Skyline Tower Fund',
        ticker: 'SKY',
        assetType: 'Real Estate',
        jurisdiction: 'US-DE',
        valuation: 50000000,
        targetRaise: 20000000,
        raised: 15400000,
        minTicket: 25000,
        apy: 8.5,
        status: 'Live',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '2',
        name: 'Green Energy Infra',
        ticker: 'NRG',
        assetType: 'Energy',
        jurisdiction: 'LU',
        valuation: 12000000,
        targetRaise: 5000000,
        raised: 1200000,
        minTicket: 50000,
        apy: 12.0,
        status: 'Live',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '3',
        name: 'Venice Luxury Hotel',
        ticker: 'VNC',
        assetType: 'Hospitality',
        jurisdiction: 'IT',
        valuation: 25000000,
        targetRaise: 10000000,
        raised: 0,
        minTicket: 10000,
        apy: 6.8,
        status: 'Coming Soon',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '4',
        name: 'Tech Growth VC I',
        ticker: 'TCV',
        assetType: 'Funds',
        jurisdiction: 'KY',
        valuation: 100000000,
        targetRaise: 25000000,
        raised: 25000000,
        minTicket: 100000,
        apy: 0, // Capital Gains focus
        status: 'Closed',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
      }
    ];
  }

  getSecondaryMarket(): TradeTicker[] {
    return [
      {
        id: 't1',
        symbol: 'SKY',
        price: 52.40,
        change24h: 2.4,
        volume24h: 450000,
        marketCap: 50000000,
        orders: this.generateMockOrderBook(52.40)
      },
      {
        id: 't2',
        symbol: 'NRG',
        price: 10.15,
        change24h: -0.5,
        volume24h: 120000,
        marketCap: 12000000,
        orders: this.generateMockOrderBook(10.15)
      }
    ];
  }

  private generateMockOrderBook(basePrice: number) {
    const orders = [];
    // Sells
    for(let i=0; i<5; i++) {
      orders.push({
        price: basePrice + (basePrice * 0.01 * (i+1)),
        amount: Math.floor(Math.random() * 1000),
        type: 'sell' as const
      });
    }
    // Buys
    for(let i=0; i<5; i++) {
      orders.push({
        price: basePrice - (basePrice * 0.01 * (i+1)),
        amount: Math.floor(Math.random() * 1000),
        type: 'buy' as const
      });
    }
    return orders;
  }
}

export const enterpriseMarketService = new EnterpriseMarketService();
