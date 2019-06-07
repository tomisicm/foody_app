<template>
  <div>This is all reviews page</div>
</template>

<script>
import reviewService from '@/utils/services/review-service'

export default {
  data () {
    return {
      reviews: []
    }
  },

  methods: {
    async getReviews () {
      const { data } = await reviewService.getReviews({})
      this.reviews = data
    }
  },

  created () {
    this.getReviews()
  },
  name: 'Reviews'
}
</script>
