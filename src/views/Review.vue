<template>
  <b-container class="mt-2">
    <b-row>
      <div>
        <b-button @click="handleBack" variant="primary"><font-awesome-icon icon="long-arrow-alt-left" /> Back</b-button>
      </div>
      <div class="h4 mx-5 my-2">
        Title: {{review.title}}
      </div>
    </b-row>

    <b-container fluid class="mt-2">
      <b-row>
        <b-col cols="auto"></b-col>
        <b-col md="4" class="ml-auto">

          <b-button-group>
            <b-button :disabled="true" variant="outline-success" class="ml-2">{{reviewLikes.likes}}</b-button>
            <b-button
              @click="handleLike"
              :disabled="!isSignedIn"
              :pressed="reviewLikes.liked"
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

    <b-form>
      <b-row class="text-size-11">
        <b-col class="review__sectrion ml-1 mb-1 mt-4">
          <b-card>
            <b-row class="ml-1">Average rating: {{review.avgRating}}</b-row>
            <b-row class="ml-1">Is review approved? {{!!review.approved ? 'Yes' : 'No'}}</b-row>
            <b-row class="ml-1" v-if="review.item">
              <span>
                Catering: <b-link :to="{ name: 'catering', params: { id: review.item && review.item._id } }">
                  {{review.item && review.item.name}}</b-link>
              </span>
            </b-row>
            <b-row class="ml-1"><span>Address: {{ review.item && review.item.address.city }},</span><span> {{ review.item && review.item.address.street }} at {{ review.item && review.item.address.streetNo }}</span></b-row>
            <b-row class="ml-1">Cuisine:
              <!-- TODO: mixin -->
              {{ review.item && review.item.cuisine.map(cuis => ' ' +cuis.name ).toString() }}
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

import StarRating from 'vue-star-rating'
import baseEditable from '@/components/base/baseEditable'
import baseCollapse from '@/components/base/baseCollapse'

export default {
  data () {
    return {
      inEditMode: false,
      review: {},
      reviewLikes: {}
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

    async getReviewLikes () {
      const { data } = await reviewService.getReviewLikes(this.$route.params.id)
      this.reviewLikes = data
    },

    async handleLike () {
      await reviewService.changeReviewLike(this.$route.params.id)
        .then(() => this.getReviewLikes())
    }
  },

  computed: {
    ...mapGetters('authStore', ['isSignedIn']),
    ...mapGetters('authStore', ['user']),
    img () {
      return this.review.createdBy && 'http://localhost:3000/' + this.review.createdBy.profile.avatar
    },

    isLoggedUserReviewCreator () {
      // TODO: THIS LOGIC SHOULD BE IN STROE !
      return this.isSignedIn && this.user._id === (this.review.createdBy || {})._id
    }
  },

  created () {
    this.getReviewData()
    this.getReviewLikes()
  },

  components: { baseEditable, StarRating, baseCollapse },
  name: 'Review_Page'
}
</script>
