import { getClient } from '@reservoir0x/relay-sdk';

const relayCall = async ({ wallet, chainId, toChainId, txs, onProgress }: any) => {
  const client = getClient();

  try {
    await client?.actions.call({
      wallet,
      chainId,
      toChainId,
      txs,
      onProgress,
    });
  } catch (err) {
    console.error(err);
  }
};

export default relayCall;
