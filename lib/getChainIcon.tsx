import {
  optimism,
  optimismSepolia,
  baseSepolia,
  base,
  sepolia,
  mainnet,
  zora,
  zoraSepolia,
  arbitrum,
  arbitrumNova,
} from 'viem/chains';

import ethereumIcon from '../public/icons/Ethereum.svg';
import optimismIcon from '../public/icons/Optimism.svg';
import baseIcon from '../public/icons/Base.svg';
import arbitrumIcon from '../public/icons/Arbitrum.svg';
import zoraIcon from '../public/images/zorb.png';

const getChainIcon = (chainId: number) => {
  switch (chainId) {
    case base.id:
    case baseSepolia.id:
      return baseIcon;
    case optimism.id:
    case optimismSepolia.id:
      return optimismIcon;
    case mainnet.id:
    case sepolia.id:
      return ethereumIcon;
    case zora.id:
    case zoraSepolia.id:
      return zoraIcon;
    case arbitrum.id:
    case arbitrumNova.id:
      return arbitrumIcon;
    default:
      return ethereumIcon;
  }
};

export default getChainIcon;
