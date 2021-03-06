<template>
  <b-card class="mb-1 mr-1">
    <b-row class="text-size-11">
      <b-col md="1" class="d-none d-md-block">
        <b-img width="50" height="50" class="avatar my-1 mx-1" src="https://picsum.photos/150/150/?image=20"></b-img>
      </b-col>

      <b-col md="9" sm="8" class="comment">
        <b-card-text
          v-if="!inEditMode"
          class="my-1 mx-1 item-text"
          rows="3"
          max-rows="4"
        >

        <b-container>
          <b-row>
            {{item && item.body}}
          </b-row>

          <b-row class="my-1 text-size-10 text-muted">
            {{item && item.createdBy && item.createdBy.name}}, {{item && item.createdAt | formatDate('d MMM, YYYY')}}
          </b-row>
        </b-container>
        </b-card-text>

        <b-form-textarea
          v-else
          v-model="item.body"
          rows="2"
          max-rows="4"
          class="mx-2"
        />

      </b-col>
      <b-col md="2" sm="4" v-if="isSignedIn" align-h="center">

        <template v-if="!inEditMode">
          <b-button
            v-if="isCommentDeletable"
            @click="handleDelete"
            variant="outline-primary"
            size="sm">
            <font-awesome-icon icon="trash" />
          </b-button>

          <b-button
            v-if="isCommentEditable"
            @click="editItem"
            variant="outline-primary"
            size="sm">
            <font-awesome-icon icon="edit" />
          </b-button>

          <b-button
            v-if="isCommentFurtherReplyable"
            @click="replayTo"
            variant="outline-primary"
            size="sm">
            <font-awesome-icon icon="reply" />
          </b-button>
        </template>

        <template v-else>
          <b-button
            @click="saveItem"
            variant="outline-primary"
            size="sm">
            <font-awesome-icon icon="save" />
          </b-button>
        </template>

      </b-col>
    </b-row>

    <div v-for="item in item.thread" :key="item._id">
      <CommentCard class="ml-3"
        :item="item"
        :removeItem="removeItem"
      />
    </div>

    <b-row>
      <b-col class="ml-3 mr-1">
        <NewComment v-if="reply" :reply="reply"/>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import NewComment from '@/components/NewComment'

import dateToString from '@/utils/mixins/dateToString'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    removeItem: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      inEditMode: false,
      reply: null
    }
  },

  methods: {
    ...mapActions('commentStore', ['deleteComment', 'editComment']),

    handleDelete () {
      this.removeItem(this.item)
    },

    editItem () {
      this.inEditMode = !this.inEditMode
    },

    replayTo () {
      if (this.reply) {
        this.reply = null
      } else {
        this.reply = this.item
      }
    },

    async saveItem () {
      this.inEditMode = !this.inEditMode
      await this.editComment(this.item)
    }
  },

  computed: {
    ...mapGetters('authStore', ['isSignedIn', 'isAdmin', 'userId']),
    isCommentEditable () {
      return this.isSignedIn && this.item.createdBy && (this.userId === this.item.createdBy._id)
    },
    isCommentDeletable () {
      return this.isAdmin || (this.item.createdBy && this.userId === this.item.createdBy._id)
    },
    // only level 1 thread.
    isCommentFurtherReplyable () {
      return !this.item.replyTo
    }
  },

  components: {
    NewComment
  },
  mixins: [ dateToString ],
  name: 'CommentCard'
}
</script>

<style scoped>
.card-body {
  padding: 0%;
}
.comment {
  text-align: left;
}
</style>
