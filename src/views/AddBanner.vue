<template>
  <div>
    <el-drawer
        title="新增banner"
        :before-close="handleClose"
        :visible.sync="dialogVisibal"
        size="60%"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <div style="flex: 1">
          <el-form :model="form">
            <el-form-item label="购买数量" :label-width="formLabelWidth">
              <el-input v-model="form.count" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="增加banner" :label-width="formLabelWidth">
              <el-button type="primary" @click="addBanner">增加banner</el-button>
            </el-form-item>
          </el-form>
          <my-drag :bannerList="banners"></my-drag>
        </div>

        <p style="color: red; font-size: 12px;">提示： 2小时内可以撤销订单</p>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import MyDrag from "./MyDrag.vue";
  export default {
    name: "AddBanner",
    components: {
      MyDrag
    },
    props: {
      dialog: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {
          count: '',
          region: '',
          desc: '',
          num: ''
        },
        loading: false,
        formLabelWidth: '120px',
        banners: []
      }
    },
    computed: {
      dialogVisibal: {
        get () {
          return this.dialog
        },
        set () {
          this.$emit('closeAddBannerDialog')
        }
      }
    },
    methods: {
      handleClose(done) {
        done()
      },
      cancelForm() {
        this.$emit('closeAddBannerDialog')
      },
      addBanner() {
        this.banners.push({
          id: new Date().getTime(),
          imgNm: '',
          imgPath: '',
          link: '',
          fileList: []
        })
      }
    }
  }
</script>

<style scoped>
  .el-drawer__body {
    padding: 20px;
  }
  .demo-drawer__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
  }
  .demo-drawer__content form {
    /*flex: 1;*/
  }
  .demo-drawer__footer {
    display: flex;
    padding: 20px;
  }
  .demo-drawer__footer button {
    flex: 1;
  }
</style>