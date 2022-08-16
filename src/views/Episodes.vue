<template>
  <div>
    <div class="main-capitulos">
      <div class="head-title">
        <h1 class="titulo">Episodes</h1>
      </div>
    </div>
    <div class="contenedor-tabla">
      <va-data-table
        :items="episodios"
        :columns="columns"
        :per-page="porPagina"
        :current-page="parte"
        @filtered="filtered = $event.items"
        :filter="filtro"
        :animated="true"
        :striped="isTableStriped"
        :hoverable="true"
        selected-color="#505050"
        :clickable="true"
        @row:click="abrirModalEpisodio"
      >
        <template #bodyAppend>
          <tr>
            <td colspan="8" class="manejador">
              <va-pagination
                v-model="currentPage"
                color="#505050"
                :pages="cantidadPaginas"
                @click="getData(items)"
              />
            </td>
          </tr>
        </template>
      </va-data-table>
    </div>
    <va-modal v-model="verEpisodio" no-padding>
      <template #content="{ ok }">
        <va-card-title class="titulo-modal-episodio">
          {{ dataModalEpisodio.name }} - {{ dataModalEpisodio.episode }}
        </va-card-title>
        <va-card-content>
          <h3>{{ dataModalEpisodio.air_date }}</h3>
          <br />
          <h2>Characters: ( {{ personajesEpisodio.length }})</h2>
          <div class="contenedor-personajes">
            <div v-for="(personaje, i) in personajesEpisodio" :key="i">
              <div class="el-personaje">
                <va-image
                  :ratio="1.4"
                  class="imagen-standar"
                  :src="personaje.image"
                />
                <h2>{{ personaje.name }}</h2>
              </div>
            </div>
          </div>
        </va-card-content>
        <va-card-actions>
          <va-button @click="ok" color="#9CCF2F">Ok</va-button>
        </va-card-actions>
      </template>
    </va-modal>
  </div>
</template>

<script>
export default {
  data() {
    const columns = [
      { key: "id", sortable: true, with: "10%" },
      { key: "name", sortable: true, with: "35%" },
      { key: "episode", sortable: true, with: "25%" },
      { key: "air_date", sortable: true, with: "30%" },
    ];
    return {
      url: "https://rickandmortyapi.com/api/episode",
      episodios: [],
      columns,
      cantidadPaginas: 1,
      porPagina: 10,
      currentPage: 1,
      parte: 1,
      filtro: "",
      filtered: [],
      filtros: {
        name: "",
        type: "",
        dimension: "",
      },

      isTableLoading: true,
      isTableStriped: true,
      hideDefaultHeader: true,
      footerClone: true,
      prependSlot: true,
      appendSlot: true,
      animates: true,
      rowEventType: "",
      rowId: "",

      idxd: "",
      episodio: "",
      verEpisodio: false,
      dataModalEpisodio: {},
      personajesEpisodio: [],
    };
  },
  methods: {
    getPersonajes(personajes) {
      this.personajesEpisodio = [];
      for (const personaje of personajes) {
        this.axios({
          method: "get",
          url: `${personaje}`,
        }).then((response) => {
          this.personajesEpisodio.push(response.data);
        });
      }
    },
    abrirModalEpisodio(event) {
      let episodio = event.item;
      this.verEpisodio = true;
      this.getPersonajes(episodio.characters);
      this.dataModalEpisodio[`name`] = episodio.name;
      this.dataModalEpisodio[`episode`] = episodio.episode;
      this.dataModalEpisodio[`air_date`] = episodio.air_date;
    },
    calculaParte() {
      this.parte = this.currentPage % 2 == 0 ? 2 : 1;
    },
    getData() {
      console.log(this.idxd);
      const parametros = new URLSearchParams();
      parametros.append("name", this.filtros.name);
      parametros.append("type", this.filtros.type);
      parametros.append("dimension", this.filtros.dimension);
      parametros.append("page", Math.round(this.currentPage / 2));
      this.axios({
        method: "get",
        url: this.url,
        params: parametros,
      }).then((response) => {
        this.episodios = response.data.results;
        this.cantidadPaginas = Math.ceil(
          response.data.info.count / this.porPagina
        );
        this.calculaParte();
      });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    pages() {
      return this.porPagina && this.porPagina !== 0
        ? Math.ceil(this.filtered.length / this.porPagina)
        : this.filtered.length;
    },
  },
};
</script>

<style scoped>
.main-capitulos {
  padding: 10px;
}
.titulo {
  color: #363636;
  font-size: 1.7rem;
  margin: 15px;
}
.el-personaje {
  width: 150px;
  margin: 10px 5px;
  overflow: hidden;
  text-align: center;
}
.titulo-modal-episodio{
  font-size: 1rem;
}
.head-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.contenedor-tabla {
  padding: 0% 5%;
  --va-data-table-striped-tr-background-color: rgb(58, 58, 250);
  --va-data-table-thead-font-size: 1rem;
}
.manejador {
  padding-top: 20px;
  text-align: center;
  text-align: -webkit-center;
}
.contenedor-personajes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}
.imagen-standar {
  height: 100px;
  width: 150px;
  border-radius: 4px;
}
.imagen-standar:hover {
  filter: brightness(0.7);
}
</style>
>
