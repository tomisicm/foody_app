<template>
  <b-card class="px-1">
    <b-row class="mt-1">
      <b-col class="px-0" md="8" :style="{ textAlign: 'left' }">
        <b-alert show variant="light">Food Name</b-alert>
      </b-col>
      <b-col class="px-0" md="4">
        <b-alert show variant="warning">Popular</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-img fluid src="https://www.donesi.com/images/product/20/166820_m.jpg"/>
    </b-row>
    <b-row class="mt-1 text-size-11">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt deleniti est, saepe, voluptas ipsam animi, consequatur ipsum dolorum iure asperiores labore facilis tenetur.</b-row>
    <hr />
    <b-row class="text-size-10">
      <b-col cols="auto mr-auto" :style="{ textAlign: 'left' }">portion in g</b-col>
      <b-col class="auto" :style="{ textAlign: 'right' }">price</b-col>
    </b-row>
  </b-card>
</template>

<style>
/*
.card-body {
  padding: 0.5rem !important;
} */

.text-size-11 {
  font-size: 11pt;
}

.text-size-10 {
  font-size: 10pt;
}

.alert.light {
  padding: .5rem .25rem;
  margin-bottom: 0rem;
}

.alert.alert-warning {
  padding: .5rem .25rem;
  margin-bottom: 0rem;
}
</style>
