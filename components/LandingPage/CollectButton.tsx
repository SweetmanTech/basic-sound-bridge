'use client';

import Button from '../Button';
import PendingTxModal from '../PendingTxModal';
import usePrepareWallet from '@/hooks/usePrepareWallet';
import { useBridgeProvider } from '@/providers/BridgeProvider';
import { useState } from 'react';
import Spinner from '../Spinner';
import useRelayCall from '@/hooks/useRelayCall';

const CollectButton = () => {
  const { prepare } = usePrepareWallet();
  const { call } = useRelayCall();
  const { sourceTx, bridgeAmount } = useBridgeProvider() as any;
  const [loading, setLoading] = useState<boolean>(false);
  const missingPrice = bridgeAmount === 0n;
  const disabled = loading || missingPrice;
  const handleClick = async () => {
    if (disabled) return;
    if (!prepare()) return;
    setLoading(true);
    await call();
    setLoading(false);
  };

  return (
    <div>
      <Button
        disabled={disabled}
        onClick={handleClick}
        className="!bg-[#ff5700] flex gap-5 min-h-[50px]"
      >
        {loading && <Spinner size={30} />}
        {loading ? 'Collecting...' : 'Collect'}
      </Button>
      {sourceTx?.txHash && <PendingTxModal />}
    </div>
  );
};

export default CollectButton;
