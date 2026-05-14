<template>
  <div class="App">
    <AppNavigator msg="hello world" />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import AppNavigator from './components/AppNavigator.vue'
</script>

<style scoped>
.App {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
