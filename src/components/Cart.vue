<template>
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
        <b-col class="px-0 mx-0 mt-2">
          {{ order.menuItem.name }}
        </b-col>

        <b-col cols="4" sm="4" class="px-0 mx-0 mt-2">
          {{ order.menuItem.price * order.quantity }}
        </b-col>

        <b-col cols="3" sm="3" md="3" class="px-0 mt-0">
          <b-input
            v-model="order.quantity"
          />
        </b-col>
      </b-row>

      <hr />
      <footer>
        <b-row class="mb-2 align-end">
          <b-col>
            <span class="align-text-bottom">Total: {{totalOrder}}</span>
          </b-col>

          <b-col md="7">
            <b-button variant="success">Order</b-button>
          </b-col>
        </b-row>
      </footer>
    </b-card>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      isMinimized: true
    }
  },

  methods: {
    ...mapActions('cartStore', ['makeOrder']),
    toggleMinimize () {
      this.isMinimized = !this.isMinimized
    }
  },

  computed: {
    ...mapState('cartStore', {
      orders: state => state.orders
    }),

    totalOrder () {
      return this.orders.reduce((acc, obj) => acc + obj.menuItem.price * obj.quantity, 0)
    }
  }
}
</script>

<style scoped>
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

.align-end {
  align-items: flex-end;
}
</style>
