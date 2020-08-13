<template>
  <div>
    <el-drawer
        title="新增专题"
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
            <el-form-item prop="bannerNo" label="专题编号" :label-width="formLabelWidth">
              <el-input v-model="form.subjectNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="versionNo" label="专题名" :label-width="formLabelWidth">
              <el-select v-model="form.subjectName" placeholder="请选择活动区域">
                <el-option label="资讯类" value="0"></el-option>
                <el-option label="通知类" value="1"></el-option>
                <el-option label="课程类" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="增加banner" :label-width="formLabelWidth">
              <el-button plain type="primary" @click="addBanner" icon="el-icon-plus">增加banner</el-button>
            </el-form-item>
          </el-form>
          <div class="my-articls">
            <el-row :gutter="10" style="font-weight: bold; color: #72767b;">
              <el-col :span="3">文章编号</el-col>
              <el-col :span="3">文章标题</el-col>
              <el-col :span="3">文章作者</el-col>
              <el-col :span="3">发表时间</el-col>
              <el-col :span="5">文章摘要</el-col>
              <el-col :span="4">原文链接</el-col>
              <el-col :span="3">操作</el-col>
            </el-row>
            <el-row :gutter="10" style="color: #72767b;line-height: 30px;" v-for="(item, i) in topics" :key="item.articleNo">
              <el-tooltip class="item" effect="dark" :content="item.articleNo||'文章编号'" placement="top-start">
                <el-col :span="3">
                  <span class="item-single">{{item.articleNo}}</span>
                </el-col>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="item.articleTitle||'文章标题'" placement="top-start">
                <el-col :span="3">
                  <span class="item-single">{{item.articleTitle}}</span>
                </el-col>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="item.articleAuthor||'文章作者'" placement="top-start">
                <el-col :span="3">
                  <span class="item-single">{{item.articleAuthor}}</span>
                </el-col>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="item.publishTime||'发表时间'" placement="top-start">
                <el-col :span="3">
                  <span class="item-single">{{item.publishTime}}</span>
                </el-col>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="item.articleAbstract||'文章摘要'" placement="top-start">
                <el-col :span="5">
                  <span class="item-single">{{item.articleAbstract}}</span>
                </el-col>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="item.articleUrl||'原文链接'" placement="top-start">
                <el-col :span="4">
                  <span class="item-single">{{item.articleUrl}}</span>
                </el-col>
              </el-tooltip>
              <el-col :span="3">
                <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                  <i class="el-icon-edit my-icon" @click="editArticle(item, i)" style="margin-right: 10px;"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                  <i class="el-icon-delete my-icon" @click="deleteArticle(i)"></i>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
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
  export default {
    name: "AddTopic",
    components: {
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
          this.$emit('closeAddTopicDialog')
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

        this.dialogVisible = false;
        this.$refs['article'].resetFields();
      },
      closeArticle() {
        this.dialogVisible = false;
        this.$refs['article'].resetFields();
      },
      editArticle(article, i) {
        this.articleIndex = i;
        this.articleFlag = '2';
        this.topic = {...article, publishTime: moment(article.publishTime)};
        this.dialogVisible = true;
      },
      deleteArticle(i) {
        this.topics.splice(i, 1);
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