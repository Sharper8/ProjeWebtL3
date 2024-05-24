<template>
  <div class="jumbotron jumbotron-fluid bg-primary p-4">
    <div class="d-flex justify-content-between align-items-center text-white">
      <h1>Free Prix</h1>
      <!-- Tester les routes -->
      <nav>
        <ul class="nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link text-white">Produits</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/profile" class="nav-link text-white">Profil</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/orders" class="nav-link text-white">Commandes</router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/register" class="nav-link text-white">Créer compte</router-link>
          </li>
          <!-- <li v-if="isLoggedIn"><button @click="logout">Déconnexion</button></li> -->
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/login" class="nav-link text-white">Connexion</router-link>
          </li>
          <li v-if="isAuthenticated && isAdmin" class="nav-item">
            <router-link to="/AdminDashboard" class="nav-link text-white">Admin Dashboard</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>



<script>
// import AppMenu from './AppMenu.vue';
import { jwtDecode } from 'jwt-decode';
  export default {
    name: 'AppMenu',
    computed: {
    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    },
    isAdmin() {
      if (this.isAuthenticated) {
        // Décoder le token JWT pour récupérer les informations
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        // Vérifier si l'utilisateur a le rôle d'administrateur
        return decodedToken.role === 'ADMIN';
      }
      return false;
    },
  },
    // components: {
    //   AppMenu
    // },
  methods: {
    logout() {
        // Effacer les informations d'authentification du stockage local
        localStorage.removeItem('token');
        // Mettre à jour l'état de connexion
        this.isLoggedIn = false;
        this.$router.push('/login');
    },
  },
  };
    
</script>

<!-- Add " scoped " attribute to limit CSS to this component only -->
<style scoped>
</style>