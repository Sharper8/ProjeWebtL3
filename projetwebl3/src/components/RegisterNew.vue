<template>
  <div class="container-fluid p-0">
    <AppMenu></AppMenu>
    <div class="container mt-4">
      <h2 class="mb-4">Inscription</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="username" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
        <p v-if="error" class="text-danger mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

  
  <script>
  import AppMenu from './AppMenu.vue';

  export default {
    name:'RegisterPage',
    components: {
      AppMenu
    },
    data() {
      return {
        username: '',
        email: '',
        password: '',
        error: ''
      };
    },
    methods: {
      register() {
        // Envoyer les données d'inscription au serveur
        console.log(this.username, this.email, this.password);
        fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          })
        })
        .then(response => {
          if (response.ok) {
            // Si la réponse est OK, obtenir le token JWT
            response.json().then(data => {
              const token = data.token;
              // Afficher le token JWT dans la console pour le débogage
              console.log("Token JWT reçu:", token);
              // Stocker le token JWT dans le stockage local
              localStorage.setItem('token', token);
              // change les valeurs de l'état de connexion et du rôle de l'utilisateur
              //const role = data.role;
              //this.$store.commit('setLoggedIn', true);
              //if (role === 'admin') {
              //  this.$store.commit('setIsAdmin',true);
              //}
              //else {
              //  this.$store.commit('setIsAdmin',false);
              //}
              this.$router.push('/profile');
            });
            } else {
            // Afficher un message d'erreur avec le contenu de la réponse
            response.json().then(data => {
            this.error = data.message;
            }).catch(error => {
            console.error('Erreur lors de la conversion de la réponse JSON:', error);
            this.error = 'L\'inscription a échoué. Veuillez réessayer.';
            });
        }
        })
        .catch(error => {
        console.error('Erreur lors de la requête d\'inscription:', error);
        this.error = 'L\'inscription a échoué. Veuillez réessayer.';
        });
      }
    }
  };
  </script>
  
  <style>
  .error {
    color: red;
  }
  </style>
  