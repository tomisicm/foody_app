<template>
  <div>
    Order
    <b-row>
      <b-col md="6">
        <Cart />
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
import Menu from '@/components/Menu'
import Cart from '@/components/Cart'

export default {

  data () {
    return {

    }
  },

  methods: {

  },

  computed: {

  },

  components: {
    Menu, Cart
  }
}
</script>
