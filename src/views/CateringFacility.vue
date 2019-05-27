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
            <b-card-text>Reviews</b-card-text>
          </b-tab>
          <b-tab title="Comments">
            <b-card-text>Comments</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>

    </div>
  </b-container>
</template>

<script>
import cateringService from '@/utils/services/catering-service'

import baseCarousel from '@/components/baseCarousel'

export default {
  data () {
    return {
      cateringFacility: null
    }
  },

  methods: {
    async fetchData () {
      const { data } = await cateringService.getCatering(this.$route.params.id)
      this.cateringFacility = data
    }
  },

  created () {
    this.fetchData()
  },

  components: {
    baseCarousel
  },

  name: 'CateringFacility'
}
</script>

<style>

</style>
