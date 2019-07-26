<template>
  <b-container>
    <div>
      <h1>{{cateringFacility && cateringFacility.name}}</h1>
    </div>

    <baseCarousel :images="cateringFacility && cateringFacility.images" class="my-4" />

    <div>
      <b-row>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia optio facilis voluptas accusantium maxime quam, repellendus, in odit facere nesciunt quo laboriosam nisi magnam officia voluptatibus eum iusto? Dolorem, magni.</p>
        <p>Located on {{cateringFacility && cateringFacility.address.street + cateringFacility.address.streetNo}}, {{cateringFacility && cateringFacility.address.city}}.
          Famous for its {{cateringFacility && cateringFacility.cuisine.name }} cuisine and {{cateringFacility && cateringFacility.michelinStars }} Michelin Stars.</p>
        <p>Contact Information: {{cateringFacility && cateringFacility.contactInformation.toString()}}</p>
        <p v-if="cateringFacility && cateringFacility.website">Website:
          <b-link :href="cateringFacility.website.toString()" target="_blank">
            {{cateringFacility && cateringFacility.website}}
          </b-link>
        </p>
      </b-row>

      <b-container class="mt-3">
        <b-row v-if="isSignedIn">
          <b-col cols="12" sm="10" md="8">
            <b-button
              :to="{ name: 'ordercatering', }" variant="success"
            >Order food
            </b-button>
            <b-button
              :to="{ name: 'addreview', query: { item: this.$route.params.id } }"
              variant="primary" class="ml-2"
            >Add review
            </b-button>
            <b-button
              v-if="cateringFacility && cateringFacility.pageMaintainedBy.includes(this.user._id)"
              :to="{ name: 'editcatering', params: { id: this.$route.params.id } }"
              variant="primary" class="ml-2"
            >Edit
            </b-button>
          </b-col>
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
import { mapGetters } from 'vuex'

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

  computed: {
    ...mapGetters('authStore', ['isSignedIn', 'user'])
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
