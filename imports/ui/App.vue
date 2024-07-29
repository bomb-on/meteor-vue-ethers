<script setup>

</script>

<template>
  <div class="content">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/public">Public</RouterLink>
      <RouterLink to="/protected">Protected</RouterLink>
      <button>Connect wallet</button>
    </nav>
    <hr />
    <RouterView />
  </div>
</template>
