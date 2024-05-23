<template>
    <div>
      <AppMenu></AppMenu>
      <h1>Change Password</h1>
      <form @submit.prevent="updatePassword">
        <div>
          <label for="email">Email:</label>
          <input type="text" v-model="email" id="email" required />
        </div>
        <div>
          <label for="currentPassword">Current Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Delete Account</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
    <script>
    import AppMenu from './AppMenu.vue';
  
    export default {
    name: 'DeleteAccount',
    components: {
        AppMenu
      },
    data() {
      return {
        email: '',
        password: '',
        error: ''
      };
    },
    methods: {
      async updatePassword() {
        fetch('http://localhost:3000/delete-account', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            })
          })
          .then(response => {
            if (response.ok) {
                alert('Account deleted');
                localStorage.removeItem('token');
                this.$router.push('/login');
              }
              else {
              this.error = 'Identifiants invalides';
              }
            })
          
  
        // try {
        //   const response = await axios.post('http://localhost:3000/change-password', {
        //     currentPassword: this.currentPassword,
        //     newPassword: this.newPassword
        //   });
  
        //   this.message = 'Password updated successfully!';
        // } catch (error) {
        //   this.message = 'Failed to update password: ' + error.response.data.message;
        // }
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
      color: red;
    }
  </style>