<template>
  <div>
    <navbar></navbar>
    <div class="container mt-3">
      <div class="row col-12">
        <button
          class="btn btn-sm btn-outline-dark mr-3"
          @click="$router.back()"
        >
          &larr; Go Back
        </button>
        <button class="btn btn-sm btn-dark mr-3" @click="syncCourses">
          &#8635; Sync
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import navbar from "@/components/NavBar.vue";

export default {
  // name: "Home",
  components: {
    navbar
  },
  methods: {
    syncCourses() {
      if (navigator.onLine == false) {
        alert("You connect to the Internet and try again");
      } else {
        let questions = localStorage.getItem("questions");
        if (questions !== null) {
          questions = JSON.parse(questions);
          questions.forEach(question => {
            console.log("Question", question);
            window.axios
              .post("pqoffline/upload", question)
              .then(response => {
                console.log("Success", response.data);
                localStorage.setItem("questions", JSON.stringify([]));
              })
              .catch(error => {
                console.log("Error", error.response.data);
                return alert("Failed to upload offline questions");
              });
          });
        }
        window.axios
          .get("pqoffline/data")
          .then(response => {
            const courses = JSON.stringify(response.data.courses);
            localStorage.setItem("courses", courses);
            this.courses = response.data.courses;
            alert("Successfull");
            window.location.reload();
          })
          .catch(error => {
            this.errors = error.response.data.errors;
            alert("Cannot Sync at the moment. Please try again");
          });
      }
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
