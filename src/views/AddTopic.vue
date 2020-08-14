<template>
  <div>
    <el-drawer
        title="新增专题"
        :before-close="handleClose"
        :visible.sync="dialogVisibal"
        size="70%"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <div style="flex: 1">
          <el-form ref="numberValidateForm" :model="form">
            <el-form-item prop="subjectNo" label="专题编号" :label-width="formLabelWidth">
              <el-input v-model="form.subjectNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="subjectName" label="专题名" :label-width="formLabelWidth">
              <el-select v-model="form.subjectName" placeholder="请选择活动区域">
                <el-option label="资讯类" value="0"></el-option>
                <el-option label="通知类" value="1"></el-option>
                <el-option label="课程类" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="增加文章" :label-width="formLabelWidth">
              <el-button plain type="primary" @click="addBanner" icon="el-icon-plus">增加文章</el-button>
            </el-form-item>
          </el-form>
          <article-drag :topics="topics" @deleteArticle="deleteArticle" @editArticle="editArticle" />
        </div>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
        <el-dialog :title="articleFlag==='1'?'新增文章':'修改文章'"  :visible.sync="dialogVisible" :modal="false">
          <el-form :model="topic" ref="article">
            <el-form-item prop="articleNo" label="文章编号" :label-width="formLabelWidth">
              <el-input v-model="topic.articleNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="articleTitle" label="文章标题" :label-width="formLabelWidth">
              <el-input v-model="topic.articleTitle" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="articleAuthor" label="文章作者" :label-width="formLabelWidth">
              <el-input v-model="topic.articleAuthor" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="publishTime" label="发表时间" :label-width="formLabelWidth">
              <el-date-picker
                  v-model="topic.publishTime"
                  type="datetime"
                  placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="articleAbstract" label="文章摘要" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="topic.articleAbstract " autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="articleUrl" label="原文链接" :label-width="formLabelWidth">
              <el-input v-model="topic.articleUrl" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeArticle">取 消</el-button>
            <el-button type="primary" @click="addArticle">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import moment from 'moment'
  import ArticleDrag from './ArticleDrag.vue'
  export default {
    name: "AddTopic",
    components: {
      ArticleDrag
    },
    props: {
      dialog: {
        type: Boolean,
        default: false
      },
      topicData: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        form: {
          subjectNo: '',
          subjectName: ''
        },
        topic: {
          articleNo: '',
          articleTitle: '',
          articleAuthor: '',
          publishTime: '',
          articleAbstract: '',
          articleUrl: ''
        },
        loading: false,
        formLabelWidth: '120px',
        topics: [],
        dialogImageUrl:'',
        dialogVisible: false,
        articleFlag: '1',
        articleIndex: 0
      }
    },
    computed: {
      dialogVisibal: {
        get () {
          return this.dialog
        },
        set () {
          this.form = {};
          this.$refs['numberValidateForm'].resetFields();
          this.topics = [];
          this.$emit('closeAddTopicDialog')
        }
      }
    },
    watch: {
      'topicData': 'handleTopicData'
    },
    methods: {
      handleClose(done) {
        this.form = {};
        this.$refs['numberValidateForm'].resetFields();
        this.topics = [];
        done()
      },
      cancelForm() {
        this.form = {};
        this.topics = [];
        this.$refs['numberValidateForm'].resetFields();

        this.$emit('closeAddTopicDialog')
      },
      addBanner() {
        this.dialogVisible = true;
        this.articleFlag = '1';
      },
      showRoomDialog(url) {
        this.dialogVisible = true;
        this.dialogImageUrl = url;
      },
      addArticle() {
        if(this.articleFlag === '1') {
          this.topics.push({...this.topic, publishTime: moment(this.topic.publishTime).format('YYYY-MM-DD HH:mm:ss')})
        } else {
          this.topics.splice(this.articleIndex, 1, {...this.topic, publishTime: moment(this.topic.publishTime).format('YYYY-MM-DD HH:mm:ss')})
        }
        this.$refs['article'].resetFields();
        this.dialogVisible = false;

      },
      closeArticle() {
        this.$refs['article'].resetFields();
        this.dialogVisible = false;
      },
      editArticle(article, i) {
        this.articleIndex = i;
        this.articleFlag = '2';
        this.topic = {...article, publishTime: moment(article.publishTime)};
        this.dialogVisible = true;
      },
      deleteArticle(i) {
        this.topics.splice(i, 1);
      },
      handleTopicData() {
        const {subjectNo, subjectName, articleGrid} = this.topicData;
        this.form = {subjectNo, subjectName};
        this.topics = articleGrid;
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
  .item-single {
    display: inline-block;
    max-width: 100px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .my-icon {
    cursor: pointer;
  }
  .my-articls {
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>