<template>
  <div
    :id="id"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="Question"
    aria-hidden="true"
    data-keyboard="false"
  >
    <!-- data-backdrop="staticc" -->
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title text-center">
            <slot name="title"></slot>
          </h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
          >
            ×
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-white" data-dismiss="modal">
              Close
            </button>
            <!-- <button type="button" class="btn btn-info">Save</button> -->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import
export default {
  props: ["id"]
};
</script>
