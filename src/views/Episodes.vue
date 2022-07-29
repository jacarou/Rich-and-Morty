<template>
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
      :current-page="currentPage"
      :filter="filtro"
      @filtered="filtered = $event.items"
      :animated="true"
      :striped="isTableStriped"
      :hoverable="true"
      selected-color="#505050"
    >
      <template #bodyAppend>
        <tr>
          <td colspan="8" class="manejador">
            <va-pagination
              v-model="currentPage"
              color="#505050"
              input
              :pages="pages"
            />
          </td>
        </tr>
      </template>
    </va-data-table>
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
      porPagina: 10,
      currentPage: 1,
      filtro: "",
      filtered: [],

      isTableLoading: true,
      isTableStriped: true,
      hideDefaultHeader: true,
      footerClone: true,
      prependSlot: true,
      appendSlot: true,
      animates: true,
      rowEventType: "",
      rowId: "",
    };
  },
  methods: {
    getData() {
      this.axios.get(this.url).then((response) => {
        console.log(response.data);
        this.episodios = response.data.results;
        this.filtered = response.data.results;
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
</style>
>
