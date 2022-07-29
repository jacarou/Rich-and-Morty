<template>
  <transition>
    <div class="mascara-modal">
      <div class="envoltura-modal">
        <div class="tarjeta-modal">
          <h1 class="titulo-modal">hola mundo!!!!!!</h1>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
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
  padding: 5px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
}
.close-modal{
    width: 100vh;
}
</style>
