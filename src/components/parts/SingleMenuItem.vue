<template>
  <b-card class="px-1">
    <b-row class="mt-1">

      <b-col class="px-0" md="7" :style="{ textAlign: 'left' }">
        <b-alert
          v-if="!inEditMode"
          show
          variant="light"
        >{{localitem.name}}</b-alert>

        <b-form-input
          v-else v-validate="'required'"
          v-model="localitem.name"
          class="alert"
          name="foodname"
          placeholder="Name"
        />
      </b-col>

      <b-col class="px-0" md="5">
        <b-alert
          v-if="!inEditMode"
          show
          variant="warning"
        >{{localitem.tag}}</b-alert>
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

      <small class="form-text text-danger mb-2">{{ errors.first('foodname') }}</small>
    </b-row>

    <b-row>
      <b-img fluid :src="localitem.image"/>
    </b-row>

    <b-row class="mt-1 text-size-10 text-muted">
      <baseEditable
        :content.sync="localitem.description"
        :inEditMode.sync="inEditMode"
        @update="updateDescription($event)"
        name="description"
        class="w-100 px-3 py-3"
      />

      <small class="form-text text-danger mb-2">{{ errors.first('description') }}</small>
    </b-row>

    <b-row class="text-size-10 mt-2">
      <b-col cols="auto mr-auto" md="6" :style="{ textAlign: 'left' }">
        <span v-if="!inEditMode">{{localitem.portion}}</span>
        <b-form-input
          v-else
          v-model="localitem.portion"
          v-validate="'required|numeric'"
          class="text-size-10"
          name="portion"
          placeholder="Portion"
        />
      </b-col>
      <b-col class="auto" md="6" :style="{ textAlign: 'right' }">
        <span v-if="!inEditMode">{{localitem.price}}</span>
        <b-form-input
          v-else
          v-model="localitem.price"
          v-validate="'required|numeric'"
          class="text-size-10"
          name="price"
          placeholder="Price"
        />
      </b-col>

      <small class="form-text text-danger mb-2">{{ errors.first('portion') }}</small>
      <small class="form-text text-danger mb-2">{{ errors.first('price') }}</small>
    </b-row>

    <hr />
    <b-row class="mt-2">
      <b-col
        v-if="!inEditMode"
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
          v-if="localitem._id"
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
          :disabled="errors.any()"
        >Save</b-btn>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import cateringService from '@/utils/services/catering-service'

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
      inEditMode: !this.item._id,
      suggestedTags: ['Popular', 'Spicy', 'Recommended'],
      localitem: Object.assign({}, this.item)
    }
  },

  methods: {
    toggleEdit () {
      this.inEditMode = !this.inEditMode
    },

    handleCancel () {
      // new item or existing one
      if (this.item._id) {
        this.localitem = Object.assign({}, this.item)
        this.toggleEdit()
      } else {
        this.$emit('cancelitem')
      }
    },

    async handleDelete () {
      await cateringService.deleteMenuItem(this.item._id)
      this.$emit('deleteitem', this.item)
    },

    async handleSave () {
      const anyErrors = this.validateBeforeSubmit()
      if (!anyErrors) {
        this.toggleEdit()
      } else {
        const { data } = await cateringService.saveMenuItem(this.localitem)
        this.item = data
        this.toggleEdit()
      }
    },

    updateDescription (event) {
      if (!event) {
        this.errors.add({
          field: 'description',
          msg: 'The description field is required.'
        })
      } else {
        this.errors.remove('description')
        this.localitem.description = event
      }
    },

    updateTag (event) {
      this.localitem.tag = event.target.innerText
    },

    async validateBeforeSubmit () {
      return this.$validator.validateAll()
    }
  },

  watch: {
    /*
    'localitem.description' (value) {
      this.errors.remove('description')
    }
    */
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
