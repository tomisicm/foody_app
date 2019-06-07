<template>
<div>
  <div>Reviews page</div>
  <b-container>

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

export default {
  data () {
    return {
      reviews: [],
      fields: {
        name: {
          label: 'Title',
          key: 'title',
          sortable: true
        },
        createdBy: {
          label: 'Author',
          key: 'createdBy.name'
        },
        totalRating: {
          label: 'User Rating',
          key: 'totalRating'
        },
        cuisineService: {
          label: 'Cuisine Service',
          key: 'item.name'
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
  name: 'Reviews'
}
</script>
