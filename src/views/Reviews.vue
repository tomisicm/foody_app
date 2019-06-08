<template>
<div>
  <div>Reviews page</div>
  <b-container fluid>

    <FilterReviews />

    <b-table
      :items="reviews"
      :fields="fields"
      striped
      hover
    />

  </b-container>
</div>
</template>

<script>
import reviewService from '@/utils/services/review-service'
import FilterReviews from '@/components/FilterReviews'

export default {
  data () {
    return {
      filter: null,
      reviews: [],
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
    async getReviews () {
      const { data } = await reviewService.getReviews({})
      this.reviews = data.docs
    }
  },

  created () {
    this.getReviews()
  },

  components: {
    FilterReviews
  },
  name: 'Reviews'
}
</script>
