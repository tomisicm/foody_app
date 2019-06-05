<template>
  <div v-if="isSignedIn">
  <b-card no-body class="my-2">
    <b-form-textarea
      v-model="body"
      placeholder="New comment..."
      rows="2"
      max-rows="5"
      :style="{ overflowY: 'none' }"
    />
  </b-card>
  <b-container>
    <b-row>
      <b-btn
        v-if="body"
        class="mr-auto my-2"
        @click="handleCreateComment">
        Send</b-btn>
    </b-row>
  </b-container>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import commentService from '@/utils/services/comment-service'

export default {
  props: {
    reply: Object,
    default: null
  },

  data () {
    return {
      body: ''
    }
  },

  methods: {
    getCommentData () {
      return {
        itemType: 'cateringestablishment',
        item: this.$route.params.id,
        body: this.body,
        replyTo: (this.reply || {})._id || null
      }
    },

    async handleCreateComment () {
      await commentService.createComment(this.getCommentData())
      this.body = ''
    }
  },

  computed: {
    ...mapGetters('authStore', ['isSignedIn'])
  }
}
</script>
