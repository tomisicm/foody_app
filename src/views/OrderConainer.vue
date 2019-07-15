<template>
  <div>
    <h3>New Order</h3>

    <b-row>
      <b-col md="6">
        <Address
          :label="'Order Address'"
          :address="address"
          @update:address="updateAddress($event)"
        >
          <template v-slot:inputerrors>
            <small class="form-text text-danger">{{ errors.first('address') }}</small>
          </template>
        </Address>

      </b-col>
    </b-row>

    <b-row>
      <b-col md="6">
        <Cart
          :address="address"
          :validateBeforeSubmit="validateBeforeSubmit"
        />
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

import _ from 'lodash'

import Cart from '@/components/Cart'
import SingleMenuItem from '@/components/parts/SingleMenuItem'
import ListControll from '@/components/ListControll'
import Address from '@/components/parts/Address'

export default {

  data () {
    return {
      menuItems: [],
      address: {
        city: '',
        street: '',
        streetNo: ''
      }
    }
  },

  methods: {
    async getMenuItems () {
      const { data } = await cateringService.getMentItemsForCatering(this.$route.params.id)
      this.menuItems = data.docs
    },

    updateAddress (address) {
      this.address = address
    },

    validateBeforeSubmit () {
      const adrBool = Object.values(this.address).every(adr => !_.isEmpty(adr))

      if (!adrBool) {
        this.errors.add({
          field: 'address',
          msg: 'Please provide order destination.'
        })
      }
      return adrBool
    }
  },

  computed: {

  },

  watch: {
    'address': {
      handler: function (value) {
        this.errors.remove('address')
      },
      deep: true
    }

  },

  created () {
    this.getMenuItems()
  },

  components: {
    Cart, Address, ListControll, SingleMenuItem
  }
}
</script>
