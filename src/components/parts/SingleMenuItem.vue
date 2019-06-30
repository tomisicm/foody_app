<template>
  <b-card class="px-1">
    <b-row class="mt-1">
      <b-col class="px-0" md="8" :style="{ textAlign: 'left' }">
        <b-alert v-if="!inEdit" show variant="light">{{name}}</b-alert>
        <b-form-input class="alert" v-else placeholder="Name" v-model="name" />
      </b-col>
      <b-col class="px-0" md="4">
        <b-alert v-if="!inEdit" show variant="warning">Tag</b-alert>
        <b-dropdown class="w-100 h-75" v-else right text="None" variant="primary">
          <b-dropdown-item>Action</b-dropdown-item>
          <b-dropdown-item>Another</b-dropdown-item>
          <b-dropdown-item>Something</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <b-row>
      <b-img fluid :src="image"/>
    </b-row>

    <b-row class="mt-1 text-size-10 text-muted">
      <baseEditable
        :content.sync="bs"
        :inEditMode.sync="inEdit"
        @update="bs = $event"
      />
    </b-row>

    <b-row class="text-size-10 mt-2">
      <b-col cols="auto mr-auto" md="6" :style="{ textAlign: 'left' }">
        <span v-if="!inEdit">{{portion}}</span>
        <b-form-input class="text-size-10" v-else placeholder="Portion" v-model="portion" />
      </b-col>
      <b-col class="auto" md="6" :style="{ textAlign: 'right' }">
        <span v-if="!inEdit">{{price}}</span>
        <b-form-input class="text-size-10" v-else placeholder="Price" v-model="price" />
      </b-col>
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
      image: 'https://www.donesi.com/images/product/20/166820_m.jpg',
      bs: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt deleniti est, saepe, voluptas ipsam animi, consequatur ipsum dolorum iure asperiores labore facilis tenetur.',
      name: 'Food Name',
      portion: 'portion (g)',
      price: 'price'
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
  font-size: 10pt !important;
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
