<template>
  <div>
    <Navbar :update="keranjang" />
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
                keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <h3>List of <b>Foods</b></h3>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <table class="table table-sm table-striped">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Foto</th>
                <th scope="col">Makanan</th>
                <th scope="col">Ket</th>
                <th scope="col">Harga</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Total Harga</th>
                <th scope="col">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in keranjang" :key="item.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <img
                    class="img-fluid"
                    width="200"
                    :src="'../img/' + item.product.gambar"
                    alt=""
                  />
                </td>
                <td>{{ item.product.nama }}</td>
                <td>{{ item.keterangan ? item.keterangan : "--" }}</td>
                <td>Rp.{{ item.product.harga }}</td>
                <td>x{{ item.jumlah }}</td>
                <td>
                  <b>Rp.{{ item.product.harga * item.jumlah }}</b>
                </td>
                <td>
                  <button
                    @click="deleteData(item.id)"
                    class="btn btn-sm bg-transparent text-danger"
                  >
                    <b-icon-trash />
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="6" align="right">
                  <b>Total harga : </b>
                </td>
                <td align="left">
                  <b>Rp.{{ totalHarga }}</b>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah">Nama</label>
              <input
                required
                placeholder="nama pemesan.."
                type="text"
                class="form-control"
                v-model="checkout.nama"
              />
            </div>
            <div class="form-group">
              <label for="jumlah">No Meja</label>
              <input
                required
                placeholder="0"
                type="number"
                class="form-control"
                v-model="checkout.no_meja"
              />
            </div>

            <button type="submit" @click="goCheckout" class="btn btn-primary">
              <b-icon-cash /> Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  name: "Keranjang",
  data() {
    return {
      keranjang: [],
      checkout: {},
    };
  },
  methods: {
    setData(data) {
      this.keranjang = data;
    },
    goCheckout() {
      if (this.checkout.nama && this.checkout.no_meja) {
        this.checkout.order = this.keranjang;
        axios
          .post(
            "https://my-json-server.typicode.com/aditrio/vue-db/pesanans/",
            this.checkout
          )
          .then(() => {
            this.keranjang.map(function (item) {
              return axios
                .delete(
                  "https://my-json-server.typicode.com/aditrio/vue-db/keranjangs/" +
                    item.id
                )
                .catch((err) => console.log(err));
            });
            this.$toast.success("Thankss !!", {
              dismissible: true,
              position: "top-right",
              type: "success",
              duration: 4000,
            });

            this.$router.push({ name: "sukses" });
          })
          .catch((error) => console.log(error));
      }
    },
    deleteData(id) {
      axios
        .delete(
          "https://my-json-server.typicode.com/aditrio/vue-db/keranjangs/" + id
        )
        .then(() => {
          this.$toast.error("Berhasil dihapus", {
            dismissible: true,
            position: "top-right",
            type: "error",
            duration: 4000,
          });

          axios
            .get(
              "https://my-json-server.typicode.com/aditrio/vue-db/keranjangs/"
            )
            .then((response) => this.setData(response.data))
            .catch((error) => console.log(error));
        });
    },
  },
  mounted() {
    axios
      .get("https://my-json-server.typicode.com/aditrio/vue-db/keranjangs")
      .then((response) => this.setData(response.data))
      .catch((err) => console.log(err));
  },
  computed: {
    totalHarga() {
      return this.keranjang.reduce(function (item, data) {
        return item + data.product.harga * data.jumlah;
      }, 0);
    },
  },
};
</script>

<style>
</style>