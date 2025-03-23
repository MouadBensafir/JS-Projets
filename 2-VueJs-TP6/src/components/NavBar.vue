<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-item">Accueil</router-link>
      <router-link to="/create" class="navbar-item">Créer un Blog</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
/* Basic Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

/* Navbar Styles */
.navbar {
  background-color: rgb(24, 90, 189);
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1000px;
}

.navbar-item {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
