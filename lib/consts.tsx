import { FrameMetadataType } from '@coinbase/onchainkit';
import {
  arbitrum,
  arbitrumNova,
  base,
  baseSepolia,
  holesky,
  linea,
  mainnet,
  optimism,
  sepolia,
  zora,
  zoraSepolia,
} from 'viem/chains';
export const TITLE = 'sound bridge';
export const FARCASTER_ID_REGISTRY = '0x00000000fc6c5f01fc30151999387bb99a9f489b';
export const VERCEL_URL = process.env.NEXT_PUBLIC_FRAME_URL || 'http://localhost:3000';
export const TESTNET = process.env.NEXT_PUBLIC_TESTNET;
export const DEFAULT_FRAME = {
  buttons: [
    {
      label: 'see results',
    },
  ],
  image: {
    src: `${VERCEL_URL}/api/og`,
  },
  postUrl: `${VERCEL_URL}/api/frame`,
} as FrameMetadataType;
export const FRAME_INPUT_PLACEHOLDER = '0x... or .eth';

export const SOUND_FACTORY = '0x0000000000aec84F5BFc2af15EAfb943bf4e3522';

export const AIRSTACK_API_URL = 'https://api.airstack.xyz/graphql';
export const SOURCE_CHAINS = TESTNET
  ? [baseSepolia, zoraSepolia, sepolia, holesky]
  : [base, zora, optimism, arbitrum, arbitrumNova, mainnet, linea];
export const DESTINATION_CHAINS = TESTNET ? [baseSepolia, sepolia] : [base, optimism, mainnet];
