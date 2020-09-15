<template>
  <modal id="questionModal">
    <template slot="title"> Question {{ question.number }} </template>
    <template slot="body">
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-success">
            <div class="panel-heading">
              <h5 class="panel-title mb-3">
                {{ question.question }}
              </h5>
            </div>
            <div class="panel-body">
              <div
                v-for="(n, index) in question.no_of_options"
                :key="n"
                :index="index"
                :for="'option_' + n"
                class="label-option"
                :class="{
                  'bg-success text-white':
                    question.answer == question['option_' + n]
                }"
                v-html="question['option_' + n]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-dark btn-sm" data-dismiss="modal">
        Close
      </button>
      <!-- <button type="button" class="btn btn-info">Save</button> -->
    </template>
  </modal>
</template>

<script>
import modal from "@/components/Modal";
export default {
  props: {
    question: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  components: { modal }
};
</script>

<style scoped>
.label-option {
  border: 1px solid #777;
  border-radius: 3px;
  margin-bottom: 5px;
  width: 100%;
  padding: 10px;
}
</style>
