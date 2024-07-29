import { Meteor } from 'meteor/meteor';
import { DataCollection } from '../dataCollection';

Meteor.publish('dataCollection', async () => await DataCollection.find());
