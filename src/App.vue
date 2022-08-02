<template>
  <header-component/>
  <router-view/>
  <footer-component/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default defineComponent({
  components: {
    HeaderComponent,
    FooterComponent
  }
})
</script>
