<template>
  <b-container>
    <div>
      <h1>{{cateringFacility && cateringFacility.name}}</h1>
    </div>
    <baseCarousel class="my-4" />

    <div class="nav justify-content-center">
      <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia optio facilis voluptas accusantium maxime quam, repellendus, in odit facere nesciunt quo laboriosam nisi magnam officia voluptatibus eum iusto? Dolorem, magni.</p>
      <p>Located on {{cateringFacility && cateringFacility.address.street + cateringFacility.address.streetNo}}, {{cateringFacility && cateringFacility.address.city}}.
        Famous for its {{cateringFacility && cateringFacility.cuisine.name }} cuisine and {{cateringFacility && cateringFacility.michelinStars }} Michelin Stars.
      </p>
      </div>

      <b-card no-body class="my-4 w-100">
        <b-tabs card fill class="nav-item">
          <b-tab title="Reviews" active>
            <reviewSection
              :items="reviews"
              @update:page="updateReviewsPage($event)"
            >

              <template v-slot:dick="{itemInfo}">
                <button @click="www($event)">{{itemInfo._id}}</button>
              </template>

            </reviewSection>
          </b-tab>
          <b-tab title="Comments">
            <reviewSection :items="comments" @update:page="updateCommentsPage($event)"/>
          </b-tab>
        </b-tabs>
      </b-card>

    </div>
  </b-container>
</template>

<script>
import cateringService from '@/utils/services/catering-service'
import reviewService from '@/utils/services/review-service'
import commentService from '@/utils/services/comment-service'

import baseCarousel from '@/components/baseCarousel'
import reviewSection from '@/components/reviewSection'

export default {
  data () {
    return {
      cateringFacility: null,
      reviews: {},
      comments: {}
    }
  },

  methods: {
    www (event) {
      console.log(event.target)
    },

    async getCateringData () {
      const { data } = await cateringService.getCatering(this.$route.params.id)
      this.cateringFacility = data
    },

    async getReviews () {
      const { data } = await reviewService.getReviewsByItemId(this.$route.params.id, this.getReviewParams())
      this.reviews = data
    },

    async getComments () {
      const { data } = await commentService.getCommentsByItemId(this.$route.params.id, this.getCommentParams())
      this.comments = data
    },

    getReviewParams () {
      return {
        page: this.reviews.page,
        perPage: this.reviews.limit
      }
    },

    getCommentParams () {
      return {
        page: this.comments.page,
        perPage: this.comments.limit
      }
    },

    updateReviewsPage (event) {
      this.reviews.page = event
      this.getReviews()
    },

    updateCommentsPage (event) {
      this.comments.page = event
      this.getComments()
    }
  },

  created () {
    this.getCateringData()
    this.getReviews()
    this.getComments()
  },

  components: {
    baseCarousel, reviewSection
  },

  name: 'CateringFacility'
}
</script>

<style>

</style>
