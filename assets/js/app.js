var app = new Vue({
    el: '#app',
    data: {
      check: 'ok',
      halo: 'Hello Vue! bambang',
      halo2: 'halo dunia',
      a: 3,
      b: 9,
      result: null,
      kilometers: 0,
      meters:0,
      text:'',
      textarea:'',
      checkbox:[],
      style: 'color : red; font-size = 30px;',
      message: '',
    },
    computed: {
        sum: function(){
            return this.a * this.b;
        }
    },
    methods: {
        sumProcess: function(){
            return this.result = this.a + this.b;
        },
        showAlert: function(){
            alert('click ok to continue !!');
        }
    },
    watch: {
        kilometers: function(val){
            this.kilometers = val;
            this.meters = val * 1000;      
        },
        meters: function(val){
            this.meters = val;
            this.kilometers = val / 1000;
        }

    },
  })