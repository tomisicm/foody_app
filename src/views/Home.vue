<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <FilterObjects :cuisine="cuisine" v-on:newSearch="handleSearch($event)"/>
      </b-col>

      <b-col cols="8">
        <b-table
          :items="items"
          :fields="fields"
          striped
          hover
        />
      </b-col>
  </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import FilterObjects from '@/components/FilterObjects'

export default {
  name: 'home',

  data () {
    return {
      limit: 10,
      page: 1,
      pages: null,
      total: null,
      fields: {
        name: {
          label: 'Name',
          key: 'name',
          sortable: true
        },
        'address.city': {
          key: 'address.city',
          label: 'City'
        },
        'address.street': {
          key: 'address.street',
          label: 'Street'
        },
        food: {
          label: 'Cuisine Origin',
          key: 'foodOrigin.name',
          sortable: true
        }
      },
      items: [

      ]
    }
  },

  methods: {
    handleSearch ({ data }) {
      this.items = data.docs
      console.log(data)
    }
  },

  actions: {
    ...mapActions('cuisineStore', ['getCuisine'])
  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

  async created () {
    await this.$store.dispatch('cuisineStore/getCuisine')
  },

  components: { FilterObjects }
}
</script>
