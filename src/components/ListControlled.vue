<template>
  <div>
    <b-form-input placeholder="Enter url"></b-form-input>
    <b-btn variant="primary" pill>+</b-btn>
    <b-row v-for="(item, index) in items"  :key="index">

      <b-row>
        <b-col>{{item}}</b-col>
        <b-col><b-btn variant="outline-danger" @click="removeItem(item)"> - </b-btn></b-col>
      </b-row>

    </b-row>

  </div>
</template>

<script>

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
    /*   const i = this.items.indexOf(event)
      this.items.splice(i, 1) */
      console.log(item)
    }
  },

  watch: {

  },

  name: 'ListControlled'
}
