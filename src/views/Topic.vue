<template>
  <div class="content">
    <div class="search">
      <el-row>
        <el-col :span="4">
          <el-button
              type="primary"
              icon="el-icon-plus"
              @click="showDialog=true"
              size="small">新增专题</el-button>
        </el-col>
      </el-row>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div>
              <el-row :gutter="10" style="font-weight: bold;">
                <el-col :span="4">文章编号</el-col>
                <el-col :span="4">文章标题</el-col>
                <el-col :span="4">文章作者</el-col>
                <el-col :span="4">发表时间</el-col>
                <el-col :span="4">文章摘要</el-col>
                <el-col :span="4">原文链接</el-col>
              </el-row>
              <el-row :gutter="10" v-for="item in props.row.articleGrid" :key="item.picName" style="line-height: 35px;">
                <el-tooltip class="item" effect="dark" :content="item.articleNo" placement="top-start">
                  <el-col :span="4" class="item-single">
                    <span>{{item.articleNo}}</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.articleTitle" placement="top-start">
                  <el-col :span="4" class="item-single">
                    <span>{{item.articleTitle}}</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.articleAuthor" placement="top-start">
                  <el-col :span="4" class="item-single">
                    <span>{{item.articleAuthor}}</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.publishTime" placement="top-start">
                  <el-col :span="4" class="item-single">
                    <span>{{item.publishTime}}s</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.articleAbstract" placement="top-start">
                  <el-col :span="4" class="item-single">
                    <span>{{item.articleAbstract}}</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.articleUrl" placement="top-start">
                  <el-col :span="4" class="item-single">
                    <span>{{item.articleUrl}}s</span>
                  </el-col>
                </el-tooltip>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            label="专题编号"
            prop="subjectNo">
        </el-table-column>
        <el-table-column
            label="专题名"
            prop="subjectName">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary" plain @click="editTopic(scope)">修改</el-button>
            <el-button
                size="mini"
                type="danger" plain @click="deleteTopic(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-topic :dialog="showDialog" :topicData="topicData" @closeAddTopicDialog="closeAddTopicDialog" />
  </div>
</template>

<script>
  import AddTopic from "./AddTopic.vue";
  export default {
    name: "Topic",
    components: {
      AddTopic
    },
    data() {
      return {
        tableData: [],
        showDialog: false,
        topicData: {}
      }
    },
    methods: {
      closeAddTopicDialog() {
        this.showDialog = false;
      },
      editTopic (rowData) {
        this.showDialog = true;
        this.topicData = {...rowData.row};
      },
      deleteTopic (rowData) {

      }
    },
    mounted() {
      this.tableData.push({
        subjectNo: '12987122',
        subjectName: '好滋好味鸡蛋仔',
        articleGrid: [
          {
            articleNo: 'test.png',
            articleTitle: '127.0.0.1/dshgfdhbvhfdbjhfhfjhfnbfgbnfjbnknfkjbnjfdnb98hg9fdbui',
            articleAuthor: '0',
            publishTime: '5',
            articleAbstract: '',
            articleUrl: ''
          },
          {
            articleNo: 'test.png',
            articleTitle: '127.0.0.1/dshgfdhbvhfdbjhfhfjhfnbfgbnfjbnknfkjbnjfdnb98hg9fdbui',
            articleAuthor: '0',
            publishTime: '5',
            articleAbstract: '',
            articleUrl: ''
          }
        ]
      })
    }
  }
</script>

<style scoped>
  .content {
    margin-top: 20px;
  }
  .search {
    padding: 20px 10px;
    background-color: #fff;
    overflow: hidden;
  }
  .el-row {
    margin: 20px 0;
  }
  .search .page {
    margin-top: 15px;
    text-align: right;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .item-single {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .item-single-title {
    font-weight: bold;
    color: #555555;
    display: inline-block;
    width: 200px;
  }
</style>