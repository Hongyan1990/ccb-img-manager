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
              <el-row :gutter="10" v-for="item in props.row.picGrid" :key="item.picName" style="line-height: 35px;">
                <el-tooltip class="item" effect="dark" :content="item.picName||'图片名称'" placement="top-start">
                  <el-col :span="4">
                    <span class="item-single">{{item.picName}}</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.picName||'跳转链接'" placement="top-start">
                  <el-col :span="4">
                    <span class="item-single">{{item.picUrl}}</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.picName||'登录类型'" placement="top-start">
                  <el-col :span="4">
                    <span class="item-single">{{item.loginType}}</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.picName||'轮播时间'" placement="top-start">
                  <el-col :span="4">
                    <span class="item-single">{{item.picStayTime}}s</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.picName||'登录类型'" placement="top-start">
                  <el-col :span="4">
                    <span class="item-single">{{item.loginType}}</span>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="item.picName||'轮播时间'" placement="top-start">
                  <el-col :span="4">
                    <span class="item-single">{{item.picStayTime}}s</span>
                  </el-col>
                </el-tooltip>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            label="专题编号"
            prop="id">
        </el-table-column>
        <el-table-column
            label="专题名"
            prop="name">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary" plain>修改</el-button>
            <el-button
                size="mini"
                type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-topic :dialog="showDialog" @closeAddTopicDialog="closeAddTopicDialog" />
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
        tableData: [
          {
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            picGrid: [
              {
                picName: 'test.png',
                picUrl: '127.0.0.1/dshgfdhbvhfdbjhfhfjhfnbfgbnfjbnknfkjbnjfdnb98hg9fdbui',
                loginType: '0',
                picStayTime: '5'
              },
              {
                picName: 'test.png',
                picUrl: '127.0.0.1/dshgfdhbvhfdbjhfhfjhfnbfgbnfjbnknfkjbnjfdnb98hg9fdbui',
                loginType: '0',
                picStayTime: '5'
              }
            ]
          }
        ],
        showDialog: false
      }
    },
    methods: {
      closeAddTopicDialog() {
        this.showDialog = false;
      }
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
    display: inline-block;
    max-width: 200px;
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