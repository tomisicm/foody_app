<template>
  <b-card class="px-1">
    <b-row class="mt-1">
      <b-col class="px-0" md="8" :style="{ textAlign: 'left' }">
        <b-alert v-if="!inEdit" show variant="light">{{name}}</b-alert>
        <b-form-input placeholder="Name" v-model="name" v-else />
      </b-col>
      <b-col class="px-0" md="4">
        <b-alert show variant="warning">Popular</b-alert>

      </b-col>
    </b-row>
    <b-row>
      <b-img fluid src="https://www.donesi.com/images/product/20/166820_m.jpg"/>
    </b-row>

    <b-row class="mt-1 text-size-10 text-muted">
      <baseEditable
        :content.sync="bs"
        :inEditMode.sync="inEdit"
        @update="bs = $event"
      />
    </b-row>

    <b-row class="text-size-10 mt-2">
      <b-col cols="auto mr-auto" :style="{ textAlign: 'left' }">portion in g</b-col>
      <b-col class="auto" :style="{ textAlign: 'right' }">price</b-col>
    </b-row>

    <hr />
    <b-row class="mt-2">
      <b-col
        v-if="!inEdit"
        cols="auto"
        class="mr-auto"
      >
        <b-btn
          @click="toggleEdit"
          variant="primary"
        >Edit</b-btn>
      </b-col>

      <b-col
        v-else
        cols="auto"
      >
        <b-btn
          variant="outline-danger"
          class="mr-1"
          @click="handleDelete"
        >Delete</b-btn>
        <b-btn
          class="mr-1"
          variant="outline-primary"
          @click="toggleEdit"
        >Cancel</b-btn>
        <b-btn
          variant="success"
          @click="handleSave"
        >Save</b-btn>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import baseEditable from '@/components/base/baseEditable'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      inEdit: false,
      localitem: this.item,
      bs: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt deleniti est, saepe, voluptas ipsam animi, consequatur ipsum dolorum iure asperiores labore facilis tenetur.',
      name: 'Food Name'
    }
  },

  methods: {
    toggleEdit () {
      this.inEdit = !this.inEdit
    },

    handleDelete () {

    },

    handleSave () {
      this.toggleEdit()
    }
  },

  components: {
    baseEditable
  }
}
</script>

<style>
/*
.card-body {
  padding: 0.5rem !important;
} */

.text-size-11 {
  font-size: 11pt;
}

.text-size-10 {
  font-size: 10pt;
}

.alert.light {
  padding: .5rem .25rem;
  margin-bottom: 0rem;
}

.alert.alert-warning {
  padding: .5rem .25rem;
  margin-bottom: 0rem;
}
</style>
