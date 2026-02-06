import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DeliveryPreference = 'IN_STORE' | 'DELIVERY' | 'CURBSIDE';

interface DeliveryPreferenceState {
  preference: DeliveryPreference | null;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  carColor: string;
  pickupDate: string;
  pickupTime: string;
  setPreference: (preference: DeliveryPreference) => void;
  setAddress: (address: string) => void;
  setDeliveryDateTime: (date: string, time: string) => void;
  setCarColor: (color: string) => void;
  setPickupDateTime: (date: string, time: string) => void;
  reset: () => void;
}

const initialState = {
  preference: null,
  address: '',
  deliveryDate: '',
  deliveryTime: '',
  carColor: '',
  pickupDate: '',
  pickupTime: '',
};

export const usePreferenceStore = create<DeliveryPreferenceState>()(
  persist(
    (set) => ({
      ...initialState,
      setPreference: (preference) => set({ preference }),
      setAddress: (address) => set({ address }),
      setDeliveryDateTime: (date, time) => set({ deliveryDate: date, deliveryTime: time }),
      setCarColor: (carColor) => set({ carColor }),
      setPickupDateTime: (date, time) => set({ pickupDate: date, pickupTime: time }),
      reset: () => set(initialState),
    }),
    {
      name: 'preference-storage',
    }
  )
);
