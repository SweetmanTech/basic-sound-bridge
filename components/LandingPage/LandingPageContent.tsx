'use client';

import useConnectedWallet from '@/hooks/useConnectedWallet';
import MadeBySweets from '../MadeBySweets';
import Swap from '../Swap';
import LandingPageHeader from './LandingPageHeader';
import CollectButton from './CollectButton';

const LandingPageContent = () => {
  const { connectedWallet } = useConnectedWallet();

  return (
    <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-8 md:px-6">
      <LandingPageHeader />
      {connectedWallet && <Swap />}
      {connectedWallet && <CollectButton />}
      <MadeBySweets />
    </div>
  );
};

export default LandingPageContent;
