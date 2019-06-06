<template>
  <b-container class="mt-2">
    <b-row>
      <b-button @click="handleBack" size="lg" variant="primary"><font-awesome-icon icon="long-arrow-alt-left" /> Back</b-button>
    </b-row>
    <b-form>
      <b-form-row class="mx-1 my-3">
        <label class="h4">Title: </label>
        <div class="h4">
          {{review.title}}
        </div>
        <b-row class="mx-4 my-1">@{{review.createdBy}}</b-row>
      </b-form-row>

      <div role="tablist" class="mx-1">

        <baseCollapse
          headline="General Impression"
          :inEditMode=true
          id="general"
        >
          <template v-slot:mainbody>
            <baseEditable
              :content.sync="review.generalImpression"
              :inEditMode.sync="inEditMode"
              @update="review.generalImpression = $event"
            />
          </template>

          <template v-slot:additionalbody>
            <b-col sm="3">
              <label class="my-1">Rating:</label>
            </b-col>
            <b-col sm="2">
              <star-rating
                :read-only="!inEditMode"
                :increment=0.1
                :star-size=20
                v-model="review.generalRating"
              />
            </b-col>
          </template>
        </baseCollapse>

        <baseCollapse
          headline="Food Impression"
          :inEditMode=true
          id="food"
        >
          <template v-slot:mainbody>
            <baseEditable
              :content.sync="review.foodSection"
              :inEditMode.sync="inEditMode"
              @update="review.foodSection = $event"
            />
          </template>

          <template v-slot:additionalbody>
            <b-col sm="3">
              <label class="my-1">Rating:</label>
            </b-col>
            <b-col sm="2">
              <star-rating
                :read-only="!inEditMode"
                :increment=0.1
                :star-size=20
                v-model="review.foodRating"
              />
            </b-col>
          </template>
        </baseCollapse>

        <baseCollapse
          headline="Staff Impression"
          :inEditMode=true
          id="staff"
        >
          <template v-slot:mainbody>
            <baseEditable
              :content.sync="review.staffSection"
              :inEditMode="inEditMode"
              @update="review.staffSection = $event"
            />
          </template>

          <template v-slot:additionalbody>
            <b-col sm="3">
              <label class="my-1">Rating:</label>
            </b-col>
            <b-col sm="2">
              <star-rating
                :read-only="!inEditMode"
                :increment=0.1
                :star-size=20
                v-model="review.staffRating"
              />
            </b-col>
          </template>
        </baseCollapse>
      </div>

      <b-row class="mx-1 my-2 mb-4">
        <b-button class="mx-1"
          v-if="!inEditMode"
          @click="toggleEditMode"
          variant="outline-primary">Edit</b-button>
        <b-button class="mx-1"
          v-else
          @click="toggleEditMode"
          variant="outline-primary">Save</b-button>
        <b-button class="mx-1"
          v-if="!inEditMode"
          @click="onSubmit"
          variant="primary">Submit</b-button>
      </b-row>
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
      inEditMode: false,
      review: {}
    }
  },

  methods: {
    async getReviewData () {
      const { data } = await reviewService.getReview(this.$route.params.id)
      this.review = data
    },
    async onSubmit () {
      await reviewService.editReview(this.review)
    },
    toggleEditMode () {
      this.inEditMode = !this.inEditMode
    },
    handleBack () {
      window.history.back()
    }
  },

  created () {
    this.getReviewData()
  },

  /* computed: {
    readyForSubmit () {
      return _.isEqual(this.review, this.initReview) && !this.inEditMode
    }
  }, */

  components: { baseEditable, StarRating, baseCollapse },
  name: 'Review_Page'
}
</script>
