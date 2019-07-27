<template>
  <b-container class="mt-2">
    <b-row>
      <div>
        <b-button @click="handleBack" variant="primary"><font-awesome-icon icon="long-arrow-alt-left" /> Back</b-button>
      </div>
      <div class="h4 mx-5 my-2">
        Title: {{review && review.title}}
      </div>
    </b-row>

    <b-container fluid class="mt-2">
      <b-row
        v-if="review"
      >
        <b-col cols="auto"></b-col>
        <b-col md="4" class="ml-auto">

          <b-button-group>
            <b-button
              :disabled="true"
              variant="outline-success"
              class="ml-2"
            >
              {{ review.likedBy.likes }}</b-button>
            <b-button
              @click="handleLike"
              :disabled="!isSignedIn"
              :pressed="review.likedBy.liked"
              variant="success"><font-awesome-icon icon="thumbs-up" />
            </b-button>
          </b-button-group>
          <b-button
            @click="handleApprove"
            :pressed="!!review.approved"
            class="ml-2"
            variant="success">
            {{review.approved ? 'Approved' : 'Approve' }}
          </b-button>

          <template v-if="isSignedIn">
            <b-button
              @click="handleLock"
              variant="success"
              class="ml-2"
            >
              <font-awesome-icon :icon="!review.locked ? 'lock' : 'lock-open'" />
              {{!review.locked ? 'Lock' : 'Unlock' }}
            </b-button>
          </template>
        </b-col>
      </b-row>
    </b-container>

    <b-form v-if="review">
      <b-row class="text-size-11">
        <b-col class="review__sectrion ml-1 mb-1 mt-4">
          <b-card>
            <b-row class="ml-1">Average rating: {{review.avgRating}}</b-row>
            <b-row class="ml-1">Is review approved? {{!!review.approved ? 'Yes' : 'No'}}</b-row>
            <b-row class="ml-1" v-if="review.item">
              <span>
                Catering: <b-link :to="{ name: 'viewcatering', params: { id: review.item && review.item._id } }">
                  {{review.item && review.item.name}}</b-link>
              </span>
            </b-row>
            <b-row class="ml-1"><span>Address: {{ review.item && review.item.address.city }}</span><span>{{  + review.item && review.item.address.street }} at {{ review.item && review.item.address.streetNo }}</span></b-row>
            <b-row class="ml-1">Cuisine:
              {{ review.item && review.item.cuisine || [] | formatArray('name') }}
            </b-row>
          </b-card>
        </b-col>

        <b-col class="reviewer__sectrion mx-1 mb-1 mt-4">
          <b-card>
            <b-row>
              <b-col md="7" class="mt-4" order="2" order-sm="2" order-md="1">
                <b-row class="ml-1">By: {{review.createdBy && review.createdBy.name}}</b-row>
                <b-row class="ml-1">Profession: {{ review.createdBy && review.createdBy.profile && review.createdBy.profile.profession}}</b-row>
              </b-col>
              <b-col md="5" order="1" order-sm="1" order-md="2">
                <b-img width="110" height="110" :src="img" />
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <div role="tablist" class="mx-1">

        <ReviewComponent
          headline="General Impression"
          :inEditMode="inEditMode"
          locator="general"
          :reviewContent="review.generalImpression"
          :reviewRating="review.generalRating"
          @update:content="review.generalImpression = $event"
          @update:rating="review.generalRating = $event"
        />

        <ReviewComponent
          headline="Food Impression"
          :inEditMode="inEditMode"
          locator="food"
          :reviewContent="review.foodSection"
          :reviewRating="review.foodRating"
          @update:content="review.foodSection = $event"
          @update:rating="review.foodRating = $event"
        />

        <ReviewComponent
          headline="Staff Impression"
          :inEditMode="inEditMode"
          locator="staff"
          :reviewContent="review.staffSection"
          :reviewRating="review.staffRating"
          @update:content="review.staffSection = $event"
          @update:rating="review.staffRating = $event"
        />

      </div>

      <b-row
        v-if="isLoggedUserReviewCreator"
        class="mx-1 my-2 mb-4"
      >
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
import { mapGetters } from 'vuex'
import reviewService from '@/utils/services/review-service'
import arrayToString from '@/utils/mixins/stringArrays'

import StarRating from 'vue-star-rating'
import baseEditable from '@/components/base/baseEditable'
import baseCollapse from '@/components/base/baseCollapse'

import ReviewComponent from '@/components/parts/ReviewComponent'

export default {
  data () {
    return {
      inEditMode: false,
      review: null
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
    },
    async handleLock () {
      await reviewService.changeReviewStatus(this.review._id, { locked: !this.review.locked })
      this.review.locked = !this.review.locked
    },
    async handleApprove () {
      if (!this.review.approved) {
        await reviewService.changeReviewStatus(this.review._id, { approved: true })
        this.review.approved = !this.review.approved
      }
    },

    async handleLike () {
      await reviewService.changeReviewLike(this.$route.params.id)
        .then(() => this.getReviewData())
    }
  },

  computed: {
    ...mapGetters('authStore', ['isSignedIn']),
    ...mapGetters('authStore', ['user']),
    img () {
      return this.review.createdBy && 'http://localhost:3000' + this.review.createdBy.profile.avatar
    },

    isLoggedUserReviewCreator () {
      return this.isSignedIn && this.user._id === (this.review.createdBy || {})._id
    }
  },

  created () {
    this.getReviewData()
  },

  components: { baseEditable, StarRating, baseCollapse, ReviewComponent },
  mixins: [arrayToString],
  name: 'Review_Page'
}
</script>
