<template>
  <b-container class="mt-2">
      <b-form>
        <h4>Please complete the following questions</h4>
        <b-form-row class="mx-1 my-3">
          <label>Title: </label>
          <b-input
            v-model="title"
          />
        </b-form-row>

        <div role="tablist" class="mx-1">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.general variant="btn btn-light">General Impression</b-button>
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
              <b-button block href="#" v-b-toggle.food variant="btn btn-light">Menu and Food</b-button>
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
              <b-button block href="#" v-b-toggle.staff variant="btn btn-light">Staff and Atmosphere</b-button>
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
        </div>
    </b-form>
  </b-container>
</template>
<script>
import StarRating from 'vue-star-rating'

export default {
  data () {
    return {
      title: '',
      generalImpression: '',
      foodSection: '',
      staffSection: '',
      generalRating: null,
      foodRating: null,
      staffRating: null,
      item: this.$route.query.item
    }
  },

  components: {
    StarRating
  },

  name: 'New Review'
}
</script>
