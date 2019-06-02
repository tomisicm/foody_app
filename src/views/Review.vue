<template>
  <b-container class="mt-2">
    <b-form>
      <b-form-row class="mx-1 my-3">
        <label class="h4">Title: </label>
        <div class="h4">
          {{review && review.title}}
        </div>
      </b-form-row>

      <baseEditable
        :content.sync="review && review.foodSection"
        :inEditMode.sync="inEditMode"
        @update="review.foodSection = $event"
      />

    </b-form>
  </b-container>
</template>
<script>
import reviewService from '@/utils/services/review-service'
import baseEditable from '@/components/baseEditable'

export default {
  data () {
    return {
      inEditMode: true,
      review: null
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

  components: { baseEditable },
  name: 'Review_Page'
}
</script>
