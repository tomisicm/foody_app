<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <FilterObjects
          :perPage="perPage"
          :cuisine="cuisine"
          @update:filterCriteria="updateFilter($event)"
          @onSearch="handleSearch"
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
                <b-dropdown-item
                  v-for="(perPage, index) in perPageOptions"
                  v-bind:key="index" @click="updatePerPage($event)"
                  href="#"
                >
                  {{perPage}}
                </b-dropdown-item>
            </b-dropdown>
          </div>
          <div v-if="items.length > 1" cols="8">
            <b-pagination
              v-model="page"
              :total-rows="total"
              :per-page="perPage"
              @change="updatePage($event)"
            />
          </div>
        </b-row>
        <b-table
          :items="items"
          :fields="fields"
          @row-clicked="openCateringInNewTab($event)"
          striped
          hover
        >
          <template slot="address" slot-scope="items">
            {{ items.fullAddress }}
          </template>
        </b-table>
      </b-col>
  </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import cateringService from '@/utils/services/catering-service'

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
          key: 'cuisine',
          sortable: true
        },
        rating: {
          label: 'Rating',
          key: 'rating',
          sortable: true
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
      let routeData = this.$router.resolve({ name: 'catering', params: { id: event._id } })
      window.open(routeData.href, '_blank')
    }

  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

  components: { FilterObjects }
}
</script>

<style>
ul.pagination.b-pagination.pagination-md {
  margin-top: .5rem;
}
</style>
