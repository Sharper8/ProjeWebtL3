<template>
  <div>
    <!-- Afficher le message de bienvenue si l'utilisateur est connecté -->
    <AppMenu></AppMenu>
    <div v-if="isLoggedIn" class="welcome-banner alert alert-success">
      Bienvenue {{ username }}, vous êtes {{ role }}
      <div class="mt-3">
        <button @click="chpw()" class="btn btn-warning m-3">Edit password</button>
        <button @click="deac()" class="btn btn-danger m-3">Delete Account</button>
        <button @click="logout()" class="btn btn-danger m-3">Déconnexion</button>
      </div>
    </div>
    <!-- make a button appear if the user is admin-->
  </div>
</template>
  
  <script>
  import { jwtDecode } from 'jwt-decode';
  import AppMenu from './AppMenu.vue';
// import router from '@/router';
  // import HomePage from './HomePage.vue';

  export default {
    name:"UserProfile",
    components: {
      AppMenu
    },
    data() {
      return {
        isLoggedIn: false,
        username: ''
      };
    },
    created() {
      // Vérifier si l'utilisateur est connecté en consultant le stockage local
      const token = localStorage.getItem('token');
      if (token) {
        // Décodez le token JWT pour obtenir les informations de l'utilisateur
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.userId) {
          // Mettre à jour l'état de connexion et le nom d'utilisateur
          this.isLoggedIn = true;
          this.username = decodedToken.username; 
          // Obtenir le rôle de l'utilisateur
          this.role = decodedToken.role;
        }
      }
    },
    methods: {
      logout() {
        // Effacer les informations d'authentification du stockage local
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
      chpw(){
        this.$router.push('/change-password');
      },
      deac(){
        this.$router.push('/delete-account');
      }
    }
  };
  </script>  

  <style>
  .welcome-banner {
    background-color: lightgreen;
    padding: 10px;
    border: 1px solid green;
    margin-bottom: 10px;
  }
  </style>
  