<template>
  <div>
    <el-container>
      <el-main style="background: #fff;border-radius: 5px;padding: 0px;margin-right: 50px;">
        <div class="my-title">
          <span>新建投放</span>
          <el-button round size="mini" icon="el-icon-d-arrow-left" @click="goBack">返回</el-button>
        </div>
        <div style="padding: 20px 4%;">
          <el-form :model="activityData" ref="addImgForm" :rules="rules">
            <el-form-item prop="activityName" label="活动名称：" :label-width="formLabelWidth">
              <el-input v-model="activityData.activityName" autocomplete="off" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item v-if="menuId==='5'" prop="emViewTitle" label="要览标题：" :label-width="formLabelWidth">
              <el-input v-model="activityData.emViewTitle" autocomplete="off"  style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item v-if="menuId==='5'" prop="emViewContent" label="要览内容：" :label-width="formLabelWidth">
              <el-input v-model="activityData.emViewContent" autocomplete="off"  style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item label="广告位：" :label-width="formLabelWidth">
              <el-breadcrumb style="line-height: unset;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item, i) in menus" :key="i" >{{item}}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-form-item>
            <el-form-item prop="startTime" label="投放时间：" :label-width="formLabelWidth">
              <el-date-picker
                  v-model="activityData.startTime"
                  type="datetime"
                  :picker-options="pickerStartOptions"
                  placeholder="选择生效时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="menuId!=='5'" prop="endTime" label="到期时间：" :label-width="formLabelWidth">
              <el-date-picker
                  v-model="activityData.endTime"
                  type="datetime"
                  :picker-options="pickerEndOptions"
                  placeholder="选择失效时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="menuId==='1'" prop="waitTime" label="持续时间：" :label-width="formLabelWidth">
              <el-input-number style="width: 140px;" v-model="activityData.waitTime" :min="1" :max="60" ></el-input-number>
            </el-form-item>
            <el-form-item  v-if="menuId!=='5'" label="展示图片：" prop="picName" :label-width="formLabelWidth">
              <el-upload
                  class="upload-demo"
                  action="other"
                  :auto-upload="false"
                  :before-upload="beforeAvatarUpload"
                  :limit="1"
                  accept=".png,.jpg"
                  :on-change="handleChange"
                  :file-list="fileList">
                <el-button size="small" plain type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
              </el-upload>
            </el-form-item>

            <el-form-item prop="recmCotent" label="推送内容(URL)：" :label-width="formLabelWidth">
              <el-input v-model="activityData.recmCotent" autocomplete="off"  style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item prop="remark" label="备注：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="activityData.remark" autocomplete="off"  style="width: 50%;"></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button type="primary" @click="addArticle">确 定</el-button>
            <el-button @click="closeArticle">取 消</el-button>
          </div>
        </div>

      </el-main>
      <el-aside width="260px" style="padding: 20px;background: #fff;border-radius: 5px;">
        <p class="my-tip">温馨提示</p>
      </el-aside>
    </el-container>

  </div>
</template>

<script>
  import {handleMenuText, getMenuId} from '../util/util.js'
  export default {
    name: "AddImgNew",
    data() {
      return {
        activityData: {
          activityName: '',
          adPosition: '',
          startTime: null,
          endTime: null,
          waitTime: '',
          picPath: '',
          picName: '',
          recmCotent: '',
          creator: '',
          state: '',
          emViewTitle: '',
          emViewContent: '',
          remark: ''
        },
        rules: {
          activityName: {required: true, message: '活动名称必填', trigger: 'change'},
          startTime: {required: true, message: '投放时间必填', trigger: 'change'},
          endTime: {required: this.menuId!=='5', message: '到期时间必填', trigger: 'change'},
          waitTime: {required: this.menuId==='1', message: '到期时间必填', trigger: 'change'},
          picName: {required: this.menuId!=='5', message: '图片必填'},
          emViewTitle: {required: this.menuId==='5', message: '要览标题必填', trigger: 'change'},
          emViewContent: {required: this.menuId==='5', message: '要览内容必填', trigger: 'change'},
        },
        formLabelWidth: '120px',
        fileList: [],
        pickerStartOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerEndOptions: {
          disabledDate: (time) => {
            if(this.activityData.startTime) {
              return time.getTime() < this.activityData.startTime
            } else {
              return time.getTime() < Date.now() - 8.64e7
            }
          }
        },
        menuId: '',
        menus: [],
        localHeight: ''
      }
    },
    computed: {
    },
    watch: {
      $route() {
        this.menuId = this.$route.params.id;
      },
      menuId() {
        this.menus = handleMenuText(this.menuId);
      }
    },
    methods: {
      addArticle() {
        this.$refs.addImgForm.validate((valid) => {
          if (valid) {
            console.log(this.activityData)
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeArticle() {

      },
      beforeAvatarUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message({
            message: "上传文件大小不能超过 10MB!",
            type: "error"
          });
          return false;
        }
        return isLt10M;
      },
      handleChange(file) {
        const fileTemp = file ? file.name.split('.') : [];
        const extName = fileTemp[fileTemp.length-1];
        this.activityData.picName = file? this.$store.state.userid + new Date().getTime() + '.' + extName: '';
        this.$refs['addImgForm'].validateField('picName')
      },
      goBack() {
        this.$router.push({path: `/app/home/${this.menuId}`})
      }
    },
    mounted() {
      this.menuId = this.$route.params.id;
      this.menus = handleMenuText(this.menuId);
      this.activityData.adPosition = getMenuId(this.menuId);
    }
  }
</script>

<style scoped>
  .my-tip {
    color: #555;
    padding: 15px 0px;
    border-bottom: 1px solid #ccc;
    font-weight: 700;
  }
  .my-title {
    padding: 15px;
    background: rgb(242, 242, 242);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>