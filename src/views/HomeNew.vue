<template>
  <div style="padding: 20px 0 0 20px;">
    <el-breadcrumb style="padding: 0px 0 25px 0; font-weight: bold;" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-weight: bold; color: #000000;" v-for="(item, i) in menus" :key="i" >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my-btn-wrap">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addImg">新 增</el-button>
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
            prop="title"
            label="标题">
        </el-table-column>
        <el-table-column
            label="投放时间"
        >
          <template slot="header" slot-scope="scope">
            <span
                @click="emitDatePicker"
                style="position: absolute; top: 50%; margin-top: -16.8px;"
            >
              投放时间 <span class="el-table__column-filter-trigger"><i class="el-icon-arrow-down"></i></span>
            </span>
            <el-date-picker
                v-model="selectDate"
                ref="datePicker"
                type="datetimerange"
                style="visibility: hidden;height: 20px;"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleChangeDate"
                :default-time="['12:00:00']">
            </el-date-picker>
          </template>
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
            label="到期时间"
            show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            label="状态"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.state === '0'" style="color: #29BE99;">投放中</span>
            <span v-else-if="scope.row.state === '1'" style="color: #FFA511;">待投放</span>
            <span v-else-if="scope.row.state === '2'" style="color: #A2A2A2">已结束</span>
            <span v-else-if="scope.row.state === '3'" style="color: #A2A2A2">已终止</span>
            <span v-else>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div style="line-height: 20px">
              <el-link type="primary" @click="linkRouter('1')">详情</el-link>
              <span class="my-fen">|</span>
              <el-link type="primary" v-if="scope.row.state === '0'">终止</el-link>
              <el-link type="primary" v-else-if="scope.row.state === '1'"  @click="linkRouter('2')">编辑</el-link>
              <el-link type="primary" v-else-if="scope.row.state === '2'||scope.row.state === '3'">删除</el-link>
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
  import {handleMenuText} from '../util/util.js'
  export default {
    name: "HomeNew",
    components: {
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          title: '银行理财课程',
          remark: '成都事业群发布',
          state: '0'
        }, {
          date: '2016-05-03',
          title: '银行理财课程',
          remark: '成都事业群发布',
          state: '1'
        }, {
          date: '2016-05-03',
          title: '银行理财课程',
          remark: '成都事业群发布',
          state: '2'
        }, {
          date: '2016-05-03',
          title: '银行理财课程',
          remark: '成都事业群发布',
          state: '3'
        }],
        multipleSelection: [],
        currentPage4: 1,

        menuId: '',
        menus: [],
        dialogVisible: false,
        selectDate: null
      }
    },
    watch: {
      $route() {
        this.menuId = this.$route.params.id;
      },
      menuId() {
        this.menus = handleMenuText(this.menuId)
      }
    },
    mounted() {
      this.menuId = this.$route.params.id;
      this.menus = handleMenuText(this.menuId);
    },
    methods: {
      handleChangeDate() {
        console.log(this.selectDate)
      },
      emitDatePicker() {
        this.$refs.datePicker.showPicker()
      },
      filterTag(value, row, column) {},
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange() {},
      handleCurrentChange() {},
      addImg() {
        this.$router.push({path: `/add/${this.menuId}`, query: {type: '0'}})
      },
      linkRouter(type) {
        this.$router.push({path: `/add/${this.menuId}`, query: {type}})
      }
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