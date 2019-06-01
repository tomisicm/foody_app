<template>
  <b-container class="mt-2">
      <b-form>
        <h4>Please complete the following questions</h4>
        <!-- <div>Ill most likely add some cuisine info onto this page.</div> -->
        <b-form-row class="mx-1 my-3">
          <label>Title: </label>
          <b-input
            v-model="title"
          />
        </b-form-row>

        <div role="tablist" class="mx-1">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.general variant="btn btn-primary">General Impression</b-button>
            </b-card-header>

            <b-collapse id="general" visible role="tabpanel">
              <b-card-body>
                Please describe general impression. How was the place? Would you go back?
                <b-textarea
                  v-model="generalImpression"
                />
                <b-row class="my-1">
                  <b-col sm="3">
                    <label class="my-1">Overall rating: </label>
                  </b-col>
                  <b-col sm="2">
                  <star-rating
                    :increment=0.1
                    :star-size=20
                    v-model="generalRating"
                  />
                  </b-col>
                </b-row>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.food variant="btn btn-primary">Menu and Food</b-button>
            </b-card-header>

            <b-collapse id="food" role="tabpanel">
              <b-card-body>
                Please describe food. How was your meal? Is there particular item what would you recommend?
                <b-textarea
                  v-model="foodSection"
                />
                <b-row class="my-1">
                  <b-col sm="3">
                    <label class="my-1">Overall rating: </label>
                  </b-col>
                  <b-col sm="2">
                  <star-rating
                    :increment=0.1
                    :star-size=20
                    v-model="foodRating"
                  />
                  </b-col>
                </b-row>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.staff variant="btn btn-primary">Staff and Atmosphere</b-button>
            </b-card-header>

            <b-collapse id="staff" role="tabpanel">
              <b-card-body>
                How was service?
                <b-textarea
                  v-model="staffSection"
                />
                <b-row class="my-1">
                  <b-col sm="3">
                    <label class="my-1">Overall rating: </label>
                  </b-col>
                  <b-col sm="2">
                  <star-rating
                    :increment=0.1
                    :star-size=20
                    v-model="staffRating"
                  />
                  </b-col>
                </b-row>
              </b-card-body>
            </b-collapse>
          </b-card>
        <b-row v-if="readyForSubmition" class="mx-1 my-3">
          <b-button variant="primary" @click="onSubmit">Submit</b-button>
        </b-row>
        </div>
    </b-form>
  </b-container>
</template>
<script>
import _ from 'lodash'

import reviewService from '@/utils/services/review-service'

import StarRating from 'vue-star-rating'

export default {
  data () {
    return {
      title: '',
      generalImpression: '',
      foodSection: '',
      staffSection: '',
      generalRating: 0,
      foodRating: 0,
      staffRating: 0,
      item: this.$route.query.item
    }
  },

  methods: {
    async onSubmit () {
      await reviewService.createReview(this.getReviewData())
      this.$router.push({ name: 'catering', params: { id: this.item } })
    },

    getReviewData () {
      return {
        title: this.title,
        generalImpression: this.generalImpression,
        foodSection: this.foodSection,
        staffSection: this.staffSection,
        generalRating: this.generalRating,
        foodRating: this.foodRating,
        staffRating: this.staffRating,
        item: this.item
      }
    }
  },

  computed: {
    readyForSubmition () {
      return !_.isEmpty(this.title) &&
      (!_.isEmpty(this.generalImpression) ||
          !_.isEmpty(this.foodSection) ||
          !_.isEmpty(this.staffSection))
    }
  },

  components: {
    StarRating
  },

  name: 'New_Review'
}
</script>
