<template>
  <b-col class="my-3">
      <b-row>
        <b-form-input
          v-model="newItem"
          @keydown.enter="addItem"
          v-validate="'url'"
          name="imageurl"
          class="col-md-9"
          placeholder="Enter url"
        />
        <b-col class="col-md-2">
          <b-btn variant="primary" @click="addItem" :disabled="!!errors.first('imageurl')" pill>+</b-btn>
        </b-col>
        <small class="form-text text-danger">{{ errors.first('imageurl') }}</small>
      </b-row>

    <List
      :items="items"
      class="my-2"
    >
      <template v-slot:listitem="{item}">
        <b-row>
          <b-col class="col-md-9" :item="item">
            <b-link>{{item}}</b-link>
          </b-col>
          <div class="col-md-3">
            <b-btn variant="outline-danger" @click="removeItem(item)"> - </b-btn>
          </div>
        </b-row>
      </template>
    </List>
  </b-col>
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

  data () {
    return {
      newItem: ''
    }
  },

  methods: {
    addItem () {
      if (!this.newItem) return
      this.$emit('additem', this.newItem)
      this.newItem = ''
    },

    removeItem (item) {
      this.$emit('removeitem', item)
    }
  },

  components: {
    List
  }

}
</script>
