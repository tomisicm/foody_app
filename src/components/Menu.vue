<template>
  <div class="mt-4">
    <ListControll
      :items="menuItems"
      @additem="handleAddMenuItem"
      @removeitem="handleRemoveMenuItem"
      :listitemclass="'col-md-4'"
    >
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
      newMenuItem: {

      },
      menuItems: [
        {
          name: 'Virsla',
          image: 'https://www.donesi.com/images/product/20/166820_m.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt deleniti est, saepe, voluptas ipsam animi, consequatur ipsum dolorum iure asperiores labore facilis tenetur.',
          portion: 'portion (g)',
          price: 'price',
          tag: 'Popular'
        },
        {
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

    },
    handleRemoveMenuItem () {

    }
  },

  components: {
    ListControll, SingleMenuItem
  }
}
</script>
