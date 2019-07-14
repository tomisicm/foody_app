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
        <aside class="floating-menu">
          <b-card
            :style="{ backgroundColor: 'inherit' }"
          >
            <div slot="header">
              Cart Items
              <b-button-close size="sm" aria-label="Minimize" variant="outline-success">
                <font-awesome-icon icon="window-minimize" />
              </b-button-close>
            </div>
            <!-- {{orders.map(order => order.menuItem.name + ': ' + order.quantity )}} -->
            <b-row v-for="order in orders" :key="order.menuItem._id">
              {{ order.menuItem.name }} x {{ order.quantity }}
            </b-row>
        </b-card>
        </aside>
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
