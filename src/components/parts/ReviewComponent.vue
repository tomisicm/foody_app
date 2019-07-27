<template>
  <baseCollapse
    :headline="headline"
    :inEditMode="inEditMode"
    :id="locator"
  >
    <template v-slot:mainbody>
      <baseEditable
        :content.sync="reviewContent"
        :inEditMode.sync="inEditMode"
        @update="updateReviewContent($event)"
      />
    </template>

    <template v-slot:additionalbody>
      <b-col sm="3">
        <label class="my-1">Rating:</label>
      </b-col>
      <b-col sm="2">
        <star-rating
          :read-only="!inEditMode"
          :increment=0.1
          :star-size=20
          v-model="reviewRating"
        />
      </b-col>
    </template>
  </baseCollapse>
</template>

<script>
import StarRating from 'vue-star-rating'
import baseEditable from '@/components/base/baseEditable'
import baseCollapse from '@/components/base/baseCollapse'

export default {
  props: {
    inEditMode: {
      type: Boolean,
      default: false
    },

    headline: {
      type: String,
      required: true
    },

    locator: {
      type: String,
      required: true
    },

    reviewContent: {
      type: String,
      default: ''
    },

    reviewRating: {
      type: Number,
      required: true
    }
  },

  data () {
    return {

    }
  },

  methods: {
    updateReviewContent (event) {
      this.$emit('update:reviewcontent', event)
    },

    updateReviewRating (event) {
      this.$emit('update:reviewcontent', event)
    }
  },

  components: { baseEditable, StarRating, baseCollapse },
  name: 'Single_Review_Section'
}
</script>
