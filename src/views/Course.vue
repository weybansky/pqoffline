<template>
  <div class="container mt-2">
    <h3>{{ course.title ? course.title.toUpperCase() : "" }}</h3>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th width="10">S/N</th>
                <th>Year</th>
                <th>Questions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="course.past_exams">
              <tr v-for="(exam, index) in course.past_exams" :key="exam.id">
                <td>{{ ++index }}</td>
                <td>{{ exam.year }}</td>
                <td>{{ exam.questions.length }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-dark"
                    @click="
                      $router.push({
                        path: '/courses/' + course.id + '/exams/' + exam.id
                      })
                    "
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td class="text-center" colspan="4">
                  You were not assigned any year to fill. <br />
                  Click here to sync if this is an error. <br />
                  <!-- <button class="btn btn-sm btn-dark" @click="syncCourses">
                    Get Courses
                  </button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Course",
  data() {
    return {
      user: {},
      course: {}
    };
  },

  beforeRouteUpdate(to, from, next) {
    const id = to.params.course;
    this.getCourse(id);
    next();
  },

  mounted() {
    this.getUser();
    const id = this.$route.params.course;
    this.getCourse(id);
  },

  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },

    getCourse(id) {
      const courses = JSON.parse(localStorage.getItem("courses"));
      this.course = courses.filter(c => c.id == id)[0];
    },

    syncCourses() {
      if (navigator.onLine == false) {
        alert("You connect to the Internet and try again");
      } else {
        console.log("Sync-ing....");
        window.axios
          .get("pqoffline/data")
          .then(response => {
            const courses = JSON.stringify(response.data.courses);
            localStorage.setItem("courses", courses);
            this.courses = response.data.courses;
            alert("Successfull");
          })
          .catch(error => {
            this.errors = error.response.data.errors;
            alert(error.response.data.message);
          });
      }
    }
  }
};
</script>
