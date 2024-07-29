export const env = process.env.NODE_ENV;

export const chains = [
  {
    id: 0xa869, // 43113
    explorerUrl: 'https://testnet.snowtrace.io',
    label: 'fuji',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    token: 'AVAX',
  },
  {
    id: 0xa86a, // 43114
    explorerUrl: 'https://snowtrace.io/',
    label: 'mainnet',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    token: 'AVAX',
  },
  {
    id: 0x7a69, // 31337
    explorerUrl: '',
    label: 'hardhat',
    rpcUrl: 'http://127.0.0.1:8545',
    token: 'ETH',
  },
];
export const chainLabel = env === 'production' ? 'mainnet' : env === 'development' ? 'fuji' : 'hardhat';
export const currentChain = chains.find(i => i.label === chainLabel);
export const chainId = currentChain.id;
