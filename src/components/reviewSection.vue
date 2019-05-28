<template>
  <div>
    <b-card no-body class="overflow-hidden">
      <b-row>
        <b-col cols="12" md="1">
          <b-img class="avatar my-1 mx-1" src="https://picsum.photos/150/150/?image=20" rounded="circle"></b-img>
        </b-col>
        <b-col cols="12" md="8">
          <b-card-text
            class="my-1 mx-1 review-text"
          >
            This is a wider card with supporting text as a natural lead-in to additional content.
            This content is a little bit longer.
          </b-card-text>
        </b-col>
        <b-col cols="12" md="3">
          actions
        </b-col>
      </b-row>
    </b-card>

    <div cols="12">
      <b-pagination
        v-model="page"
        :total-rows="total"
        :per-page="perPage"
        @change="updatePage($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  data () {
    return {
      page: 1,
      total: 5,
      perPage: 3
    }
  },

  created () {
    console.log(this.reviews)
  }
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
