<template>
  <div class="container mt-2">
    <h3>
      {{ exam.year || "??" }} --
      {{ course.title || "??" }}
    </h3>
    <div>
      <question-form
        :exam="exam"
        :offlineQuestions="offlineQuestions"
        :topics="course.topics"
        @added="questionAdded"
      ></question-form>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="text-center" colspan="5">Saved Offline</th>
              </tr>
              <tr>
                <th>S/N</th>
                <th>Number</th>
                <th>Question</th>
                <th>Topic</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="offlineQuestions.length > 0">
              <tr v-for="(question, index) in offlineQuestions" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ question.number }}</td>
                <td>{{ question.question }}</td>
                <td>{{ question.topic ? question.topic.title : "" }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-dark"
                    @click="selectedQuestion = question"
                    data-toggle="modal"
                    data-target="#questionModal"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td class="text-center" colspan="5">
                  You have no saved offline questions. <br />
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
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="text-center" colspan="5">Saved Online</th>
              </tr>
              <tr>
                <th>S/N</th>
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
                    @click="selectedQuestion = question"
                    data-toggle="modal"
                    data-target="#questionModal"
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
    <question :question="selectedQuestion"></question>
  </div>
</template>

<script>
import question from "@/components/Question";
import questionForm from "@/components/QuestionForm";

export default {
  name: "Exam",
  components: {
    question,
    "question-form": questionForm
  },
  data() {
    return {
      user: {},
      course: {
        topics: []
      },
      exam: {
        questions: []
      },
      selectedQuestion: {
        no_of_options: 4,
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: ""
      }
    };
  },
  computed: {
    offlineQuestions() {
      let store = localStorage.getItem("questions");
      if (store == null) {
        return [];
      } else {
        store = JSON.parse(store);
        store = store.filter(s => s.exam_id == this.exam.id);
        const topics = this.course.topics;
        store.map(que => {
          que.topic = topics.filter(t => t.id == que.topic_id)[0];
          return que;
        });
        return store;
      }
    }
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

    questionAdded() {
      const id = this.$route.params.course;
      const examId = this.$route.params.exam;
      this.getCourse(id, examId);
      this.exam = this.getExam(examId);
      alert("Question Added");
    },

    getExam(id) {
      return this.course.past_exams.filter(e => e.id == id)[0];
    }
  }
};
</script>
