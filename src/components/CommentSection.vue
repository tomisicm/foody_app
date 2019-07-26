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
      <CommentCard
        :item="item"
        :removeItem="getItemToBeRemoved"
      />
    </template>

    <template v-slot:emptylist>
      <div class="text-size-11">
        Currently, there aren't any comments for this foody place.
        Signin, if you would like to add one.
      </div>
    </template>
  </List>

  <div cols="12" v-if="!comments.docs">
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
import CommentCard from '@/components/CommentCard'
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
    List, CommentCard, NewComment, AppModal
  }
}
</script>
