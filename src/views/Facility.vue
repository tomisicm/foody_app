<template>
  <b-container>
    <div>
      <h1>Giben pbject</h1>
    </div>
    <baseCarousel class="my-4" />

    <div class="nav justify-content-center">

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
import baseCarousel from '@/components/baseCarousel'

export default {
  data () {
    return {
      data: [
      ]
    }
  },

  components: {
    baseCarousel
  }
}
</script>

<style>

</style>
