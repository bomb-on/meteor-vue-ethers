import { Meteor } from 'meteor/meteor';
import { ActivityCollection } from '../activityCollection';

Meteor.publish('activityCollection', async () => await ActivityCollection.find());
