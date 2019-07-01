<template>
  <div class="mt-4">
    <ListControll
      :items="menuItems"
      :listitemclass="'col-md-4'"
    >
      <!-- disable this button as long as there is one new item -->
      <template v-slot:btnfield>
        <b-row class="ml-3 mb-3" md="2">
          <b-btn variant="primary" @click="handleAddMenuItem">New Menu Item</b-btn>
        </b-row>
      </template>
      <!-- <template v-slot:inputfield>
        <div class="col-md-4">
          <SingleMenuItem
            :item="newMenuItem"
          />
        </div>
      </template> -->

      <template v-slot:listitem={item}>
        <SingleMenuItem
          :item="item"
        />
      </template>
    </ListControll>

  </div>
</template>

<script>
import SingleMenuItem from '@/components/parts/SingleMenuItem'
import ListControll from '@/components/ListControll'

export default {
  data () {
    return {
      newMenuItem: Object.assign({}, this.resetNewItem()),
      menuItems: [
        {
          _id: '23423423423423',
          name: 'Virsla',
          image: 'https://www.donesi.com/images/product/20/166820_m.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt deleniti est, saepe, voluptas ipsam animi, consequatur ipsum dolorum iure asperiores labore facilis tenetur.',
          portion: 'portion (g)',
          price: 'price',
          tag: 'Popular'
        },
        {
          _id: '23423423423433',
          name: 'Virsla II',
          image: 'https://www.donesi.com/images/product/20/166820_m.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt deleniti est, saepe, voluptas ipsam animi, consequatur ipsum dolorum iure asperiores labore facilis tenetur.',
          portion: 'portion (g)',
          price: 'price',
          tag: 'Popular'
        }
      ]
    }
  },

  methods: {
    handleAddMenuItem () {
      this.menuItems.unshift(this.newMenuItem)
    },
    handleRemoveMenuItem () {

    },

    resetNewItem () {
      return {
        name: '',
        image: 'https://www.donesi.com/images/product/20/166820_m.jpg',
        description: '',
        portion: '',
        price: '',
        tag: ''
      }
    }
  },

  components: {
    ListControll, SingleMenuItem
  }
}
</script>
