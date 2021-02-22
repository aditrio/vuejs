<template>
  <div>
    <div class="card card-product shadow mb-2" style="width: 100%">
      <img :src="'img/' + product.gambar" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ product.nama }}</h5>
        <p class="card-text">Harga : Rp.{{ product.harga }}</p>
        <a href="#" class="btn btn-primary"><b-icon-cart /> Order</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style>
</style>