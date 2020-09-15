<template>
  <div>
    <p>
      <button
        class="btn btn-dark"
        type="button"
        data-toggle="collapse"
        data-target="#add-new-question"
        aria-expanded="false"
        aria-controls="add-new-question"
      >
        Add New Question
      </button>
    </p>
    <div class="collapse" id="add-new-question">
      <div class="card card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="form">
              <form
                class="cmxform form-horizontal tasi-form"
                enctype="multipart/form-data"
                @submit.prevent="addNewQuestion"
                @keydown="errors[$event.target.name] = []"
              >
                <div class="form-group">
                  <label for="number" class="control-label col-lg-2"
                    >Number:</label
                  >
                  <div class="col-lg-10">
                    <input
                      type="text"
                      name="number"
                      class="form-control"
                      :placeholder="
                        questions.length + 1 + offlineQuestions.length
                      "
                      aria-required="true"
                      required
                      v-model="question.number"
                    />
                    <label class="error" for="number" v-if="errors.number">{{
                      errors.number[0]
                    }}</label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="topic_id" class="control-label col-lg-2"
                    >Topic:</label
                  >
                  <div class="col-lg-10">
                    <select
                      name="topic_id"
                      class="form-control"
                      aria-required="true"
                      required
                      v-model="question.topic_id"
                    >
                      <option disabled>Select Topic</option>
                      <option
                        v-for="topic in topics"
                        :key="topic.id"
                        :value="topic.id"
                        >{{ topic.title }}</option
                      >
                    </select>
                    <label
                      class="error"
                      for="topic_id"
                      v-if="errors.topic_id"
                      >{{ errors.topic_id[0] }}</label
                    >
                  </div>
                </div>
                <div class="form-group">
                  <label for="image" class="control-label col-lg-2"
                    >Image:</label
                  >
                  <div class="col-lg-10">
                    <small class="text-danger">
                      *All images should be uploaded seperately online"
                    </small>
                  </div>
                </div>
                <div class="form-group">
                  <label for="question" class="control-label col-lg-2"
                    >Question:</label
                  >
                  <div class="col-lg-10">
                    <textarea
                      type="text"
                      name="question"
                      class="form-control"
                      placeholder="Type the question here"
                      aria-required="true"
                      required
                      rows="3"
                      v-model="question.question"
                    ></textarea>
                    <label
                      class="error"
                      for="question"
                      v-if="errors.question"
                      >{{ errors.question[0] }}</label
                    >
                  </div>
                </div>
                <div
                  v-if="
                    question.no_of_options > 0 && question.type == 'objective'
                  "
                >
                  <div
                    class="form-group"
                    v-for="n in question.no_of_options"
                    :key="n"
                  >
                    <label :for="'option_' + n" class="control-label col-lg-2">
                      Option {{ n }}:
                      <span class="text-success">{{
                        question.answer == question["option_" + n] &&
                        question.answer != null
                          ? "Answer"
                          : ""
                      }}</span>
                    </label>
                    <div class="col-lg-10">
                      <input
                        type="text"
                        :name="'option_' + n"
                        class="form-control"
                        aria-required="true"
                        required
                        v-model="question['option_' + n]"
                      />
                      <label
                        class="error"
                        :for="'option_' + n"
                        v-if="errors['option_' + n]"
                        >{{ errors["option_" + n][0] }}</label
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="answer" class="control-label col-lg-2"
                    >Answer:</label
                  >
                  <div class="col-lg-10">
                    <select
                      v-if="
                        question.no_of_options > 0 &&
                          question.type == 'objective'
                      "
                      name="topic_id"
                      class="form-control"
                      aria-required="true"
                      required
                      v-model="question.answer"
                    >
                      <option selected value>Select Answer</option>
                      <option
                        v-for="n in question.no_of_options"
                        :key="n"
                        :value="question['option_' + n]"
                        >Option {{ n }}</option
                      >
                    </select>
                    <input
                      v-else
                      type="text"
                      name="answer"
                      class="form-control"
                      aria-required="true"
                      required
                      v-model="question.answer"
                    />
                    <label class="error" for="answer" v-if="errors.answer">{{
                      errors.answer[0]
                    }}</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-lg-offset-2 col-lg-10">
                    <button class="btn btn-dark form-control" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    exam: {
      type: Object,
      required: true
      // default: () => {
      //   return {
      //     questions: []
      //   };
      // }
    },
    topics: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    },
    offlineQuestions: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    questions() {
      return this.exam.questions;
    }
  },
  watch: {
    "exam.id": function(id) {
      // somehow, declaring it in data didn't work
      this.question.exam_id = id;
    }
  },
  data() {
    return {
      question: {
        exam_id: this.exam.id,
        type: "objective",
        no_of_options: 4
      },
      errors: []
    };
  },
  methods: {
    addNewQuestion() {
      if (localStorage.getItem("questions") == null) {
        localStorage.setItem("questions", JSON.stringify([]));
      }
      let store = localStorage.getItem("questions");
      store = JSON.parse(store);
      store.push(this.question);
      localStorage.setItem("questions", JSON.stringify(store));
      this.question = {
        exam_id: this.exam.id,
        course_id: this.exam.course_id,
        type: "objective",
        no_of_options: 4
      };
      this.$emit("added");
    }
  }
};
</script>

<style scoped>
.form-control:focus {
  border-color: black;
  box-shadow: 0 0 0 0.2rem rgba(22, 23, 24, 0.25);
}
</style>
