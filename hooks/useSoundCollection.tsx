import getSoundMintCall from '@/lib/sound/getSoundMintCall';
import { useEffect, useState } from 'react';
import useConnectedWallet from './useConnectedWallet';
import { Chain, baseSepolia } from 'viem/chains';

const useSoundCollection = () => {
  const { connectedWallet } = useConnectedWallet();
  const [destinationChain, setDestinationChain] = useState<Chain>(baseSepolia);
  const [collectionAddress, setCollectionAddress] = useState<string>('');
  const [bridgeAmount, setBridgeAmount] = useState<bigint>(0n);
  const [mintInfo, setMintInfo] = useState<any>();
  console.log('sweets mintInfo', mintInfo);

  useEffect(() => {
    const init = async () => {
      console.log('sweets destinationChain.id', destinationChain.id);
      const response = (await getSoundMintCall(
        connectedWallet,
        destinationChain.id,
        collectionAddress as `0x${string}`,
      )) as any;
      console.log('SWEETS response', response);
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
