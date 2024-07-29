import { Meteor } from 'meteor/meteor';
import { DataCollection } from '../../api/dataCollection/dataCollection';

Meteor.startup(async () => {
  if ((await DataCollection.find().countAsync()) === 0) {
    for (let i = 0; i < 10000; i++) {
      await DataCollection.insertAsync({ name: `DOC ####${i}`, created: new Date(), updated: new Date() });
    }
  }

  // const now = new Date();
  // testTimeout(now, 0);
  // Meteor.setInterval(() => testInterval(now), 5000);
});

let intervalRun = 0;
const testInterval = (date) => {
  console.log(`${new Date(date).toISOString()} INTERVAL RUN ${intervalRun}`);
  intervalRun++;
}

const testTimeout = (date, run) => {
  console.log(`${new Date(date).toISOString()} TIMEOUT RUN ${run}`);
  Meteor.setTimeout(() => testTimeout(date, run + 1), 5000);
}
