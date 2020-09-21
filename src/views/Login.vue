<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 pt-5">
        <form class="form" action method="POST" @submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">Please Log in</h1>
          <div class="form-group">
            <label for="inputEmail" class="sr-only">Email address</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'border-danger': errors.email }"
              placeholder="Email address"
              required
              v-model="data.email"
            />
            <small class="text-danger form-text" v-if="errors.email">{{
              errors.email[0]
            }}</small>
          </div>
          <div class="form-group">
            <label for="inputPassword" class="sr-only">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'border-danger': errors.password }"
              placeholder="Password"
              required
              v-model="data.password"
            />
            <small class="text-danger form-text" v-if="errors.password">{{
              errors.password[0]
            }}</small>
          </div>
          <div class="form-group">
            <button
              class="btn btn-md btn-dark btn-block"
              type="submit"
              :disabled="loginButtonDisabled"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",

  data() {
    return {
      data: {
        email: "",
        password: ""
      },
      loginButtonDisabled: false,
      errors: {}
    };
  },

  mounted() {
    if (navigator.onLine) {
      console.log("online");
    } else {
      console.log("offline");
    }
  },

  methods: {
    login() {
      if (navigator.onLine == false) {
        alert("You are offline. Pleas connect and try again");
        return;
      }
      this.loginButtonDisabled = true;
      axios
        .post("/login", {
          email: this.data.email,
          password: this.data.password,
          device_name: "PQ Offline Web App"
        })
        .then(response => {
          const token = response.data.token;
          axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          localStorage.setItem("token", token);
          const user = JSON.stringify(response.data.user);
          localStorage.setItem("user", user);
          this.$router.push({ path: "/" });
          alert("Logged in");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          alert(error.response.data.message);
        })
        .finally(() => {
          this.loginButtonDisabled = false;
        });
    }
  }
};
</script>

<style scoped lang="scss"></style>
