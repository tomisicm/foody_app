<template>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button block href="#" v-b-toggle="id" variant="btn btn-primary">
        <font-awesome-icon class="when-opened" icon="arrow-up" />
        <font-awesome-icon class="when-closed" icon="arrow-down" />
        General Impression
      </b-button>
    </b-card-header>

    <b-collapse :id="id" visible role="tabpanel">
      <b-card-body>
        <baseEditable
          :content.sync="review.generalImpression"
          :inEditMode.sync="inEditMode"
          @update="review.generalImpression = $event"
        />
      </b-card-body>

      <b-row class="my-1">
        <b-col sm="3">
          <label class="my-1">{{label}}: </label>
        </b-col>

        dicks
        <!-- <b-col sm="2">
          <star-rating
            :increment=0.1
            :star-size=20
            v-model="review.generalRating"
          />
        </b-col> -->
      </b-row>
    </b-collapse>
  </b-card>
</template>

<script>
import baseEditable from '@/components/baseEditable'

export default {
  props: {
    label: String,
    id: {
      type: String,
      required: true
    },
    inEditMode: Boolean
  },

  data () {
    return {
      review: {
        generalImpression: 'dasa'
      }
    }
  },

  created () {
    console.log(this.$props)
  },

  components: {
    baseEditable
  }
}
</script>

<style>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
