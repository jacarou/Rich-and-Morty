<template>
  <div class="main-lugares">
    <div class="head-title">
      <h1 class="titulo">Places</h1>
      <va-button
        outline
        :rounded="false"
        flat
        class="mr-4 mb-2"
        @click="cliked"
      >
        <va-icon class="mr-1" name="filter_alt" color="dark" />
      </va-button>
    </div>
    <div class="contenedor">
      <va-card
        class="tarjeta"
        v-for="(lugar, index) in lugares"
        :key="index"
        :bordered="false"
      >
        <va-card-title class="titulo-card"
          >{{ lugar.id }} - {{ lugar.name }}</va-card-title
        >
        <va-card-content>
          <h3>type: {{ lugar.type }}</h3>
          <h3>dimension: {{ lugar.dimension }}</h3></va-card-content
        >
      </va-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "https://rickandmortyapi.com/api/location",
      lugares: [],
    };
  },
  methods: {
    getData() {
      this.axios.get(this.url).then((response) => {
        console.log(response.data);
        this.lugares = response.data.results;
      });
    },
    cliked() {
      alert("Aun no hago nada xd");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.tarjeta {
  overflow: hidden;
  margin: 20px 10px;
  width: 20%;
}
.tarjeta:hover {
  box-shadow: 3px 3px 18px 4px #accf60;
  cursor: context-menu;
}

.main-lugares {
  background-color: rgb(244, 251, 252);
  padding: 10px;
  margin-top: -6px;
}
.contenedor {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}


.titulo {
  color: #363636;
  font-size: 1.7rem;
  margin: 15px;
}

.head-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.titulo-card {
  font-size: 1rem;
}
</style>
>
