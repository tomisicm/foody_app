<template>
  <b-col class="my-3">
    <b-form-group label-cols-sm="3" :label="label" class="mb-0">
      <b-input-group>
        <b-form-input
          v-model="address.city"
          placeholder="City"
        />
      </b-input-group>
    </b-form-group>

    <b-form-row class="mt-3">
      <div class="col-md-8">
        <b-form-input
          v-model="address.street"
          type="text"
          class="form-control"
          id="street"
          aria-describedby="street"
          placeholder="Street name"
        />
      </div>
      <div class="col-md-4">
        <b-form-input
          v-model="address.streetNo"
          type="text"
          class="form-control"
          id="streetNo"
          aria-describedby="streetNo"
          placeholder="Number"
        />
      </div>

      <slot name="inputerrors" />

    </b-form-row>
  </b-col>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: function () {
        return {
          city: '',
          street: '',
          streetNo: ''
        }
      }
    },
    label: {
      type: String,
      default: 'Address'
    }
  },

  watch: {
    'address': {
      handler () {
        this.$emit('update:address', this.address)
      },
      deep: true
    }
  }
}
</script>
