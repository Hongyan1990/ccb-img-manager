<template>
  <div>
    <el-dialog  :close-on-click-modal="false" title="新增活动" :visible.sync="dialogVisibale">
      <el-form  label-width="90px"  :model="addImgForm" ref="addImgForm" >
        <el-form-item label="活动名称" prop="name" :rules="{required: true, message: '活动名称必填', trigger: 'change'}">
          <el-input v-model="addImgForm.name" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="推送范围" prop="region" :rules="{required: true, message: '推送范围必填', trigger: 'change'}">
          <el-input v-model="addImgForm.region" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="推送地址" prop="addr" :rules="{required: true, message: '推送地址必填', trigger: 'change'}">
          <el-select v-model="addImgForm.addr" placeholder="请选择推送地址" style="width: 80%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" prop="dateRange" :rules="{required: true, message: '活动时间必填', trigger: 'change'}">
          <el-date-picker
              v-model="addImgForm.dateRange"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="推送图片" prop="picNm" :rules="{required: true, message: '必须上传图片', trigger: 'change'}">
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
    },
    data() {
      return {
        addImgForm: {
          name: '',
          region: '',
          addr: '',
          dateRange: '',
          picNm: ''
        },
        fileList: [],
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
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>