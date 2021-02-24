<template>
  <div>
    <Navbar />
    <div>
      <div class="container">
        <div class="row mt-4">
          <div class="col">
            <h3>Daftar <b>Makanan</b></h3>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div class="input-group flex-nowrap">
              <input
                v-model="search"
                type="text"
                class="form-control"
                placeholder="Cari makanan .."
                aria-label="cari"
                aria-describedby="addon-wrapping"
                @keyup="searchFood"
              />
              <div class="input-group-prepend">
                <span class="input-group-text bg-primary" id="addon-wrapping"
                  ><b-icon-search class="text-white"
                /></span>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-4" v-for="product in products" :key="product.id">
            <CardProduct :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CardProduct from "@/components/CardProduct.vue";
import Navbar from "@/components/Navbar.vue";

import axios from "axios";
// import Navbar from '../components/Navbar.vue';
export default {
  name: "Foods",
  components: {
    CardProduct,
    Navbar,
    // Navbar,
  },
  data() {
    return {
      products: [],
      search: "",
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    searchFood() {
      axios
        .get(
          "https://my-json-server.typicode.com/aditrio/vue-db/products?q=" +
            this.search
        )
        .then((response) => this.setProducts(response.data))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get("https://my-json-server.typicode.com/aditrio/vue-db/products")
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>