<template>
<div>
  <div>Find reviews:</div>
  <b-container fluid>

    <FilterReviews class="mx-1"
      @update:filterCriteria="updateFilter($event)"
      @onSearch="handleSearch"
    />

  <b-row class="mx-1 mt-2">
    <div cols="4">
      <b-dropdown
        split
        variant="secondary"
        split-variant="outline-secondary"
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
    <div v-if="reviews.length > 1" cols="8">
      <b-pagination
        v-model="page"
        :total-rows="total"
        :per-page="perPage"
        @change="updatePage($event)"
      />
    </div>
  </b-row>

  <div class="mx-2">
    <h4>Reviews:</h4>
    <b-table
      :items="reviews"
      :fields="fields"
      striped
      hover
      head-variant="dark"
      outlined="outlined"
      @row-clicked="openReview($event)"
    >
      <template slot="address" slot-scope="reviews">
        {{ reviews.item.catering.address.city }}, {{ reviews.item.catering.address.street }}
      </template>
    </b-table>
  </div>

  </b-container>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import reviewService from '@/utils/services/review-service'
import FilterReviews from '@/components/FilterReviews'

import commonFilter from '@/utils/mixins/commonFilter'

export default {
  data () {
    return {
      filter: null,
      page: 1,
      perPage: 10,
      perPageOptions: [10, 25, 50, 100],
      reviews: [],
      fields: {
        title: {
          label: 'Review Title',
          key: 'title'
        },
        createdBy: {
          label: 'Review Author',
          key: 'author.name'
        },
        totalRating: {
          label: 'Rating',
          key: 'avgRating',
          formatter: value => {
            return value.toFixed(2)
          }
        },
        status: {
          label: 'Approved',
          key: 'approved'
        },
        cuisineService: {
          label: 'Place Name',
          key: 'catering.name'
        },
        cuisineAddress: {
          label: 'Address',
          key: 'address'
        }
      }
    }
  },

  methods: {
    async handleSearch () {
      const { data } = await reviewService.searchForReviews(this.filter, this.getParams())
      this.reviews = data.docs
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

    openReview (event) {
      this.$router.push({ name: 'review', params: { id: event._id } })
    }
  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

  mixins: [ commonFilter ],
  components: {
    FilterReviews
  },
  name: 'Reviews'
}
</script>
