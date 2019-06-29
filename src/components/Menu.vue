<template>
  <!-- <div class="mt-4"> -->
    <ListControll
      :items="menuItems"
      @additem="handleAddMenuItem"
      @removeitem="handleRemoveMenuItem"
      :classes="'col-md-4'"
    >
      <template v-slot:listitem={item}>
        <SingleMenuItem/>
      </template>
    </ListControll>
    <!-- <menuItem/> -->
  <!-- </div> -->
</template>

<script>
import SingleMenuItem from '@/components/parts/SingleMenuItem'
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
    ListControll, SingleMenuItem
  }
}
</script>
