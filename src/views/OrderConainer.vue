<template>
  <div>
    Order
    <b-row>
      <b-col md="6">
        <Cart />
      </b-col>

      <!-- REFACTOR MENU ITEM -->
      <b-col md="9">
        <ListControll
          :items="menuItems"
          :listitemclass="'col-md-4'"
        >
          <template v-slot:listitem="{item}">
            <SingleMenuItem
              :item="item"
              :orderState="true"
            />
          </template>
        </ListControll>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import cateringService from '@/utils/services/catering-service'

import Cart from '@/components/Cart'
import SingleMenuItem from '@/components/parts/SingleMenuItem'
import ListControll from '@/components/ListControll'

export default {

  data () {
    return {
      menuItems: []
    }
  },

  methods: {
    async getMenuItems () {
      const { data } = await cateringService.getMentItemsForCatering(this.$route.params.id)
      this.menuItems = data.docs
    }
  },

  computed: {

  },

  created () {
    this.getMenuItems()
  },

  components: {
    Cart, ListControll, SingleMenuItem
  }
}
</script>
