<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/details">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- <h1 class="title">{{ $route.name }}</h1> -->
  <RouterView />
</template>
