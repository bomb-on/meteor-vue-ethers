<script setup>
import { useMeteor } from '../useMeteor';

const { activityCollection, dataCollection, user } = useMeteor();
</script>

<template>
  <div>
    {{ user?._id ? `Logged in as ${user.username}` : 'Connect your wallet ^' }}
  </div>
  <div>
    Activity collection size: {{ activityCollection.length }}
  </div>
  <div>
    Data collection size: {{ dataCollection.length }}
  </div>
</template>
