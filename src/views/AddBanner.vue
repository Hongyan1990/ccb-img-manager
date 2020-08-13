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
          <el-form ref="numberValidateForm" :model="form">
            <el-form-item prop="bannerNo" label="Banner编号" :label-width="formLabelWidth">
              <el-input v-model="form.bannerNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="versionNo" label="版本号" :label-width="formLabelWidth">
              <el-input v-model="form.versionNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="describe" label="描述" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.describe" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="增加banner" :label-width="formLabelWidth">
              <el-button plain type="primary" @click="addBanner" icon="el-icon-plus">增加banner</el-button>
            </el-form-item>
          </el-form>
          <my-drag :bannerList="banners" @showRoomDialog="showRoomDialog"></my-drag>
        </div>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
        <el-dialog :visible.sync="dialogVisible" :modal="false">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
          bannerNo: '',
          versionNo: '',
          describe: '',
        },
        loading: false,
        formLabelWidth: '120px',
        banners: [],
        dialogImageUrl:'',
        dialogVisible: false
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
        console.log(this.banners)
        done()
      },
      cancelForm() {
        this.$refs['numberValidateForm'].resetFields();
        console.log(this.form)
        this.banners = [];
        this.$emit('closeAddBannerDialog')
      },
      addBanner() {
        this.banners.push({
          id: new Date().getTime(),
          imgNm: '',
          imgPath: '',
          picUrl: '',
          fileList: [],
          imgUrl: '',
          picStayTime: ''
        })
      },
      showRoomDialog(url) {
        this.dialogVisible = true;
        this.dialogImageUrl = url;
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