<template>
  <b-col class="my-3">
      <b-row>
        <slot name="inputfield" />
        <b-col class="col-md-2">
          <b-btn variant="primary" @click="addItem" :disabled="error" pill>+</b-btn>
        </b-col>
        <slot name="inputerrors" />
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
    },
    error: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      newItem: ''
    }
  },

  methods: {
    addItem () {
      this.$emit('additem')
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
