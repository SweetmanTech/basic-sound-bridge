import { Interface } from 'ethers/lib/utils';
import { getPublicClient } from '../clients';
import handleTxError from '../handleTxError';
import getViemNetwork from '../clients/getViemNetwork';

const getSoundMintCall = async (
  mintRecipient: `0x${string}`,
  chainId: number,
  collectionAddress: `0x${string}`,
) => {
  try {
    const publicClient = getPublicClient(chainId);
    const anyPublicClient = publicClient as any;

    const mintSchedules = await anyPublicClient.editionV2.mintSchedules({
      editionAddress: collectionAddress,
    });

    const mintParams = await anyPublicClient.editionV2.mintParameters({
      account: mintRecipient,
      chain: getViemNetwork(chainId),
      schedule: mintSchedules.activeSchedules[0],
      quantity: 1,
      editionAddress: collectionAddress,
      mintTo: mintRecipient,
    });

    const { args, functionName, address: SUPERMINTER, value, abi } = mintParams.mint.input;
    const soundMintDataV2 = new Interface(abi).encodeFunctionData(functionName, args);

    return {
      target: SUPERMINTER,
      value,
      allowFailure: false,
      callData: soundMintDataV2,
    };
  } catch (error) {
    handleTxError(error);
    return false;
  }
};

export default getSoundMintCall;
