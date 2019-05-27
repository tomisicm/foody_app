<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <FilterObjects
          :perPage="perPage"
          :cuisine="cuisine"
          v-on:newSearch="handleSearch($event)"
        />
      </b-col>

      <b-col cols="8">
        <b-row>
          <div cols="4">
            <b-dropdown
              split
              variant="primary"
              class="m-2"
              v-model="perPage"
            >
              <template slot="button-content">{{perPage}}</template>
              <b-dropdown-item v-for="(perPage, index) in perPageOptions" v-bind:key="index" @click="updateperPage($event)" href="#">{{perPage}}</b-dropdown-item>
            </b-dropdown>
          </div>
          <div cols="8">
            <b-pagination
              v-model="page"
              :total-rows="total"
              :per-page="perPage"
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
      perPage: 10,
      perPageOptions: [10, 25, 50, 100],
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
      this.pages = data.pages
      this.total = data.total
      console.log(data)
    },

    updateperPage (event) {
      this.perPage = parseInt(event.target.text, 10)
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
