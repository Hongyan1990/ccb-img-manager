<template>
  <div style="padding: 20px 0 0 20px;">
    <el-breadcrumb style="padding: 0px 0 15px 0;" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my-btn-wrap">
      <el-button size="small" type="primary" icon="el-icon-plus">新 增</el-button>
      <el-button size="small" type="primary" icon="el-icon-delete" plain>删 除</el-button>
      <el-button size="small" type="primary" icon="el-icon-remove-outline" plain>终 止</el-button>
    </div>
    <div>
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="日期"
            width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div style="line-height: 20px">
              <el-link type="primary">详情</el-link>
              <span class="my-fen">|</span>
              <el-link type="primary">终止</el-link>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="my-footer">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeNew",
    components: {
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        currentPage4: 1
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange() {},
      handleCurrentChange() {},

    }
  }
</script>

<style scoped>
  .my-btn-wrap {
    padding-bottom: 5px;
    border-bottom: 2px solid #437CE6;
  }
  .my-fen {
    font-size: 13px;
    color: #3F3F3F;
    text-align: center;
    line-height: 20px;
    padding: 0 5px;
  }
  .my-footer {
    text-align: center;
    margin-top: 25px;
  }
</style>