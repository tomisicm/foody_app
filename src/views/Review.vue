<template>
  <b-container class="mt-2">
    <b-form>
      <b-form-row class="mx-1 my-3">
        <label class="h4">Title: </label>
        <div class="h4">
          {{review.title}}
        </div>
      </b-form-row>
      
      <div>{{content}}</div>
    </b-form>
  </b-container>
</template>
<script>
import reviewService from '@/utils/services/review-service'

export default {
  data () {
    return {
      review: null,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita distinctio quia repudiandae possimus optio. Nemo deleniti iure mollitia officia vel corrupti, quibusdam rerum quidem maiores velit possimus tempore dolorem rem.'
    }
  },

  methods: {
    async getReviewData () {
      const { data } = await reviewService.getReview(this.$route.params.id)
      this.review = data
    }
  },

  created () {
    this.getReviewData()
  },

  name: 'Review_Page'
}
</script>
