import { Meteor } from 'meteor/meteor';
import { ref } from 'vue';
import { autorun, subscribe, useAutorun, useSubscribe } from 'vue-meteor-tracker';
import { ActivityCollection } from '../api/activityCollection/activityCollection';
import { DataCollection } from '../api/dataCollection/dataCollection';

export const useMeteor = () => {
  const user = ref(null);
  const activityCollection = ref(null);
  const dataCollection = ref(null);

  // @TODO no need to subscribe to Meteor.users?
  subscribe('activityCollection');
  subscribe('dataCollection');

  // @TODO data not loading asynchronously?
  user.value = autorun(() => Meteor.user()).result;
  activityCollection.value = autorun(() => ActivityCollection.find({}).fetch()).result;
  dataCollection.value = autorun(() => DataCollection.find({}).fetch()).result;

  return {
    user: user.value,
    activityCollection: activityCollection.value,
    dataCollection: dataCollection.value,
  };
}
