<template>
  <b-row>
    <b-col cols="12" md="1">
      <b-img class="avatar my-1 mx-1" src="https://picsum.photos/150/150/?image=20"></b-img>
    </b-col>
    <b-col cols="12" md="9">
      <b-card-text
        class="my-1 mx-1 item-text"
      >
        {{item && item.body}}
      </b-card-text>
      <b-card-text
        class="my-1 mx-1 item-text"
      >{{item && item.createdBy && item.createdBy.name}}, {{item && item.createdAt | formatDate('d MMM, YYYY')}}</b-card-text>
    </b-col>
    <b-col cols="12" md="2">
      <b-button
        @click="removeItem"
        variant="outline-secondary"
        size="sm">
        <font-awesome-icon icon="trash" />
      </b-button>
      <b-button
        @click="editItem"
        variant="outline-secondary"
        size="sm">
        <font-awesome-icon icon="edit" />
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import dateToString from '@/utils/mixins/dateToString'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeItem () {
      this.$emit('removeItem', this.item._id)
    },

    editItem () {
      this.$emit('editItem', this.item._id)
    }
  },

  mixins: [ dateToString ]
}
</script>
