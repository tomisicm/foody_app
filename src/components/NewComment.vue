<template>
<div>
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
import commentService from '@/utils/services/comment-service'

export default {
  data () {
    return {
      body: ''
    }
  },

  methods: {
    getCommentData () {
      return {
        itemType: 'comment',
        body: this.body,
        item: this.$route.params.id
      }
    },

    async handleCreateComment () {
      const response = await commentService.createComment(this.getCommentData())
      this.body = ''
    }
  }
}
</script>
