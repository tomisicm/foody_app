<template>
  <div>
    <b-form-input placeholder="Enter url"></b-form-input>
    <b-btn variant="primary" pill>+</b-btn>
    <List
      :items="items"
    >
      <template v-slot:listitem="{item}">
        <b-row>
          <b-col>{{item}}</b-col>
          <b-col><b-btn variant="outline-danger" @click="removeItem(item)"> - </b-btn></b-col>
        </b-row>
      </template>
    </List>
  </div>
</template>

<script>
import List from '@/components/List'

export default {
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  methods: {
    addItem (event) {
    },
    removeItem (event) {
      const i = this.items.indexOf(event)
      this.items.splice(i, 1)
    }
  },

  watch: {
    items () {
      console.log('change')
    }
  },

  components: {
    List
  }
}
