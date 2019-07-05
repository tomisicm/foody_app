<template>
<div>
  <AppModal
    @confirmAction="removeItem"
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

    }
  },

  methods: {
    ...mapActions('commentStore', ['getCommentsByItemId', 'changePage']),

    updateCommentsPage (event) {
      this.changePage(event)
      this.getCommentsByItemId({ itemId: this.$route.params.id, params: this.getCommentParams() })
    },

    getCommentParams () {
      return this.params
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
