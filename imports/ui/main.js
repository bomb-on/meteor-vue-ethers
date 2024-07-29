import { Meteor } from 'meteor/meteor';
import { createApp } from 'vue';
import { VueMeteor } from 'vue-meteor-tracker';
import { env } from '../startup/constants';

import App from './App.vue';
import { router } from './router';

Meteor.startup(() => {
  const app = createApp(App);
  app.use(router);
  app.use(VueMeteor);
  app.mount('#app');
});

console.debug(`DEVELOPMENT: ${env === 'development'}`);
