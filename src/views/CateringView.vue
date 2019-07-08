<template>
  <b-container>
    <baseBack :to="{ name: 'caterings' }"/>

    <router-view/>

  </b-container>
</template>

<script>
import baseBack from '@/components/navigation/baseBack'

export default {
  data () {
    return {

    }
  },

  components: {
    baseBack
  }
}
</script>
