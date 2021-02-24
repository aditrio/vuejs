<template>
  <div>
    <Navbar />
    <div class="home">
      <div class="container">
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="justify-content-center align-self-center">
                <h3>
                  <b>Delicious Food Menu,</b> <br />
                  in Your Gadget
                </h3>
                <router-link to="/foods" class="btn btn-sm btn-primary"
                  >Order Now</router-link
                >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <img src="../assets/img/eat.svg" width="100%" alt="" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg">
            <h3>Best <b>Foods</b></h3>
          </div>
          <div class="col-lg">
            <router-link class="btn btn-sm btn-primary float-right" to="/foods">
              <b-icon-eye /> Lihat semua</router-link
            >
          </div>
        </div>
        <div class="row mt-4 mb-4">
          <div class="col-lg" v-for="product in products" :key="product.id">
            <CardProduct :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardProduct from "@/components/CardProduct.vue";
import Navbar from "@/components/Navbar.vue";

import axios from "axios";

export default {
  name: "Home",
  components: {
    CardProduct,
    Navbar,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/best-products")
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log(error));
  },
};
</script>
