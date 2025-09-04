import React, { createContext, useState, useContext, ReactNode } from 'react';

// 관리할 데이터의 타입(모양) 정의
interface PlanState {
  cities: string[];
  dateRange: { startDate: Date | null; endDate: Date | null };
  budget: number;
  transport: '걷기' | '대중교통' | '운전' | null;
}

// 초기 상태값
const initialState: PlanState = {
  cities: [],
  dateRange: { startDate: null, endDate: null },
  budget: 0,
  transport: null,
};


const PlanContext = createContext<{
  plan: PlanState;
  setCities: (cities: string[]) => void;
  setDateRange: (range: { startDate: Date | null; endDate: Date | null }) => void;
  setBudget: (budget: number) => void;
  setTransport: (transport: '걷기' | '대중교통' | '운전' | null) => void;
}>({
  plan: initialState,
  setCities: () => {},
  setDateRange: () => {},
  setBudget: () => {},
  setTransport: () => {},
});

// Provider 컴포넌트 생성
export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<PlanState>(initialState);

  const setCities = (cities: string[]) => {
    setPlan(prev => ({ ...prev, cities }));
  };

  const setDateRange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setPlan(prev => ({ ...prev, dateRange: range }));
  };

  const setBudget = (budget: number) => {
    setPlan(prev => ({ ...prev, budget }));
  };

  const setTransport = (transport: '걷기' | '대중교통' | '운전' | null) => {
    setPlan(prev => ({ ...prev, transport }));
  };
  
  const value = { plan, setCities, setDateRange, setBudget, setTransport };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

// Custom Hook 생성
export const usePlanStore = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlanStore는 PlanProvider 안에서만 사용해야 합니다.');
  }
  return context;
};