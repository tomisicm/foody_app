<template>
  <div class="mt-4">
    <ListControll
      :items="menuItems"
      :listitemclass="'col-md-4'"
    >
      <!-- disable this button as long as there is one new item -->
      <template v-slot:btnfield>
        <b-row class="ml-3 mb-3" md="2">
          <b-btn variant="primary" @click="handleAddMenuItem">New Menu Item</b-btn>
        </b-row>
      </template>

      <template v-slot:listitem={item}>
        <SingleMenuItem
          :item="item"
          :orderState="orderState"
          @cancelitem="handleItemCancel"
          @deleteitem="handleDeleteMenuItem($event)"
        />
      </template>
    </ListControll>

  </div>
</template>

<script>
import cateringService from '@/utils/services/catering-service'

import SingleMenuItem from '@/components/parts/SingleMenuItem'
import ListControll from '@/components/ListControll'

export default {
  props: {
    orderState: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      newMenuItem: Object.assign({}, this.resetNewItem()),
      menuItems: []
    }
  },

  methods: {
    handleAddMenuItem () {
      this.menuItems.unshift(this.newMenuItem)
    },
    async handleDeleteMenuItem (item) {
      // await cateringService.deleteMenuItem(item)
      const i = this.menuItems.indexOf(item)
      this.menuItems.splice(i, 1)
    },

    handleItemCancel () {
      this.menuItems.shift()
    },

    resetNewItem () {
      return {
        name: '',
        catering: this.$route.params.id,
        image: 'https://www.donesi.com/images/product/20/166820_m.jpg',
        description: '',
        portion: '',
        price: '',
        tag: ''
      }
    },

    async getMenuItems () {
      const { data } = await cateringService.getMentItemsForCatering(this.$route.params.id)
      this.menuItems = data.docs
    }
  },

  created () {
    this.getMenuItems()
  },

  components: {
    ListControll, SingleMenuItem
  }
}
</script>
