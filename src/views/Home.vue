<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <FilterObjects :cuisine="cuisine" v-on:newSearch="handleSearch($event)"/>
      </b-col>

      <b-col cols="8">
        <b-row>
          <div cols="4">
            <b-dropdown
              split
              variant="primary"
              text="10"
              class="m-2"
              >
              <b-dropdown-item href="#">25</b-dropdown-item>
              <b-dropdown-item href="#">50</b-dropdown-item>
              <b-dropdown-item href="#">100</b-dropdown-item>
            </b-dropdown>
          </div>
          <div cols="8">
            <b-pagination
              v-model="currentPage"
              :total-rows="total"
              :per-page="limit"
            />
          </div>
        </b-row>
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
      currentPage: 1,
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
          key: 'cuisine.name',
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

<style>
ul.pagination.b-pagination.pagination-md {
  margin-top: .5rem;
}
</style>
