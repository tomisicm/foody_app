<template>
  <b-card class="px-1">
    <b-row class="mt-1">

      <b-col class="px-0" md="7" :style="{ textAlign: 'left' }">
        <b-alert v-if="!inEdit" show variant="light">{{localitem.name}}</b-alert>
        <b-form-input class="alert" v-else placeholder="Name" v-model="localitem.name" />
      </b-col>

      <b-col v-if="localitem.tag" class="px-0" md="5">
        <b-alert v-if="!inEdit" show variant="warning">{{localitem.tag}}</b-alert>
        <b-dropdown
          v-else
          v-model="localitem.tag"
          class="w-100 h-75"
          right :text="localitem.tag"
          variant="primary"
        >
          <template slot="button-content">{{localitem.tag}}</template>
          <b-dropdown-item-button
            @click="updateTag($event)"
            v-for="(tag, index) in suggestedTags"
            :key="index"
            >{{tag}}</b-dropdown-item-button>
        </b-dropdown>
      </b-col>
    </b-row>

    <b-row>
      <b-img fluid :src="localitem.image"/>
    </b-row>

    <b-row class="mt-1 text-size-10 text-muted">
      <baseEditable
        :content.sync="localitem.description"
        :inEditMode.sync="inEdit"
        @update="localitem.description = $event"
      />
    </b-row>

    <b-row class="text-size-10 mt-2">
      <b-col cols="auto mr-auto" md="6" :style="{ textAlign: 'left' }">
        <span v-if="!inEdit">{{localitem.portion}}</span>
        <b-form-input class="text-size-10" v-else placeholder="Portion" v-model="localitem.portion" />
      </b-col>
      <b-col class="auto" md="6" :style="{ textAlign: 'right' }">
        <span v-if="!inEdit">{{localitem.price}}</span>
        <b-form-input class="text-size-10" v-else placeholder="Price" v-model="localitem.price" />
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
          @click="handleCancel"
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
      suggestedTags: ['Popular', 'Spicy', 'Recommended'],
      localitem: Object.assign({}, this.item)
      /* image: 'https://www.donesi.com/images/product/20/166820_m.jpg',
      name: 'Food Name',
      portion: 'portion (g)',
      price: 'price',
      tag: '',
      */
    }
  },

  methods: {
    toggleEdit () {
      this.inEdit = !this.inEdit
    },

    handleCancel () {
      this.localitem = Object.assign({}, this.item)
      this.toggleEdit()
    },

    handleDelete () {

    },

    handleSave () {
      this.toggleEdit()
    },

    updateTag (event) {
      this.tag = event.target.innerText
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
