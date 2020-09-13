<template>
  <div class="container mt-2">
    <h3>
      {{ exam.year || "??" }} --
      {{ course.title || "??" }}
    </h3>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th width="10">S/N</th>
                <th>Number</th>
                <th>Question</th>
                <th>Topic</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="exam">
              <tr
                v-for="(question, index) in exam.questions"
                :key="question.id"
              >
                <td>{{ ++index }}</td>
                <td>{{ question.number }}</td>
                <td>{{ question.question }}</td>
                <td>{{ question.topic.title }}</td>
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
  name: "Exam",
  data() {
    return {
      user: {},
      course: {},
      exam: {}
    };
  },

  beforeRouteUpdate(to, from, next) {
    const id = to.params.course;
    const examId = to.params.exam;
    this.getCourse(id, examId);
    next();
  },

  mounted() {
    this.getUser();
    const id = this.$route.params.course;
    const examId = this.$route.params.exam;
    this.getCourse(id, examId);
  },

  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },

    getCourse(id, examId) {
      const courses = JSON.parse(localStorage.getItem("courses"));
      this.course = courses.filter(c => c.id == id)[0];
      this.exam = this.getExam(examId);
    },

    getExam(id) {
      return this.course.past_exams.filter(e => e.id == id)[0];
    }
  }
};
</script>
