'use client';

import Button from '../Button';
import usePrepareWallet from '@/hooks/usePrepareWallet';
import { usePrivy } from '@privy-io/react-auth';

const SwapHeader = () => {
  const { authenticated } = usePrivy();
  const { toggleLogin } = usePrepareWallet();

  return (
    <div className="flex justify-center items-center">
      <Button onClick={toggleLogin} className="flex items-center space-x-2" variant="outline">
        <h2 className="text-2xl font-bold">{authenticated ? 'Logout' : 'Sign In'}</h2>
      </Button>
    </div>
  );
};

export default SwapHeader;
