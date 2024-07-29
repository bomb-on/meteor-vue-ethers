<script setup>
import { useWallet } from '../useWallet';

const { connectWallet } = useWallet();  // @TODO availableProviders not available???

defineEmits(['close']);
defineProps({
  providers: Array,
});

const handleClick = async provider => {
  await connectWallet(provider);
};
</script>

<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal" @click.stop="">
      <div class="modal-header">Select wallet</div>

      <div class="modal-body">
        <div class="providers-list">
          <div v-for="provider in providers" :key="provider" class="flex flex-col">
            <button type="button" class="button-provider" @click="handleClick(provider)">
              <img :alt="provider.info.name" :src="provider.info.icon" width="32px" /> {{ provider.info.name }}
            </button>
          </div>
        </div>
      </div>

      <div class="modal-footer border-top">
        <div class="flex flex-col items-center padding">
          <button type="button" class="button-small" @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
