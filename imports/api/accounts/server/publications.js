import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', async function () {
  if (this.userId) {
    const user = await Meteor.users.findOneAsync({ _id: this.userId });
    if (user.services.web3.userSettings.isAdmin || user.services.web3.userSettings.isOp) {
      return Meteor.users.find();
    } else {
      return Meteor.users.find(
        { _id: this.userId },
        {
          fields: {
            username: 1,
            createdAt: 1,
            'services.web3.userSettings.discordId': 1,
          },
        },
      );
    }
  }
  return this.ready();
});
