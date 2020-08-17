<template>
  <div style="padding: 20px 0 0 20px;">
    <el-breadcrumb style="padding: 0px 0 25px 0; font-weight: bold;" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-weight: bold; color: #000000;" v-for="(item, i) in menus" :key="i" >{{item}}</el-breadcrumb-item>
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
            prop="title"
            label="标题">
        </el-table-column>
        <el-table-column
            label="投放时间">
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
              <el-link type="primary">详情</el-link>
              <span class="my-fen">|</span>
              <el-link type="primary" v-if="scope.row.state === '0'">终止</el-link>
              <el-link type="primary" v-else-if="scope.row.state === '1'">编辑</el-link>
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
        menuMap: {
          '1': {
            'title': 'App启动页'
          },
          '2': {
            'title': '首页',
            'child': {
              '1': {
                'title': '对联区',
                'child': {
                  '1': {'title': '第一屏'},
                  '2': {'title': '第二屏'},
                  '3': {'title': '第三屏'},
                }
              },
              '2': {
                'title': '首页底部'
              }
            }
          },
          '3': {
            'title': '建行',
            'child': {
              '1': {'title': 'Banner'}
            }
          },
          '4': {
            'title': '员工福利',
            'child': {
              '1': {'title': 'Banner'}
            }
          },
          '5': {
            'title': '要览'
          },
        },
        menuId: '',
        menus: []
      }
    },
    watch: {
      $route() {
        this.menuId = this.$route.params.id;
      },
      menuId() {
        this.handleMenuText()
      }
    },
    mounted() {
      this.menuId = this.$route.params.id;
      this.handleMenuText();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange() {},
      handleCurrentChange() {},
      handleMenuText() {
        const menuArr = this.menuId.split('_');
        let child;
        this.menus = [];
        for(let i=0; i<menuArr.length; i++) {
          if(!child) {
            this.menus.push(this.menuMap[menuArr[i]].title);
            if(this.menuMap[menuArr[i]].child) {
              child = this.menuMap[menuArr[i]].child
            }
          } else {
            this.menus.push(child[menuArr[i]].title);
            if(child[menuArr[i]].child) {
              child = child[menuArr[i]].child
            }
          }
        }
        console.log(this.menus)
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