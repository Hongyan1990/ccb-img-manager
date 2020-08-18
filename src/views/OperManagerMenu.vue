<template>
  <el-menu
      :default-active="menuId"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
  >
    <el-menu-item index="1" route="/app/home/1">
      <i class="el-icon-menu"></i>
      <span slot="title" >App启动页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>首页</span>
      </template>

      <el-submenu index="2-1">
        <template slot="title"><i class="el-icon-picture-outline"></i>对联区</template>
        <el-menu-item index="2-1-1" route="/app/home/2_1_1"><i class="el-icon-picture-outline"></i>第一屏</el-menu-item>
        <el-menu-item index="2-1-2" route="/app/home/2_1_2"><i class="el-icon-picture-outline"></i>第二屏</el-menu-item>

      </el-submenu>
      <el-submenu index="2-2">
        <template slot="title"><i class="el-icon-picture-outline"></i>首页底部</template>
        <el-menu-item index="2-2-1" route="/app/home/2_2_1"><i class="el-icon-picture-outline"></i>第一屏</el-menu-item>
        <el-menu-item index="2-2-2" route="/app/home/2_2_2"><i class="el-icon-picture-outline"></i>第二屏</el-menu-item>
        <el-menu-item index="2-2-3" route="/app/home/2_2_3"><i class="el-icon-picture-outline"></i>第三屏</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>建行</span>
      </template>
      <el-menu-item index="3-1"  route="/app/home/3_1">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">Banner</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>员工福利</span>
      </template>
      <el-menu-item index="4-1"  route="/app/home/4_1">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">Banner</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="5"  route="/app/home/5">
      <i class="el-icon-menu"></i>
      <span slot="title">要览</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "OperManagerMenu",
    props: {
      menuId: {
        type: String,
        default: '1'
      }
    },
    data () {
      return {

      }
    },
    computed: {

    },
    methods: {
      handleOpen() {},
      handleClose() {}
    },
  }
</script>

<style scoped>
  .el-menu-vertical-demo {
    border-right: none;
  }
</style>