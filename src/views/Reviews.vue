<template>
<div>
  <div>Find reviews:</div>
  <b-container fluid>

    <FilterReviews
      @update:filterCriteria="updateFilter($event)"
      @onSearch="handleSearch"
    />

  <div class="mb-0">
    Reviews:
    <b-table
      :items="reviews"
      :fields="fields"
      striped
      hover
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
import { mapActions, mapGetters } from 'vuex'

import reviewService from '@/utils/services/review-service'
import FilterReviews from '@/components/FilterReviews'

import commonFilter from '@/utils/mixins/commonFilter'

export default {
  data () {
    return {
      filter: null,
      reviews: [],
      page: 1,
      perPage: 20,
      fields: {
        name: {
          label: 'Title',
          key: 'title'
        },
        createdBy: {
          label: 'Author',
          key: 'author.name'
        },
        totalRating: {
          label: 'Rating',
          key: 'avgRating'
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
    // to be replaced with the post one
    async handleSearch () {
      const { data } = await reviewService.searchForReviews(this.filter, this.getParams())
      this.reviews = data.docs
      this.total = data.total
    },

    updateFilter (event) {
      this.filter = event
      // console.log(this.filter)
    }
  },

  // temprorary will i fix filter
  actions: {
    ...mapActions('cuisineStore', ['getCuisine'])
  },
  // temprorary will i fix filter
  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

  async created () {
    await this.$store.dispatch('cuisineStore/getCuisine')
  },

  mixins: [ commonFilter ],
  components: {
    FilterReviews
  },
  name: 'Reviews'
}
</script>
