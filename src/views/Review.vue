<template>
  <b-container class="mt-2">
    <b-form>
      <b-form-row class="mx-1 my-3">
        <label class="h4">Title: </label>
        <div class="h4">
          {{review && review.title}}
        </div>
      </b-form-row>

      <div role="tablist" class="mx-1">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.general variant="btn btn-primary">
              <font-awesome-icon class="when-opened" icon="arrow-up" />
              <font-awesome-icon class="when-closed" icon="arrow-down" />
              General Impression
            </b-button>
          </b-card-header>
          
          <b-collapse id="general" visible role="tabpanel">
            <b-card-body>
              <baseEditable
                :content.sync="review && review.generalImpression"
                :inEditMode.sync="inEditMode"
                @update="review.generalImpression = $event"
              />
            </b-card-body>

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
          </b-collapse>
        </b-card>
      </div>

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

<style>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>

