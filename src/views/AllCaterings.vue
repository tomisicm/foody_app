<template>
  <b-container fluid>
    <b-row class="d-md-block">
      <b-col md="4" order="2" order-sm="2" class="float-left">
        <b-row class="ml-1 mr-1">
        <FilterObjects
          :perPage="perPage"
          @update:filterCriteria="updateFilter($event)"
          @onSearch="handleSearch"
        />
        </b-row>
      </b-col>

      <b-col v-if="isSignedIn"  md="8" order="1" order-sm="1" class="h-25 float-right">
        <b-nav pills class="my-2 ml-1">
          <b-nav-item active>All Foody Places</b-nav-item>
          <b-nav-item :to="{ name: 'addcatering' }">Add Foody Place</b-nav-item>
        </b-nav>
      </b-col>

      <b-col md="8" order="3" order-sm="3" class="float-right">
        <b-row class="ml-1">
          <div cols="4">
            <b-dropdown
              split
              variant="primary"
              class="m-2"
              v-model="perPage"
            >
              <template slot="button-content">{{perPage}}</template>
                <b-dropdown-item
                  v-for="(perPage, index) in perPageOptions"
                  v-bind:key="index" @click="updatePerPage($event)"
                  href="#"
                >
                  {{perPage}}
                </b-dropdown-item>
            </b-dropdown>
          </div>
          <div v-if="items.length >= 1 && pages > 1" cols="8">
            <b-pagination
              v-model="page"
              :total-rows="total"
              :per-page="perPage"
              @change="updatePage($event)"
            />
          </div>
        </b-row>
        <b-table
          head-variant="dark"
          outlined="outlined"
          :items="items"
          :fields="fields"
          @row-clicked="openCateringInNewTab($event)"
          striped
          hover
        >
          <template slot="cuisine" slot-scope="item">
            {{ item.value | formatArray('name') }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import cateringService from '@/utils/services/catering-service'

import arrayToString from '@/utils/mixins/stringArrays'

import FilterObjects from '@/components/FilterObjects'

export default {
  name: 'home',

  data () {
    return {
      filter: null,
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
        cateringAddress: {
          label: 'Address',
          key: 'fullAddress'
        },
        food: {
          label: 'Cuisine Origin',
          key: 'cuisine'
        },
        rating: {
          label: 'Rating',
          key: 'rating',
          sortable: true,
          formatter: value => {
            return value.toFixed(2)
          }
        }
      },
      items: [

      ]
    }
  },

  methods: {
    async handleSearch () {
      let { data } = await cateringService.searchForCatering(this.filter, this.getParams())
      this.items = data.docs
      this.pages = data.pages
      this.total = data.total
    },

    updateFilter (event) {
      this.filter = event
    },

    updatePerPage (event) {
      this.perPage = parseInt(event.target.text, 10)
      this.handleSearch()
    },

    updatePage (newPage) {
      this.page = newPage
      this.handleSearch()
    },

    getParams () {
      return {
        page: this.page,
        perPage: this.perPage
      }
    },

    openCateringInNewTab (event) {
      let routeData = this.$router.resolve({ name: 'viewcatering', params: { id: event._id } })
      window.open(routeData.href, '_blank')
    }

  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine']),
    ...mapGetters('authStore', ['isSignedIn'])
  },

  mixins: [arrayToString],
  components: { FilterObjects }
}
</script>

<style>
ul.pagination.b-pagination.pagination-md {
  margin-top: .5rem;
}
</style>
