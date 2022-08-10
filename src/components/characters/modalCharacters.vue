<template>
  <transition>
    <div class="mascara-modal">
      <div class="envoltura-modal">
        <div class="tarjeta-modal">
          <h1 class="titulo-modal">Characters Filter</h1>
          <va-form
            class="form-modal"
            tag="form"
            @submit.prevent="hacerBusqueda"
          >
            <va-input class="mt-3 " label="Name" v-model="nameForm" />

            <va-select
              class="mt-3 "
              label="Status"
              v-model="statusForm"
              :options="optionsStatus"
              clearable
            />

            <va-input
              class="mt-3 "
              label="Species"
              v-model="speciesForm"
            />

            <va-input
              class="mt-3 "
              label="Type"
              v-model="typeForm"
            />

            <va-select
              class="mt-3 "
              label="Gender"
              v-model="genderForm"
              :options="optionsGender"
              clearable
            />

            <va-button type="submit" class="mt-3"> Search </va-button>
          </va-form>
        </div>
        <div class="close-modal" @click="closeModal"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      nameForm: "",
      statusForm: "",
      optionsStatus: ["alive", "dead", "unknown"],
      speciesForm: "",
      typeForm: "",
      genderForm: "",
      optionsGender: ["female", "male", "genderless", "unknown"],
    };
  },
  methods: {
    hacerBusqueda() {
      this.$emit("_hacerBusqueda", [ this.nameForm, this.statusForm, this.speciesForm, this.typeForm, this.genderForm])
    },
    closeModal() {
      this.$emit("_closeModal", false);
    },
  },
};
</script>

<style scoped>
.mascara-modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(25, 25, 26, 0.548);
  transition: ocupacy 0.3 ease;
  overflow-y: auto;
  overflow-x: hidden;
}
.envoltura-modal {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 150;
}
.tarjeta-modal {
  min-width: 50%;
  max-width: 90%;
  padding: 15px;
  background-color: rgb(207, 215, 219);
  border-radius: 10px;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
}
.close-modal {
  width: 100vh;
}
.close-modal {
  width: 100vw;
  height: 100vh;
}
.titulo-modal {
  font-size: 1.5rem;
  color: rgb(46, 46, 46);
}
.form-modal {
  width: 75%;
  margin: 20px auto;
}
</style>
