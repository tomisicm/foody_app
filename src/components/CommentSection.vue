<template>
<div>
  <AppModal
    @confirmAction="removeItem"
    @cancelAction="$modal.hide('confirm-action', {})"
  >
    <template v-slot:body>
      <div>Are you sure you want to delete this comment?</div>
    </template>
  </AppModal>

  <NewComment>
    <template v-slot:input-field>
      <b-form-textarea
        v-model="body"
        placeholder="New comment..."
        rows="1"
        max-rows="2"
        :style="{ overflowY: 'none' }"
      />
    </template>
  </NewComment>

  <List
    class="my-1"
    :items="comments.docs"
  >

    <template v-slot:listitem="{ item }">
      <SingleComment
        :item="item"
        :removeItem="getItemToBeRemoved"
      />
    </template>
  </List>

  <div cols="12">
    <b-pagination
      v-model="comments.page"
      :total-rows="comments.total"
      :per-page="comments.limit"
      @change="updateCommentsPage($event)"
    />
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppModal from '@/components/modals/AppModal'

import List from '@/components/base/List'
import SingleComment from '@/components/SingleComment'
import NewComment from '@/components/NewComment'

export default {
  data () {
    return {
      itemToBeRemoved: null
    }
  },

  methods: {
    ...mapActions('commentStore', ['getCommentsByItemId', 'changePage', 'deleteComment']),

    updateCommentsPage (event) {
      this.changePage(event)
      this.getCommentsByItemId({ itemId: this.$route.params.id, params: this.getCommentParams() })
    },

    getCommentParams () {
      return this.params
    },

    getItemToBeRemoved (item) {
      this.$modal.show('confirm-action', {})
      this.itemToBeRemoved = item._id
    },

    async removeItem () {
      await this.deleteComment(this.itemToBeRemoved)
      this.$modal.hide('confirm-action', {})
    }
  },

  created () {
    this.getCommentsByItemId({ itemId: this.$route.params.id, params: this.getCommentParams() })
  },

  computed: {
    ...mapGetters('commentStore', ['comments', 'params'])
  },

  components: {
    List, SingleComment, NewComment, AppModal
  }
}
</script>
