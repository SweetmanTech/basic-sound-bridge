import { baseSepolia } from 'viem/chains';
import usePrivyWalletClient from './usePrivyWalletClient';
import { WalletClient, toHex } from 'viem';
import relayBridge from '@/lib/relay/relayBridge';
import useConnectedWallet from './useConnectedWallet';
import { useEffect } from 'react';
import getSolverCapacity from '@/lib/relay/getSolverCapacity';
import { toast } from 'react-toastify';
import {
  TESTNET_RELAY_API,
  convertViemChainToRelayChain,
  createClient,
} from '@reservoir0x/relay-sdk';
import getViemNetwork from '@/lib/clients/getViemNetwork';
import { useBridgeProvider } from '@/providers/BridgeProvider';
import getSoundMintCall from '@/lib/sound/getSoundMintCall';
import relayCall from '@/lib/relay/relayCall';

const useRelayCall = () => {
  const { wallet: privyWallet } = useConnectedWallet();
  const chainId = parseInt(privyWallet?.chainId?.split?.(':')[1] || '1', 10);
  const activeChain = getViemNetwork(chainId);
  const { walletClient } = usePrivyWalletClient(activeChain);
  const wallet = walletClient as WalletClient;
  const { setSourceTx, setDestinationTx, mintInfo, destinationChain } = useBridgeProvider() as any;
  const toChainId = destinationChain.id;

  const handleProgress = (steps: any, fees: any, currentStep: any, currentStepItem: any) => {
    const transaction = currentStepItem?.items?.[0]?.txHashes?.[0];
    const txChainId = transaction?.chainId;
    const txHash = transaction?.txHash;
    if (!txHash) return;
    if (txChainId === toChainId) {
      setDestinationTx({
        chainId: toChainId,
        txHash,
      });
    }
    if (txChainId === chainId) {
      setSourceTx({ txHash, chainId });
      setDestinationTx({ chainId: toChainId });
    }
  };

  const prepareCall = async () => {
    const { enabled } = await getSolverCapacity({
      originChainId: chainId,
      destinationChainId: toChainId,
    });

    if (!enabled) {
      toast.error(
        'Relay not enabled for selected chains. Please select different chains & try again.',
      );
    }
    return enabled;
  };

  const call = async () => {
    const isPrepared = await prepareCall();
    if (!isPrepared) return;
    if (!mintInfo) return;

    await relayCall({
      wallet,
      chainId,
      toChainId,
      txs: [mintInfo],
      onProgress: handleProgress,
    });
  };

  useEffect(() => {
    const chains = [convertViemChainToRelayChain(activeChain)];
    createClient({
      baseApiUrl: TESTNET_RELAY_API,
      chains,
    });
  }, [privyWallet]);

  return { call };
};

export default useRelayCall;
