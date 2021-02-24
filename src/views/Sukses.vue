<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4 justify-content-center">
        <div class="col-lg-4">
          <img :src="'../img/sukses.png'" class="img-fluid" alt="" />
          <h4><b> Pesanan </b> sedang di proses !!</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "Sukses",
  components: {
    Navbar,
  },
};
</script>

