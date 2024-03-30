import getSoundMintCall from '@/lib/sound/getSoundMintCall';
import { useEffect, useState } from 'react';
import useConnectedWallet from './useConnectedWallet';
import { Chain, base, baseSepolia } from 'viem/chains';
import { TESTNET } from '@/lib/consts';

const useSoundCollection = () => {
  const { connectedWallet } = useConnectedWallet();
  const [destinationChain, setDestinationChain] = useState<Chain>(TESTNET ? baseSepolia : base);
  const [collectionAddress, setCollectionAddress] = useState<string>('');
  const [bridgeAmount, setBridgeAmount] = useState<bigint>(0n);
  const [mintInfo, setMintInfo] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const response = (await getSoundMintCall(
        connectedWallet,
        destinationChain.id,
        collectionAddress as `0x${string}`,
      )) as any;
      if (!response) return;
      const soundCall = {
        to: response.target,
        data: response.callData,
        value: response.value.toString(),
      };
      setBridgeAmount(response.value);
      setMintInfo(soundCall);
    };

    if (!collectionAddress || !connectedWallet) return;
    init();
  }, [collectionAddress]);

  return {
    collectionAddress,
    setCollectionAddress,
    destinationChain,
    setDestinationChain,
    mintInfo,
    bridgeAmount,
    setBridgeAmount,
  };
};

export default useSoundCollection;
