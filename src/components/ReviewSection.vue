<template>
  <div>
    <List
      :items="reviews.docs"
    >
      <template v-slot:listitem="{item}">
        <ReviewCard :item="item"/>
      </template>

      <template v-slot:emptylist>
        <div class="text-size-11">
          Currently, there aren't any reviews for this foody place.
          Signin, if you would like to add one.
        </div>
      </template>
    </List>

    <div v-if="!reviews.docs" cols="12">
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
import ReviewCard from '@/components/ReviewCard'

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
    List, ReviewCard
  }
}
</script>
