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
          <!-- :style="{ backgroundColor: 'inherit' }" -->
          <b-card
            header-bg-variant="success"
          >
            <div slot="header">
              Cart Items
              <b-button-close size="sm" aria-label="Minimize" variant="outline-success">
                <font-awesome-icon icon="window-minimize" />
              </b-button-close>
            </div>

            <b-row v-for="order in orders" :key="order.menuItem._id">
              <b-col class="px-1">
                {{ order.menuItem.name }}
              </b-col>
              <b-col md="3" class="px-0">
                <b-input
                  v-model="order.quantity"
                />
              </b-col>
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
  background: rgb(80, 113, 14);
  border-radius: 5px;
  padding: 3px;
  width: 250px;
  z-index: 100;
  position: fixed;
  top: 200px;
  right: 0px;
}
</style>
