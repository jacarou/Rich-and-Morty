<template>
  <div class="main-lugares">
    <div class="head-title">
      <h1 class="titulo">Places</h1>
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
        class="tarjeta"
        v-for="(lugar, index) in lugares"
        :key="index"
        :bordered="false"
        @click="abrirModalLugar(lugar)"
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
    <ModalPLaces
      @_hacerBusqueda="hacerBusqueda"
      @_closeModal="closeModal"
      v-if="activeModal"
    >
    </ModalPLaces>
    <va-modal v-model="verLugar" no-padding>
      <template #content="{ ok }">
        <va-card-title class="titulo-modal-lugar">
          {{ dataModalLugar.name }}
        </va-card-title>
        <va-card-content>
          <h3>{{ dataModalLugar.type }} / {{ dataModalLugar.dimension }}</h3>
          <br />
          <h2>Residents: ( {{ residentesLugar.length }})</h2>
          <div class="contenedor-residentes">
            <div v-for="(personaje, i) in residentesLugar" :key="i">
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
import ModalPLaces from "@/components/places/modalPLaces.vue";
export default {
  data() {
    return {
      activeModal: false,
      verLugar: false,
      url: "https://rickandmortyapi.com/api/location",
      lugares: [],
      cantidadPaginas: 1,
      dataModalLugar: {},
      residentesLugar: [],
      page: 1,
      filtros: {
        name: "",
        type: "",
        dimension: "",
      },
    };
  },
  methods: {
    getResidentes(residentes) {
      this.residentesLugar = [];
      for (const residente of residentes) {
        this.axios({
          method: "get",
          url: `${residente}`,
        }).then((response) => {
          this.residentesLugar.push(response.data);
        });
      }
    },
    abrirModalLugar(lugar) {
      this.verLugar = true;
      this.getResidentes(lugar.residents);
      this.dataModalLugar[`name`] = lugar.name;
      this.dataModalLugar[`type`] = lugar.type;
      this.dataModalLugar[`dimension`] = lugar.dimension;
    },
    getData() {
      const parametros = new URLSearchParams();
      parametros.append("name", this.filtros.name);
      parametros.append("type", this.filtros.type);
      parametros.append("dimension", this.filtros.dimension);
      parametros.append("page", 1 + Math.round(this.page / 20));
      this.axios({
        method: "get",
        url: this.url,
        params: parametros,
      }).then((response) => {
        this.lugares = response.data.results;
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
      this.filtros.type = data[1];
      this.filtros.dimension = data[2];
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
  components: { ModalPLaces },
};
</script>

<style scoped>
.tarjeta {
  overflow: hidden;
  margin: 20px 10px;
  width: 20%;
}
.el-personaje {
  width: 150px;
  margin: 10px 5px;
  overflow: hidden;
  text-align: center;
}
.tarjeta:hover {
  box-shadow: 3px 3px 18px 4px #accf60;
  cursor: pointer;
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
.titulo-card,
.titulo-modal-lugar {
  font-size: 1rem;
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
.contenedor-residentes {
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
