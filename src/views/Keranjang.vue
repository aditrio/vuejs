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
    };
  },
  methods: {
    setData(data) {
      this.keranjang = data;
    },
    deleteData(id) {
      axios.delete("http://localhost:3000/keranjangs/" + id).then(() => {
        this.$toast.error("Berhasil dihapus", {
          dismissible: true,
          position: "top-right",
          type: "error",
          duration: 4000,
        });

        axios
          .get("http://localhost:3000/keranjangs/")
          .then((response) => this.setData(response.data))
          .catch((error) => console.log(error));
      });
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs")
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