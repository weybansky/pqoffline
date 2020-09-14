<template>
  <div class="container mt-2">
    <h4>Hello, {{ user ? user.full_name : "" }}</h4>
    <button
      v-if="courses.length"
      class="btn btn-sm btn-dark mb-2"
      @click="syncCourses"
    >
      Sync
    </button>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Course</th>
                <th>Years</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="courses.length">
              <tr v-for="(course, index) in courses" :key="course.id">
                <td>{{ ++index }}</td>
                <td>{{ course.title.toUpperCase() }}</td>
                <td>{{ course.past_exams.length }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-dark"
                    @click="$router.push({ path: '/courses/' + course.id })"
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
                  <button class="btn btn-sm btn-dark" @click="syncCourses">
                    Get Courses
                  </button>
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
  name: "Home",
  data() {
    return {
      user: {},
      courses: []
    };
  },
  mounted() {
    this.getUser();
    this.getCourses();
  },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    getCourses() {
      this.courses = JSON.parse(localStorage.getItem("courses"));
    },
    syncCourses() {
      if (navigator.onLine == false) {
        alert("You connect to the Internet and try again");
      } else {
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
            alert("Cannot Sync at the moment. Please try again");
          });
      }
    }
  }
};
</script>
