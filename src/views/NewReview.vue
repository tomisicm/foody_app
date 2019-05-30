<template>
  <b-container>
      <b-form>
        <h1>This is new review page</h1>

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
                  <b-form-input
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
                  <b-form-input
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
                  <b-form-input
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
export default {
  data () {
    return {
      title: '',
      generalImpression: '',
      foodSection: '',
      staffSection: ''
    }
  },

  mounted () {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      console.log('collapseId:', collapseId)
      console.log('isJustShown:', isJustShown)
    })
  }
}
</script>
