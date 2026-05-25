'use client';

import { create } from 'zustand';

type SiteState = {
  showQuoteWindow: boolean;
  setShowQuoteWindow: (value: boolean) => void;
};

export const useSiteState = create<SiteState>((set) => ({
  showQuoteWindow: false,
  setShowQuoteWindow: (value) => set({ showQuoteWindow: value }),
}));
