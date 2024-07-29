<script setup>
import { onBeforeMount, ref } from 'vue';
import ConnectWalletModal from './components/ConnectWalletModal.vue';
import { useMeteor } from './useMeteor';
import { useWallet } from './useWallet';

const { user } = useMeteor();
const { availableProviders, initProviders, logout } = useWallet();

const connectWalletModalOpened = ref(false);

onBeforeMount(() => {
  initProviders();
});

const toggleModal = () => {
  connectWalletModalOpened.value = !connectWalletModalOpened.value;
};
</script>

<template>
  <ConnectWalletModal v-show="connectWalletModalOpened" @close="toggleModal" :providers="availableProviders" />
  <div class="content">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/public">Public</RouterLink>
      <RouterLink to="/protected">Protected</RouterLink>

      <button v-if="!user?._id" @click="toggleModal">Connect wallet</button>
      <button v-else @click="logout">Logout {{ user.username.slice(0, 6) }}</button>
    </nav>
    <hr />
    <RouterView />
  </div>
</template>
