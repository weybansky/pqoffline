<template>
  <div class="container mt-2">
    <h4>{{ course.title ? course.title.toUpperCase() : "" }}</h4>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Year</th>
                <th>Questions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="course.past_exams.length">
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
      course: {
        past_exams: []
      }
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
    }
  }
};
</script>
