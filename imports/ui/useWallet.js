import { BrowserProvider } from 'ethers';
import { Meteor } from 'meteor/meteor';
import { ref } from 'vue';
import { callMethod } from 'vue-meteor-tracker';

export const useWallet = () => {
  let provider;
  const connectedAddress = ref(null);
  // const provider = ref(null);  // @TODO if provider is handled with ref() it doesn't work properly
  const availableProviders = ref([]);
  const availableWallets = ref({});

  const initProviders = () => {
    // Try to get available wallet providers from EIP6963 event listener and window.ethereum
    // This method will fail if we visit the page with mobile Core App
    try {
      window.addEventListener('eip6963:announceProvider', event => {
        if (availableProviders.value.some(p => p.info.uuid === event.detail.info.uuid)) return;
        availableProviders.value = [...availableProviders.value, event.detail];
      });
      window.dispatchEvent(new Event('eip6963:requestProvider'));

      const { isAvalanche, isCoinbaseWallet, isMetaMask, isOneInchIOSWallet, isRabby, isTrust } = window.ethereum;
      availableWallets.value = {
        core: isAvalanche,
        coinbase: isCoinbaseWallet,
        metamask: isMetaMask,
        oneInch: isOneInchIOSWallet,
        rabby: isRabby,
        trust: isTrust,
      };
    } catch (e) {
      // Most likely using mobile wallet
      console.error(e);
    }
  };

  const connectWallet = async (selectedProvider = null) => {
    try {
      provider = new BrowserProvider(selectedProvider?.provider || window.ethereum);
      const accounts = await (selectedProvider?.provider || window.ethereum).request({ method: 'eth_requestAccounts' });
      connectedAddress.value = accounts[0].toLowerCase();
      await signMessage();
    } catch (e) {
      console.error('PROVIDER ERROR', e);
    }
  };

  const signMessage = async () => {
    // Sign the message and log in with received payload
    try {
      const signatureData = { address: connectedAddress.value };
      const data = await callMethod('getSignMessage', signatureData);
      const signer = await provider.getSigner();
      const signature = await provider.send('eth_signTypedData_v4', [await signer.getAddress(), JSON.stringify(data)]);
      await login({ address: connectedAddress.value, signature });
    } catch (e) {
      console.error('SIGNING MESSAGE ERROR', e);
    }
  };

  const login = async payload => {
    const { address, token, userId } = await callMethod('validateLogin', payload);
    Meteor.loginWithToken(token);
    console.debug('LOGGED IN:', address, userId);
  };

  const logout = () => {
    Meteor.logout();
    console.debug('LOGGED OUT.');
  };

  return {
    availableProviders,
    connectWallet,
    initProviders,
    logout,
    signMessage,
  };
};
