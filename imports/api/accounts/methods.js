import { recoverTypedSignature } from '@metamask/eth-sig-util';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { generateSignMessage, updateNonce } from './utils';

Accounts.createUserAsync = async options => {
  const address = options.address.toLowerCase();
  console.log(`CREATING USER ${address}`);

  if (!address) throw new Meteor.Error(400, 'USER ADDRESS NOT SET.');

  const nonce = await updateNonce(address);
  const userSettings = { discordId: null };
  const web3 = { nonce, userSettings };
  const user = { username: address, services: { web3 } };

  return await Accounts._createUserCheckingDuplicates({ user, options });
};

Accounts.onLogin(account => {
  console.log(`USER ${account.user.username} LOGGED IN.`);
});

Meteor.users.createIndexAsync('username', { unique: true, sparse: true });

Meteor.methods({
  getSignMessage: async request => {
    const { address } = request;
    let user = await Meteor.users.findOneAsync({ username: address }, { fields: { username: 1, services: 1 } });

    if (!user) {
      // User doesn't exist yet, create one
      const userID = await Accounts.createUserAsync({ address });
      user = await Meteor.users.findOneAsync(userID);
    } else {
      console.log(`USER ${user.username} FOUND.`);
    }

    console.log(`GENERATING SIGNING MESSAGE FOR ${user.username}.`);
    return generateSignMessage(address, user.services.web3.nonce);
  },
  validateLogin: async function (request) {
    const { address, signature } = request;

    const user = await Meteor.users.findOneAsync({ username: address });
    const data = await generateSignMessage(address, user.services.web3.nonce);
    const signerAddress = recoverTypedSignature({ data, signature, version: 'V4' });

    if (address === signerAddress.toLowerCase()) {
      /*return await Accounts._loginMethod(this, 'validateLogin', request, 'web3', async () => {
        await updateNonce(address);
        return { userId: user._id, address };
      });*/
      const nonce = await updateNonce(address);
      const token = Accounts._generateStampedLoginToken();
      Accounts._insertLoginToken(user._id, token);
      await Meteor.users.updateAsync({ username: address }, { $set: { 'services.web3.nonce': nonce } });
      return { address, userId: user._id, ...token };
    } else {
      throw new Meteor.Error(403, 'Invalid address');
    }
  },
});
