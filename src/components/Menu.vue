<template>
  <!-- <div class="mt-4"> -->
    <ListControll
      :items="menuItems"
      @additem="handleAddMenuItem"
      @removeitem="handleRemoveMenuItem"
      :classes="'col-md-4'"
    >
      <template v-slot:listitem={item}>
        <menuItem/>
      </template>
    </ListControll>
    <!-- <menuItem/> -->
  <!-- </div> -->
</template>

<script>
import MenuItem from '@/components/parts/MenuItem'
import ListControll from '@/components/ListControll'

export default {
  data () {
    return {
      menuItems: [
        { }, { }
      ]
    }
  },

  methods: {
    handleAddMenuItem () {

    },
    handleRemoveMenuItem () {

    }
  },

  components: {
    ListControll, MenuItem
  }
}
</script>
