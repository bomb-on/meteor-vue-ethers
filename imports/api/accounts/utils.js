import { Meteor } from 'meteor/meteor';
import { chainId } from '../../startup/constants';

export const updateNonce = async address => {
  const nonce = Math.floor(Math.random() * 1_000_000);
  await Meteor.users.updateAsync({ username: address }, { $set: { 'services.web3.nonce': nonce } });
  return nonce;
};

export const generateSignMessage = async (address, nonce) => {
  // https://docs.metamask.io/wallet/how-to/sign-data/#use-eth_signtypeddata_v4
  // https://magic.link/docs/auth/blockchains/ethereum/javascript#sign-typed-data-v-4

  return {
    domain: {
      chainId,
      name: 'My app',
      version: '1',
    },
    message: {
      contents: `Signature for ${address} with nonce ${nonce}`,
    },
    primaryType: 'Message',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
      ],
      Message: [{ name: 'contents', type: 'string' }],
    },
  };
};
