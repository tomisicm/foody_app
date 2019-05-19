<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <FilterObjects />
      </b-col>

      <b-col cols="8">
        <baseTable />
      </b-col>
  </b-row>
  </b-container>
</template>

<script>
import FilterObjects from '@/components/FilterObjects'
import baseTable from '@/components/base/baseTable'

export default {
  name: 'home',

  components: { FilterObjects, baseTable }
}
</script>
