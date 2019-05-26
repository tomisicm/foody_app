<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <FilterObjects :cuisine="cuisine"/>
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
      fields: {
        last_name: {
          label: 'Person last name',
          sortable: true
        },
        first_name: {
          label: 'Person first name',
          sortable: false
        },
        city: {
          key: 'address.city',
          label: 'City',
          sortable: true
        },
        'address.country': {
          label: 'Country',
          sortable: true
        }
      },
      items: [
        {
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald',
          address: { country: 'USA', city: 'New York' }
        },
        {
          age: 21,
          first_name: 'Larsen',
          last_name: 'Shaw',
          address: { country: 'Canada', city: 'Toronto' }
        },
        {
          age: 89,
          first_name: 'Geneva',
          last_name: 'Wilson',
          address: { country: 'Australia', city: 'Sydney' }
        },
        {
          age: 38,
          first_name: 'Jami',
          last_name: 'Carney',
          address: { country: 'England', city: 'London' }
        }
      ]
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
