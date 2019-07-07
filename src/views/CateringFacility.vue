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

          <b-tab title="Reviews" active>

            <ReviewSection />

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

import baseCarousel from '@/components/base/baseCarousel'

import CommentSection from '@/components/CommentSection'
import ReviewSection from '@/components/ReviewSection'

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
    }

  },

  created () {
    this.getCateringData()
  },

  components: {
    baseCarousel, CommentSection, ReviewSection
  },

  name: 'Catering'
}
</script>
