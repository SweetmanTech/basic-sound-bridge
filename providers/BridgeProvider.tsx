'use client';

import useSoundCollection from '@/hooks/useSoundCollection';
import { createContext, useContext, useMemo, useState } from 'react';

const BridgeContext = createContext(null);

const BridgeProvider = ({ children }: any) => {
  const [sourceTx, setSourceTx] = useState<any>({});
  const [destinationTx, setDestinationTx] = useState<any>({});
  const soundCollection = useSoundCollection();

  const value = useMemo(
    () => ({
      sourceTx,
      setSourceTx,
      destinationTx,
      setDestinationTx,
      ...soundCollection,
    }),
    [sourceTx, setSourceTx, destinationTx, setDestinationTx, soundCollection],
  );

  return <BridgeContext.Provider value={value as any}>{children}</BridgeContext.Provider>;
};

export const useBridgeProvider = () => {
  const context = useContext(BridgeContext);
  if (!context) {
    throw new Error('useBridgeProvider must be used within a BridgeProvider');
  }
  return context;
};

export default BridgeProvider;
