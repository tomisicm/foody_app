<template>
  <div>
    Order
    <b-row>
      <b-col md="10">
        <Menu
          :orderState="true"
        />
      </b-col>
      <!-- there will be bottom for narrow and this + narrow for wide (interchangable) -->
      <b-col md="3">
        <aside class="floating-menu">{{orders.map(order => order.menuItem.name + ': ' + order.quantity )}}</aside>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Menu from '@/components/Menu'

export default {

  data () {
    return {

    }
  },

  methods: {

  },

  computed: {
    ...mapState('cartStore', {
      orders: state => state.orders
    })

  },

  components: {
    Menu
  }
}
</script>

<style>
.floating-menu {
  background: yellowgreen;
  padding: 5px;;
  width: 250px;
  z-index: 100;
  position: fixed;
  top: 200px;
  right: 0px;
}
</style>
