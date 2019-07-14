<template>
  <div>
    Order
    <b-row>
      <b-col md="6">
        <aside v-bind:class="[ isMinimized ? 'floating' : ' ']">
          <b-card
            header-bg-variant="success"
          >
            <div slot="header">
              Cart Items
              <b-button-close
                @click="toggleMinimize"
                size="sm" aria-label="Minimize" variant="outline-success">
                <font-awesome-icon icon="window-minimize" />
              </b-button-close>
            </div>

            <b-row class="text-size-11 px-0 mx-0">
              <b-col class="px-1">Name:</b-col>
              <b-col cols="4" sm="4" md="4" class="px-0">Total:</b-col>
              <b-col cols="4" sm="4" md="4" class="px-0">Quantity</b-col>
            </b-row>
            <hr />
            <b-row
              v-for="order in orders"
              :key="order.menuItem._id"
              class="text-size-11 px-0 mx-0"
            >
              <b-col class="px-1">
                {{ order.menuItem.name }}
              </b-col>
              <b-col cols="4" sm="4" class="px-0 mx-0">
                {{ order.menuItem.price * order.quantity }}
              </b-col>
              <b-col cols="3" sm="3" md="3" class="px-0">
                <b-input
                  :stype="{ fontSize: '12px' }"
                  v-model="order.quantity"
                />
              </b-col>

              <hr />
            </b-row>

            <hr />
          </b-card>
        </aside>

      </b-col>

      <b-col md="9">
        <Menu
          :orderState="true"
        />
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
      isMinimized: true
    }
  },

  methods: {
    toggleMinimize () {
      this.isMinimized = !this.isMinimized
    }
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
.floating {
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
