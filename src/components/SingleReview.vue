<template>
  <b-row>
    <b-col cols="12" md="1">
      <b-img class="avatar my-1 mx-1" src="https://picsum.photos/150/150/?image=20" rounded="circle"></b-img>
    </b-col>
    <b-col @click="handleClick" cols="12" md="8">
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
    },

    handleLock () {
      console.log(this.item.locked)
      // update
      this.item.locked = !this.item.locked
    }
  },

  computed: {
    ...mapGetters('authStore', ['isSignedIn', 'isAdmin'])
  },

  mixins: [ dateToString ]
}
</script>
