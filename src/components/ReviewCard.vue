<template>
  <b-card class="mb-1 mr-1">
    <b-row class="text-size-11">
      <b-col md="1" class="d-none d-md-block">
        <b-img width="50" height="50" class="avatar my-1 mx-1" :src="image" rounded="circle"></b-img>
      </b-col>

      <b-col cols="6" sm="7" md="8">
        <b-card-text
          class="my-1 mx-1 item-text"
        >
          <b-container @click="handleClick">
            <b-row class="ml-1">{{item && item.title}}</b-row>
            <b-row class="ml-1"><span><i>Average rating: {{item.avgRating}}</i></span></b-row>

            <b-row
              class="my-1 mx-1 text-size-10 text-muted"
            >
              By {{item && item.createdBy && item.createdBy.name}}, {{item && item.updatedAt | formatDate('d MMM, YYYY')}}
            </b-row>
          </b-container>
        </b-card-text>
      </b-col>

      <b-col cols="6" sm="5" md="3">
        <b-button-group>
          <b-button
            variant="outline-success"
            class="ml-2"
            size="sm"
            >{{item.likedBy.likes}}</b-button>
          <b-button
            :pressed="item.likedBy.liked"
            variant="success"
            size="sm"><font-awesome-icon icon="thumbs-up" />
          </b-button>
          <b-button
            v-if="item.approved"
            size="sm"
            variant="outline-success"
            ><font-awesome-icon icon="check" />
        </b-button>
          <b-button
            v-if="isAdmin"
            size="sm"
            variant="outline-success"
            ><font-awesome-icon :icon="item.locked ? 'lock' : 'lock-open'" />
        </b-button>
        </b-button-group>
      </b-col>

    </b-row>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

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
