<template>
  <div>
    <el-dialog  :close-on-click-modal="false" :title="acitveData?'修改活动':'新增活动'" :visible.sync="dialogVisibale">
      <el-form  label-width="120px"  :model="addImgForm" ref="addImgForm" :rules="rules" size="mini">
        <el-form-item label="启动页编号" prop="startNo">
          <el-input v-model="addImgForm.startNo" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="versionNo">
          <el-input v-model="addImgForm.versionNo" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="活动地址" prop="activityAddre">
          <el-select v-model="addImgForm.activityAddre " placeholder="请选择推送地址" style="width: 80%">
            <el-option label="区域一" value="hhh"></el-option>
            <el-option label="区域二" value="xxx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示时长" prop="showDuration" >
          <el-input v-model="addImgForm.showDuration" style="width: 80%;"></el-input>
        </el-form-item>

        <el-form-item label="登录类型" prop="loginType">
          <el-select v-model="addImgForm.loginType " placeholder="请选登录类型" style="width: 80%">
            <el-option label="不登录" value="0"></el-option>
            <el-option label="密码登录" value="1"></el-option>
            <el-option label="token登录" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效时间" prop="takeEffectTime">
          <el-date-picker
              v-model="addImgForm.takeEffectTime"
              type="datetime"
              :picker-options="pickerStartOptions"
              placeholder="选择生效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效时间" prop="loseEfficacyTime">
          <el-date-picker
              v-model="addImgForm.loseEfficacyTime"
              type="datetime"
              :picker-options="pickerEndOptions"
              placeholder="选择失效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="推送图片" prop="picName">
          <el-upload
              class="upload-demo"
              action="other"
              :auto-upload="false"
              :on-preview="handlePreview"
              :limit="1"
              accept=".png,.jpg"
              :on-exceed="handleExceed"
              :file-list="fileList">
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="链接" prop="picUrl" >
          <el-input v-model="addImgForm.picUrl" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe" >
          <el-input type="textarea" v-model="addImgForm.describe" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddMenuDialog">取 消</el-button>
        <el-button type="primary" @click="saveImgInfo" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AddImg",
    props: {
      isShowDialog: {
        type: Boolean,
        default: false
      },
      acitveData: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        addImgForm: {
          startNo: '',
          versionNo: '',
          activityAddre: '',
          showDuration: '',
          picUrl: '',
          describe: '',
          loginType: '',
          takeEffectTime: '',
          loseEfficacyTime: '',
          picName: ''
        },
        rules: {
          startNo: {required: true, message: '启动页编号必填', trigger: 'change'},
          versionNo: {required: true, message: '版本号必填', trigger: 'change'},
          activityAddre: {required: true, message: '活动地址必填', trigger: 'change'},
          showDuration: {required: true, message: '显示时长', trigger: 'change'},
          loginType: {required: true, message: '推送地址必填', trigger: 'change'},
          takeEffectTime: {required: true, message: '生效时间必填', trigger: 'change'},
          loseEfficacyTime: {required: true, message: '生效时间必填', trigger: 'change'},
          picName: {required: true, message: '必须上传图片', trigger: 'change'}
        },
        fileList: [],
        pickerStartOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        pickerEndOptions: {
          disabledDate: (time) => {
            return time.getTime() < this.addImgForm.takeEffectTime
          }
        }
      }
    },
    computed: {
      dialogVisibale: {
        get () {
          return this.isShowDialog
        },
        set () {
          this.$emit('closeCreateMenuDialog')
        }
      },
    },
    watch: {
      'acitveData': 'handleActiveDataChange'
    },
    methods: {
      handlePreview() {},
      handleExceed() {},
      closeAddMenuDialog () {
        this.$refs.addImgForm.resetFields();
        this.$emit('closeCreateMenuDialog')
      },
      saveImgInfo() {
        this.$refs.addImgForm.validate((valid) => {
          if (valid) {
            console.log(this.fileList)
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleActiveDataChange() {
        console.log(this.acitveData);
        this.addImgForm = {...this.acitveData}
        this.fileList.push({name: this.acitveData.picName})
      }
    }
  }
</script>

<style scoped>

</style>