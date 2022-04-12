<template>
  <el-dialog
    :title="title"
    :visible.sync="DialogVisible"
    @close="cancel"
    center
    width="30%"
    :modal-append-to-body="false"
    close-on-press-escape
  >
    <span>{{ content }}</span>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="mini">取 消</el-button>
      <el-button type="danger" @click="yes" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>
<!-- 将需要调用的方法以字符串的形式传值可实现方法的动态绑定 -->
<script>
export default {
  name: "my-dialog",
  data() {
    return {
      form: {},
    };
  },
  props: {
    DialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  methods: {
    yes() {
      this.$emit("yes", this.form);
      this.$emit("update:DialogVisible", false);
    },
    cancel() {
      this.$emit("update:DialogVisible", false);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
