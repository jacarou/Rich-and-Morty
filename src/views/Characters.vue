<template>
  <div>
    <div class="head-title">
      <h1 class="titulo">Characters</h1>
      <va-button
        outline
        :rounded="false"
        flat
        class="mr-4 mb-2"
        @click="openModal"
      >
        <va-icon class="mr-1" name="filter_alt" color="dark" />
      </va-button>
    </div>
    <div class="contenedor">
      <va-card
        class="card"
        stripe
        :stripe-color="status[`${personaje.status}`]"
        v-for="(personaje, index) in personajes"
        :key="index"
        @click="abrirModalPersonaje(personaje)"
      >
        <va-image class="img" :src="personaje.image" />

        <va-card-title class="titulo-card"
          >{{ personaje.id }}-{{ personaje.name }}
        </va-card-title>
        <va-card-content>
          <h3>
            {{ personaje.species }} -
            <va-badge dot :color="status[`${personaje.status}`]">{{
              personaje.status
            }}</va-badge>
          </h3>
          <h3>gender: {{ personaje.gender }}</h3>
          <h3>origin: {{ personaje.origin.name }}</h3></va-card-content
        >
      </va-card>
    </div>
    <div class="paginator-content">
      <va-pagination
        class="paginator"
        :visible-pages="10"
        v-model="page"
        :total="cantidadPaginas"
        boundary-numbers
        :page-size="20"
        color="#505050"
        @click="getData()"
      />
    </div>

    <modal-characters
      @_hacerBusqueda="hacerBusqueda"
      @_closeModal="closeModal"
      v-if="activeModal"
    >
    </modal-characters>
    <va-modal v-model="verPersonaje" no-padding>
      <template #content="{ ok }">
        <va-image :ratio="1.4" :src="dataModalPersonaje.image" />
        <va-card-title class="titulo-modal-personaje">
          <va-badge dot :color="status[`${dataModalPersonaje.status}`]">
            {{ dataModalPersonaje.name }}
          </va-badge>
        </va-card-title>
        <va-card-content>
          <h3>
            {{ dataModalPersonaje.species }} / {{ dataModalPersonaje.gender }}
          </h3>
          <br />
          <h2>Episodes: ( {{ episodiosPersonaje.length }})</h2>
          <ul v-for="(episodio, i) in episodiosPersonaje" :key="i">
            <li>{{ episodio.name }} - {{ episodio.episode }}.</li>
          </ul>
        </va-card-content>
        <va-card-actions>
          <va-button @click="ok" color="#9CCF2F">Ok</va-button>
        </va-card-actions>
      </template>
    </va-modal>
  </div>
</template>

<script>
import ModalCharacters from "@/components/characters/modalCharacters.vue";
export default {
  data() {
    return {
      activeModal: false,
      verPersonaje: false,
      url: "https://rickandmortyapi.com/api/character",
      personajes: [],
      status: { Alive: "success", Dead: "danger", unknown: "warning" },
      page: 1,
      episodiosPersonaje: [],
      cantidadPaginas: 1,
      dataModalPersonaje: {},
      filtros: {
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
      },
    };
  },
  methods: {
    getEpisodio(episodios) {
      this.episodiosPersonaje = [];
      for (const episodio of episodios) {
        this.axios({
          method: "get",
          url: `${episodio}`,
        }).then((response) => {
          this.episodiosPersonaje.push(response.data);
        });
      }
    },
    getData() {
      const parametros = new URLSearchParams();
      parametros.append("name", this.filtros.name);
      parametros.append("status", this.filtros.status);
      parametros.append("species", this.filtros.species);
      parametros.append("type", this.filtros.type);
      parametros.append("gender", this.filtros.gender);
      parametros.append("page", 1 + Math.round(this.page / 20));
      this.axios({
        method: "get",
        url: this.url,
        params: parametros,
      }).then((response) => {
        this.personajes = response.data.results;
        this.cantidadPaginas = response.data.info.count;
      });
    },
    openModal() {
      this.activeModal = true;
    },

    closeModal(data) {
      this.activeModal = data;
    },
    hacerBusqueda(data) {
      this.activeModal = false;
      this.filtros.name = data[0];
      this.filtros.status = data[1];
      this.filtros.species = data[2];
      this.filtros.type = data[3];
      this.filtros.gender = data[4];
      this.getData();
    },
    abrirModalPersonaje(personaje) {
      this.verPersonaje = true;
      this.getEpisodio(personaje.episode);
      this.dataModalPersonaje[`name`] = personaje.name;
      this.dataModalPersonaje[`species`] = personaje.species;
      this.dataModalPersonaje[`image`] = personaje.image;
      this.dataModalPersonaje[`status`] = personaje.status;
      this.dataModalPersonaje[`type`] = personaje.type;
      this.dataModalPersonaje[`gender`] = personaje.gender;
    },
  },
  mounted() {
    this.getData();
  },
  components: { ModalCharacters, ModalCharacters },
};
</script>

<style scoped>
h1 {
  color: black;
}
.card {
  border-left: #9c9b9ba4 solid 1px;
  border-right: #9c9b9ba4 solid 1px;
  border-bottom: #9c9b9ba4 solid 1px;
  margin: 10px;
  width: 20%;
  background-color: #92adc9;
  border-radius: 10px;
  padding-top: 3px;
}
.card:hover {
  box-shadow: 3px 3px 18px 4px rgb(87, 87, 87);
  cursor: pointer;
}

.card .img {
  padding-top: 100px;
  width: 100%;
  height: 200px;
}

ul {
  display: block;
  list-style-type: disc;
  margin-top: 1em;
  margin-bottom: 1 em;
  margin-left: 0;
  margin-right: 0;
  padding-left: 40px;
  margin-left: 30px;
  margin-right: 60px;
}
.contenedor {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.titulo {
  color: #363636;
  font-size: 1.7rem;
  margin: 15px;
}
.titulo-card,
.titulo-modal-personaje {
  font-size: 1.2rem;
}
.head-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.paginator {
  margin: auto;
}
.paginator-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px 25px 0px;
}
</style>
