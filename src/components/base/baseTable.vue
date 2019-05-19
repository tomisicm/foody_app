<template>
  <div>
    <b-table striped hover small :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: {
        last_name: {
          label: 'Person last name',
          sortable: true
        },
        first_name: {
          label: 'Person first name',
          sortable: false
        },
        city: {
          key: 'address.city',
          label: 'City',
          sortable: true
        },
        'address.country': {
          label: 'Country',
          sortable: true
        }
      },
      items: [
        {
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald',
          address: { country: 'USA', city: 'New York' }
        },
        {
          age: 21,
          first_name: 'Larsen',
          last_name: 'Shaw',
          address: { country: 'Canada', city: 'Toronto' }
        },
        {
          age: 89,
          first_name: 'Geneva',
          last_name: 'Wilson',
          address: { country: 'Australia', city: 'Sydney' }
        },
        {
          age: 38,
          first_name: 'Jami',
          last_name: 'Carney',
          address: { country: 'England', city: 'London' }
        }
      ]
    }
  }
}
</script>
