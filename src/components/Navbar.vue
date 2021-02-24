<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">Sewasa</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/foods">Foods</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/keranjang">
              Keranjang <b-icon-cart />
              <span class="badge badge-success ml-1">{{
                update ? update.length : keranjangs.length
              }}</span></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      keranjangs: [],
    };
  },
  props: ["update"],
  methods: {
    setData(data) {
      this.keranjangs = data;
    },
  },
  mounted() {
    axios
      .get("https://my-json-server.typicode.com/aditrio/vue-db/keranjangs")
      .then((response) => this.setData(response.data))
      .catch((err) => console.log(err));
  },
};
</script>

<style>
</style>