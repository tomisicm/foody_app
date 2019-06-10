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
    </b-table>
  </div>

  </b-container>
</div>
</template>

<script>
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
          key: 'createdBy.name'
        },
        totalRating: {
          label: 'Rating',
          key: 'totalRating'
        },
        cuisineService: {
          label: 'Place Name',
          key: 'item.name'
        },
        cuisineAddress: {
          label: 'Address',
          key: 'item.fullAddress'
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

  mixins: [ commonFilter ],
  components: {
    FilterReviews
  },
  name: 'Reviews'
}
</script>
