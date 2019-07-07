<template>
  <div>
    <List
      :items="reviews.docs"
    >
      <template v-slot:listitem="{item}">
        <SingleReview :item="item"/>
      </template>
    </List>

    <!-- TODO: no reviews case -->
    <div cols="12">
      <b-pagination
        v-model="reviews.page"
        :total-rows="reviews.total"
        :per-page="reviews.limit"
        @change="updateReviewsPage($event)"
      />
    </div>
  </div>
</template>

<script>
import List from '@/components/base/List'
import SingleReview from '@/components/SingleReview'

import reviewService from '@/utils/services/review-service'

export default {
  data () {
    return {
      reviews: {
        docs: [],
        page: 1,
        perPage: 10
      }
    }
  },

  methods: {
    async getReviews () {
      const { data } = await reviewService.getReviewsByItemId(this.$route.params.id, this.getReviewParams())
      this.reviews = data
    },

    getReviewParams () {
      return {
        page: this.reviews.page,
        perPage: this.reviews.limit
      }
    },

    updateReviewsPage (event) {
      this.reviews.page = event
      this.getReviews()
    }
  },

  created () {
    this.getReviews()
  },

  components: {
    List, SingleReview
  }
}
</script>
