<template>
  <div class="content">
<!--    <div class="search">-->
<!--      <el-row>-->
<!--        <el-col :span="4">-->
<!--          <el-button-->
<!--              type="primary"-->
<!--              icon="el-icon-plus"-->
<!--              @click="dialogFormVisible=true"-->
<!--              size="small">新增活动</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-table-->
<!--          :data="tableData"-->
<!--          v-loading="loading"-->
<!--          max-height="500px"-->
<!--          stripe-->
<!--          style="width: 100%">-->
<!--        <template slot="empty">-->
<!--          <img :src="urlImg" style="width: 200px; margin-top: 20px;"/>-->
<!--          <p style="margin: 0; line-height: 30px">暂无数据</p>-->
<!--        </template>-->
<!--        <el-table-column type="expand">-->
<!--          <template slot-scope="props">-->
<!--            <el-form label-position="left" inline class="demo-table-expand">-->
<!--              <el-form-item label="链接">-->
<!--                <span>{{ props.row.picUrl }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="活动地址">-->
<!--                <span>{{ props.row.activityAddre }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="生效时间">-->
<!--                <span>{{ props.row.takeEffectTime }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="失效时间">-->
<!--                <span>{{ props.row.loseEfficacyTime }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="描述">-->
<!--                <span>{{ props.row.describe }}</span>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="启动页编号">-->
<!--          <template slot-scope="scope">-->
<!--            <span style="margin-left: 10px">{{ scope.row.startNo }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="版本号">-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{scope.row.versionNo}}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="图片名称">-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{scope.row.picName}}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="登录类型">-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{loginTypeMap[scope.row.loginType]||''}}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="显示时长">-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{scope.row.showDuration}} s</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作" width="150">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--                size="mini"-->
<!--                type="primary" plain @click="editActive(scope)">修改</el-button>-->
<!--            <el-button-->
<!--                size="mini"-->
<!--                type="danger" plain>删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--      <div class="page">-->
<!--        <el-pagination-->
<!--            small-->
<!--            layout="prev, pager, next"-->
<!--            @current-change="changePage"-->
<!--            :page-count="count">-->
<!--        </el-pagination>-->
<!--      </div>-->
<!--    </div>-->
<!--    <add-img-->
<!--        :isShowDialog="dialogFormVisible"-->
<!--        :acitveData="acitveData"-->
<!--        @closeCreateMenuDialog="closeCreateMenuDialog"-->
<!--    />-->
  </div>
</template>

<script>
  import urlImg from '../static/no-data2.png'
  import AddImg from './AddImg.vue'
  export default {
    name: 'home',
    props: {},
    components: {
      AddImg
    },
    data () {
      return {
        urlImg,
        tableData: [],
        loading: false,
        dialogFormVisible: false,
        count: 0,
        acitveData: {},
        loginTypeMap: {
          '0': '不登录',
          '1': '密码登录',
          '2': 'token登录'
        }
      }
    },
    computed: {},
    methods: {
      closeCreateMenuDialog() {
        this.dialogFormVisible = false
      },
      changePage() {},
      editActive(rowData) {
        console.log(rowData)
        this.dialogFormVisible = true;
        this.acitveData = {...rowData.row}
      }
    },
    mounted() {
      this.tableData = [
        {
          startNo: '01',
          versionNo: '1.0.0',
          describe: '这是一条测试数据',
          picName: 'test.png',
          picUrl: 'http://127.0.0.1:8000/test',
          loginType: '0',
          showDuration: '10',
          takeEffectTime: '2020-08-13 17:07:00',
          loseEfficacyTime: '2020-08-14 17:07:00',
          activityAddre: '0'
        }
      ]
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
</style>