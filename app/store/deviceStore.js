// src/store/deviceStore.js
import { create } from 'zustand';

export const useDeviceStore = create((set) => ({
  deviceType: getDeviceType(),
  setDeviceType: () => set({ deviceType: getDeviceType() }),
}));

function getDeviceType() {
  const width = window.innerWidth;

  if (width < 768) return 'mobile';      // Phones
  if (width < 1024) return 'tablet';     // Tablets
  return 'desktop';                      // Laptops & larger
}