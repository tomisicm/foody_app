<template>
  <div class="mt-4">
    <ListControll
      :items="menuItems"
      @additem="handleAddMenuItem"
      @removeitem="handleRemoveMenuItem"
      :classes="'col-md-4'"
    >
      <!-- <template v-slot:inputfield>
        <div class="col-md-4">
          <SingleMenuItem
            :item="newMenuItem"
          />
        </div>
      </template> -->

      <template v-slot:listitem={item}>
        <SingleMenuItem
        :item="item"
      />
      </template>
    </ListControll>

  </div>
</template>

<script>
import SingleMenuItem from '@/components/parts/SingleMenuItem'
import ListControll from '@/components/ListControll'

export default {
  data () {
    return {
      newMenuItem: {

      },
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
