<template>
  <b-container class="mt-2">
    <b-form>
      <h4>Please complete the following questions</h4>
      <!-- <div>Ill most likely add some cuisine info onto this page.</div> -->
      <b-form-row class="mx-1 my-3">
        <label>Title: </label>
        <b-input
          v-model="review.title"
        />
      </b-form-row>

      <div role="tablist" class="mx-1">

          <ReviewComponent
          headline="General Impression"
          :inEditMode="true"
          locator="general"
          :reviewContent="review.generalImpression"
          :reviewRating="review.generalRating"
          @update:content="review.generalImpression = $event"
          @update:rating="review.generalRating = $event"
        />

        <ReviewComponent
          headline="Food Impression"
          :inEditMode="true"
          locator="food"
          :reviewContent="review.foodSection"
          :reviewRating="review.foodRating"
          @update:content="review.foodSection = $event"
          @update:rating="review.foodRating = $event"
        />

        <ReviewComponent
          headline="Staff Impression"
          :inEditMode="true"
          locator="staff"
          :reviewContent="review.staffSection"
          :reviewRating="review.staffRating"
          @update:content="review.staffSection = $event"
          @update:rating="review.staffRating = $event"
        />

      </div>
      <b-row v-if="readyForSubmition" class="mx-1 my-3">
        <b-button variant="primary" @click="onSubmit">Submit</b-button>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import _ from 'lodash'

import reviewService from '@/utils/services/review-service'

import ReviewComponent from '@/components/parts/ReviewComponent'

export default {
  data () {
    return {
      review: {
        title: '',
        generalImpression: '',
        foodSection: '',
        staffSection: '',
        generalRating: 0,
        foodRating: 0,
        staffRating: 0,
        item: this.$route.query.item
      }
    }
  },

  methods: {
    async onSubmit () {
      const { data } = await reviewService.createReview(this.getReviewData())
      this.$router.push({ name: 'review', params: { id: data._id } })
    },

    getReviewData () {
      return {
        title: this.review.title,
        generalImpression: this.review.generalImpression,
        foodSection: this.review.foodSection,
        staffSection: this.review.staffSection,
        generalRating: this.review.generalRating,
        foodRating: this.review.foodRating,
        staffRating: this.review.staffRating,
        item: this.review.item
      }
    }
  },

  computed: {
    readyForSubmition () {
      return !_.isEmpty(this.review.title) &&
      (!_.isEmpty(this.review.generalImpression) ||
          !_.isEmpty(this.review.foodSection) ||
          !_.isEmpty(this.review.staffSection))
    }
  },

  components: {
    ReviewComponent
  },

  name: 'New_Review'
}
</script>
