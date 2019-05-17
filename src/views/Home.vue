<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <FilterObjects />
      </b-col>

      <b-col cols="8">
        8
      </b-col>
  </b-row>
  </b-container>
</template>

<script>
import FilterObjects from '@/components/FilterObjects'

export default {
  name: 'home',

  components: { FilterObjects }
}
</script>
