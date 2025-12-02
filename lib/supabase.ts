import { createClient } from '@supabase/supabase-js';
import { UserProfile, UserRole, Investment, Order, Transaction } from '../types';

// Access Environment Variables Safely
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    const val = (import.meta as any).env?.[key];
    if (val) return val;
  } catch (e) {
    // ignore
  }
  
  // Fallback for preview
  if (key === 'VITE_SUPABASE_URL') return "https://eksjajpcbiuvxcqnxxlx.supabase.co";
  if (key === 'VITE_SUPABASE_ANON_KEY') return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrc2phanBjYml1dnhjcW54eGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDU1MDAsImV4cCI6MjA3OTUyMTUwMH0.tL08QW3dWc03CRISX52F9c_wpRJinbLkDA-YgyMJSrU";
  
  return undefined;
};

const SUPABASE_URL = getEnv('VITE_SUPABASE_URL');
const SUPABASE_KEY = getEnv('VITE_SUPABASE_ANON_KEY');

// Determine if we should force mock mode (if keys are missing)
const IS_MOCK_FORCED = !SUPABASE_URL || !SUPABASE_KEY;

// --- REAL CLIENT ---
const realClient = !IS_MOCK_FORCED && SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY) 
  : null;

// --- IN-MEMORY DATABASE (Mock Fallback) ---
const MEMORY_DB = {
  profiles: [] as UserProfile[],
  roles: [] as UserRole[],
  investments: [] as Investment[],
  orders: [] as Order[],
  transactions: [] as Transaction[],
  properties: [] as any[], 
  session: null as any
};

// --- MOCK QUERY BUILDER ---
class MockQueryBuilder {
  private _data: any[];
  private _error: any;

  constructor(data: any[]) {
    this._data = data || [];
    this._error = null;
  }

  select(columns?: string) { return this; }
  
  eq(column: string, value: any) {
    if (Array.isArray(this._data)) {
        this._data = this._data.filter(row => row[column] === value);
    }
    return this;
  }

  neq(column: string, value: any) {
    if (Array.isArray(this._data)) {
        this._data = this._data.filter(row => row[column] !== value);
    }
    return this;
  }

  or(filters: string) { return this; }

  in(column: string, values: any[]) {
    if (Array.isArray(this._data)) {
        this._data = this._data.filter(row => values.includes(row[column]));
    }
    return this;
  }

  order(column: string, { ascending = true }: { ascending?: boolean } = {}) {
    if (Array.isArray(this._data)) {
        this._data.sort((a, b) => {
            if (a[column] < b[column]) return ascending ? -1 : 1;
            if (a[column] > b[column]) return ascending ? 1 : -1;
            return 0;
        });
    }
    return this;
  }

  limit(count: number) {
    if (Array.isArray(this._data)) {
        this._data = this._data.slice(0, count);
    }
    return this;
  }

  single() {
    if (Array.isArray(this._data) && this._data.length > 0) {
        this._data = this._data[0];
    } else {
        this._data = null as any; 
    }
    return this;
  }

  insert(data: any[]) {
    return Promise.resolve({ data, error: null });
  }

  then(resolve: (value: any) => void, reject: (reason?: any) => void) {
    setTimeout(() => {
        resolve({ data: this._data, error: this._error });
    }, 10);
  }
}

// --- MOCK CLIENT WRAPPER ---
const mockClient = {
  auth: {
    getSession: async () => {
      return { data: { session: MEMORY_DB.session }, error: null };
    },
    
    signInWithPassword: async ({ email, password }: { email: string, password?: string }) => {
      const session = {
        user: { email, id: 'mock-user-id', aud: 'authenticated' },
        access_token: 'mock-token',
        expires_at: 9999999999
      };
      MEMORY_DB.session = session;
      return { data: { session }, error: null };
    },

    signUp: async ({ email, password, options }: { email: string, password?: string, options?: any }) => {
      const session = {
        user: { email, id: 'mock-user-id', user_metadata: options?.data, aud: 'authenticated' },
        access_token: 'mock-token',
      };
      MEMORY_DB.session = session;
      return { data: { session }, error: null };
    },

    signOut: async () => {
      MEMORY_DB.session = null;
      return { error: null };
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      if (MEMORY_DB.session) {
          callback('SIGNED_IN', MEMORY_DB.session);
      }
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
  from: (table: string) => {
      let dataSource: any[] = [];
      if (table === 'profiles') dataSource = MEMORY_DB.profiles;
      else if (table === 'investments') dataSource = MEMORY_DB.investments;
      else if (table === 'orders') dataSource = MEMORY_DB.orders;
      else if (table === 'properties') dataSource = MEMORY_DB.properties;

      const builder = new MockQueryBuilder(dataSource);
      (builder as any).insert = async (data: any[]) => {
          const item = data[0];
          if (table === 'profiles') MEMORY_DB.profiles.push(item);
          if (table === 'investments') MEMORY_DB.investments.push(item);
          if (table === 'orders') MEMORY_DB.orders.push(item);
          return { data: [item], error: null };
      };
      return builder;
  }
};

// EXPORT: Use real client if keys exist, else mock
export const supabase = !IS_MOCK_FORCED && realClient ? realClient : mockClient;