<template>
  <b-col class="my-3">
      <b-row>
        <b-form-input class="col-md-9" placeholder="Enter url"></b-form-input>
        <b-col class="col-md-3">
          <b-btn variant="primary" pill>+</b-btn>
        </b-col>
      </b-row>
    
    <List
      :items="images"
      class="my-2"
    >
      <template v-slot:listitem="{item}">
        <b-row>
          <b-col :item="item">
            {{item}}
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
    images: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  components: {
    List
  }

}
</script>
