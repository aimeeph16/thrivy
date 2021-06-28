<template>
  <div class="signup-form"><!--sign up form-->
    <h2>New User Signup!</h2>
    <div class="alert alert-danger" v-if="this.error_message">{{ this.error_message }}</div>
    <div class="alert alert-danger" v-for="item in this.validation_errors" :key="item">{{ item }}</div>
    <form action="#" method="post" @submit.prevent="register()">
      <input type="text" placeholder="Name" name="name" v-model="register_data.name" />
      <input type="email" placeholder="Email Address" name="email" v-model="register_data.email"/>
      <input type="password" placeholder="Password" name="password" v-model="register_data.password" />
      <input type="password" placeholder="Password Confirmation" name="password_confirmation" v-model="register_data.password_confirmation" />
      <button type="submit" class="btn btn-default">Signup</button>
    </form>
  </div><!--/sign up form-->
</template>
<script>
    export default {
        name: "FrontRegister",
        data() {
          return {
            register_data: {
              name: "",
              email: "",
              password: "",
              password_confirmation: ""
            },
            error_message: '',
            validation_errors: []
          }
        },
        methods: {
          register() {
            this.validation_errors = [];
            this.error_message = '';
            this.clearStorage();
            this.$axios.$post('api/register', this.register_data).then(response => {
              this.saveIntoStorage(response);
              this.$store.dispatch('general/storeAuthData', {auth_token: response.access_token, user_data: response.user});
              this.$router.push('/');
            }).catch(error => {
              this.error_message = error.response.data.message;
              if(error.response.data.errors) {
                for(let key in error.response.data.errors) {
                  this.validation_errors.push(error.response.data.errors[key][0]);
                }
              }
            });
          },
          clearStorage() {
            localStorage.removeItem('is_authenticated');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
          },
          saveIntoStorage(response) {
            localStorage.setItem('is_authenticated', 1);
            localStorage.setItem('auth_token', response.access_token);
            localStorage.setItem('user_data', JSON.stringify(response.user));
          }
        }
    }
</script>