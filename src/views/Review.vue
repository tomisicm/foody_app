<template>
  <b-container class="mt-2">
    <b-form>
      <b-form-row class="mx-1 my-3">
        <label class="h4">Title: </label>
        <div class="h4">
          {{review.title}}
        </div>
      </b-form-row>

      <div role="tablist" class="mx-1">

        <baseCollapse
          headline="General Impression"
          :inEditMode=true id="generall"
        >
        <template v-slot:body>
          <baseEditable
            :content.sync="review.generalImpression"
            :inEditMode.sync="inEditMode"
            @update="review.generalImpression = $event"
          />
        </template>
        </baseCollapse>

      </div>

    </b-form>
  </b-container>
</template>
<script>
import reviewService from '@/utils/services/review-service'

import StarRating from 'vue-star-rating'
import baseEditable from '@/components/baseEditable'
import baseCollapse from '@/components/baseCollapse'

export default {
  data () {
    return {
      inEditMode: true,
      review: {}
    }
  },

  methods: {
    async getReviewData () {
      const { data } = await reviewService.getReview(this.$route.params.id)
      this.review = data
    },

    onLiveEdit (event) {
      const src = event.target.innerHTML
      this.review.foodSection = src
    }
  },

  created () {
    this.getReviewData()
  },

  components: { baseEditable, StarRating, baseCollapse },
  name: 'Review_Page'
}
</script>

<style>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
