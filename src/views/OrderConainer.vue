<template>
  <div>
    <h3>New Order</h3>

    <b-row>
      <b-col md="6">
        <Address :label="'Order Address'">

        </Address>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6">
        <Cart />
      </b-col>

      <!-- REFACTOR MENU ITEM -->
      <b-col md="12">
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
import Address from '@/components/parts/Address'

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
    Cart, Address, ListControll, SingleMenuItem
  }
}
</script>
