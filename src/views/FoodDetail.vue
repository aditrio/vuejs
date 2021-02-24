<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4 mb-2">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ product.nama }}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6">
          <img
            :src="'../img/' + product.gambar"
            class="img-fluid shadow"
            alt=""
          />
        </div>
        <div class="col-lg-6">
          <h3>
            <b> {{ product.nama }}</b>
          </h3>
          <hr />
          <h5>Harga : Rp.{{ product.harga }}</h5>
          <div class="mt-3">
            <form v-on:submit.prevent>
              <div class="form-group">
                <label for="jumlah">Jumlah Pesan</label>
                <input
                  required
                  placeholder="0"
                  type="number"
                  class="form-control"
                  v-model="order.jumlah"
                />
              </div>
              <div class="form-group">
                <label for="keterangan">Keterangan</label>
                <textarea
                  class="form-control"
                  placeholder="example : nasi setengah, pedas .."
                  v-model="order.keterangan"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" @click="addToCart" class="btn btn-primary">
                <b-icon-cart /> Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  name: "FoodDetail",
  data() {
    return {
      product: {},
      order: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    addToCart() {
      if (this.order.jumlah) {
        this.order.product = this.product;
        axios
          .post("http://localhost:3000/keranjangs/", this.order)
          .then(() => {
            this.$toast.success("Added to Cart !!", {
              dismissible: true,
              position: "top-right",
              type: "success",
              duration: 4000,
            });
            this.$router.push({ name: "keranjang" });
          })
          .catch((error) => console.log(error));
      } else {
        this.$toast.error("Field cannot be null / 0", {
          dismissible: true,
          position: "top-right",
          type: "error",
          duration: 4000,
        });
      }
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>