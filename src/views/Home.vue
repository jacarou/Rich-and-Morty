<template>
  <div class="fondo">
    <div class="conteneder-home">
      <h1 class="titulo">Rick & Morty Museum</h1>
      <div class="parrafo">
        <p>
          This page is for lovers of rick and morty TV show. Check which
          characters appear in each chapter, information about your favorite
          characters, where they come from, where they live and more.
        </p>
      </div>
    </div>
    <div class="footer">
        <p>
            Made by: Jhony Alejandro Caro - 20191020055<br>
            Universidad Distrital Francisco José de Caldas
        </p>
        <img class="vue" src="../../src/assets/Logo_vue.png" >

    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
.titulo{
  padding-top: 50px;
  font-size: 2rem;
}.footer p{
    font-size: 1.2rem;
    color: aliceblue;
    line-height : 25px;
}
.vue{
    margin: 10px;
    width: 30px;

}
.fondo {
  height: 70vh;
  margin: 0%;
  background-repeat: no-repeat;
  color: rgb(10, 7, 2);
  background-image: url("../../src/assets/Fondo.png");
  background-position-y: bottom;
}
.contenedor-home {
  height: 100%;
}
.parrafo {
  width: 100%;
  display: flex;
  justify-content: end;
  padding-top: 80px;
  padding-right: 100px;
}
.parrafo p {
  font-size: 1.8rem;
  width: 30%;
  text-align: justify;
}
.footer {
  width: 100vw;
  background-color: black;
  height: 20%;
  position: fixed;
  bottom: 0%;
  padding: 15px;
}
</style>
