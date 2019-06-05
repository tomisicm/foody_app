<template>
<div>
  <b-row>
    <b-col cols="12" md="1">
      <b-img class="avatar my-1 mx-1" src="https://picsum.photos/150/150/?image=20"></b-img>
    </b-col>
    <b-col cols="12" md="9">

      <b-card-text
        v-if="!inEditMode"
        class="my-1 mx-1 item-text"
        rows="3"
        max-rows="4"
      >
        {{item && item.body}}
      </b-card-text>

      <b-form-textarea
        v-else
        v-model="item.body"
        rows="2"
        max-rows="4"
      ></b-form-textarea>

      <b-card-text
        v-if="!inEditMode"
        class="my-1 mx-1 item-text"
      >{{item && item.createdBy && item.createdBy.name}}, {{item && item.createdAt | formatDate('d MMM, YYYY')}}</b-card-text>
    </b-col>
    <b-col cols="12" md="2" v-if="isSignedIn">

      <template v-if="!inEditMode">
        <b-button
          v-if="isCommentDeletable"
          @click="removeItem"
          variant="outline-secondary"
          size="sm">
          <font-awesome-icon icon="trash" />
        </b-button>

        <b-button
          v-if="isCommentEditable"
          @click="editItem"
          variant="outline-secondary"
          size="sm">
          <font-awesome-icon icon="edit" />
        </b-button>

        <b-button
          @click="replayTo"
          variant="outline-secondary"
          size="sm">
          <font-awesome-icon icon="reply" />
        </b-button>
      </template>

      <template v-else>
        <b-button
          @click="saveItem"
          variant="outline-secondary"
          size="sm">
          <font-awesome-icon icon="save" />
        </b-button>
      </template>

    </b-col>
  </b-row>
  <div v-if="reply">
    <b-row>
      <b-col class="ml-3 mr-1">
        <NewComment :reply="reply"/>
      </b-col>
    </b-row>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import NewComment from '@/components/NewComment'

import dateToString from '@/utils/mixins/dateToString'

export default {
  props: {
    item: {
      type: Object,
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
    removeItem () {
      this.$emit('removeItem', this.item._id)
    },

    editItem () {
      this.inEditMode = !this.inEditMode
    },

    replayTo () {
      this.reply = this.item
    },

    saveItem () {
      this.$emit('editItem', this.item)
      this.inEditMode = !this.inEditMode
    }

  },

  computed: {
    ...mapGetters('authStore', ['isSignedIn', 'isAdmin', 'userId']),
    isCommentEditable () {
      return this.isSignedIn && this.item.createdBy && (this.userId === this.item.createdBy._id)
    },
    isCommentDeletable () {
      return this.isAdmin || (this.item.createdBy && this.userId === this.item.createdBy._id)
    }
  },

  components: {
    NewComment
  },

  mixins: [ dateToString ]
}
</script>
