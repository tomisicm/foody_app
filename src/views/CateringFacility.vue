<template>
  <b-container>
    <div>
      <h1>{{cateringFacility && cateringFacility.name}}</h1>
    </div>

    <baseCarousel class="my-4" />

    <div>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia optio facilis voluptas accusantium maxime quam, repellendus, in odit facere nesciunt quo laboriosam nisi magnam officia voluptatibus eum iusto? Dolorem, magni.</p>
        <p>Located on {{cateringFacility && cateringFacility.address.street + cateringFacility.address.streetNo}}, {{cateringFacility && cateringFacility.address.city}}.
          Famous for its {{cateringFacility && cateringFacility.cuisine.name }} cuisine and {{cateringFacility && cateringFacility.michelinStars }} Michelin Stars.
        </p>
      </div>

      <b-container>
        <b-row class="mx-2">
          <!-- TODO: HIDE if user not logged in -->
          <span class="pt-1">Add review:</span>
          <b-button :to="{ name: 'addreview', query: { item: this.$route.params.id } }" pill variant="primary" class="mx-2"> + </b-button>
        </b-row>
      </b-container>

      <b-card no-body class="my-4 w-100">
        <b-tabs card fill class="nav-item">
          <!-- TODO: ReviewSection component -->
          <b-tab title="Reviews" active>

            <List
              :items="reviews.docs"
            >
              <template v-slot:listitem="{item}">
                <SingleReview :item="item"/>
              </template>
            </List>

            <!-- TODO: no reviews case -->
            <div cols="12">
              <b-pagination
                v-model="reviews.page"
                :total-rows="reviews.total"
                :per-page="reviews.limit"
                @change="updateReviewsPage($event)"
              />
            </div>

          </b-tab>

          <b-tab title="Comments">

            <CommentSection />

          </b-tab>
        </b-tabs>
      </b-card>

    </div>
  </b-container>
</template>

<script>
import cateringService from '@/utils/services/catering-service'
import reviewService from '@/utils/services/review-service'

import baseCarousel from '@/components/base/baseCarousel'
import List from '@/components/base/List'
import SingleReview from '@/components/SingleReview'

import CommentSection from '@/components/CommentSection'

export default {
  data () {
    return {
      cateringFacility: null,
      reviews: {
        docs: [],
        page: 1,
        perPage: 10
      }
    }
  },

  methods: {
    async getCateringData () {
      const { data } = await cateringService.getCatering(this.$route.params.id)
      this.cateringFacility = data
    },

    async getReviews () {
      const { data } = await reviewService.getReviewsByItemId(this.$route.params.id, this.getReviewParams())
      this.reviews = data
    },

    getReviewParams () {
      return {
        page: this.reviews.page,
        perPage: this.reviews.limit
      }
    },

    updateReviewsPage (event) {
      this.reviews.page = event
      this.getReviews()
    }
  },

  created () {
    this.getCateringData()
    this.getReviews()
  },

  components: {
    baseCarousel, List, SingleReview, CommentSection
  },

  name: 'Catering'
}
</script>
