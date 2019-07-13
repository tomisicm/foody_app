<template>
  <div>
    Order
    <b-row>
      <b-col md="10">
        <Menu
          :orderState="true"
        />
      </b-col>

      <!-- this might not exist on wide screens -->
      <b-col md="3">
        <aside class="floating-menu">Expand as possible</aside>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {

  data () {
    return {
      orders: []
    }
  },

  methods: {
    updateOrdersList (event) {
      console.log(event)
    }
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
