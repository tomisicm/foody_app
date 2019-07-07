<template>
  <b-card class="mb-1 mr-1">
    <b-row class="text-size-11">
      <b-col md="1" class="d-none d-md-block">
        <b-img width="50" height="50" class="avatar my-1 mx-1" :src="image" rounded="circle"></b-img>
      </b-col>

      <b-col md="8" sm="8">
        <b-card-text
          class="my-1 mx-1 item-text"
        >
          {{item && item.title}}
        </b-card-text>

        <b-card-text
          class="my-1 mx-1 item-text"
        >By {{item && item.createdBy && item.createdBy.name}}, {{item && item.createdAt | formatDate('d MMM, YYYY')}}</b-card-text>
      </b-col>

      <b-col cols="12" md="3" v-if="isSignedIn">

        <template v-if="isAdmin">
          <b-button
            v-if="!item.locked"
            @click="handleLock"
            variant="outline-secondary"
            size="sm">
            <font-awesome-icon icon="lock" />
          </b-button>

          <b-button
            v-if="item.locked"
            @click="handleLock"
            variant="outline-secondary"
            size="sm">
            <font-awesome-icon icon="lock-open" />
          </b-button>
        </template>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

import reviewService from '@/utils/services/review-service'

import dateToString from '@/utils/mixins/dateToString'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleClick () {
      this.$router.push({ name: 'review', params: { id: this.item._id } })
    },

    async handleLock () {
      await reviewService.changeReviewStatus(this.item._id, { locked: this.item.locked })
      this.item.locked = !this.item.locked
    }
  },

  computed: {
    ...mapGetters('authStore', ['isSignedIn', 'isAdmin']),
    image () {
      return 'http://localhost:3000/' + this.item.createdBy.profile.avatar
    }
  },

  mixins: [ dateToString ]
}
</script>
