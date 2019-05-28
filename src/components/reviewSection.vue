<template>
  <div>
    <b-card v-for="review in reviews.docs"  v-bind:key="review._id" no-body class="overflow-hidden">
      <b-row>
        <b-col cols="12" md="1">
          <b-img class="avatar my-1 mx-1" src="https://picsum.photos/150/150/?image=20" rounded="circle"></b-img>
        </b-col>
        <b-col cols="12" md="8">
          <b-card-text
            class="my-1 mx-1 review-text"
          >
            {{review.title}}
          </b-card-text>
          <b-card-text
            class="my-1 mx-1 review-text"
          >By {{review.createdBy}}, {{review.createdAt | formatDate('d MMM, YYYY')}}</b-card-text>
        </b-col>
        <b-col cols="12" md="3">
          actions
        </b-col>
      </b-row>
    </b-card>

    <div cols="12">
      <b-pagination
        v-model="reviews.page"
        :total-rows="reviews.total"
        :per-page="reviews.limit"
        @change="updatePage($event)"
      />
    </div>
  </div>
</template>

<script>
import dateToString from '@/utils/mixins/dateToString'

export default {
  props: {
    reviews: {
      type: Object,
      default: function () {
        return {
          page: 1,
          total: 1,
          limit: 10
        }
      }
    }
  },

  methods: {
    updatePage (event) {
      this.$emit(`update:page`, event)
    }
  },

  mixins: [ dateToString ]
}
</script>

<style>
.avatar {
  width: 50px;
  height: 50px;
}
.review-text {
  text-align:left
}
</style>
