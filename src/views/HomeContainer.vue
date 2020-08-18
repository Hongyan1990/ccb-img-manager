<template>
  <el-container>
    <el-aside width="200px" style="overflow-y: auto;overflow-x: hidden; border-radius: 5px;" :style="{maxHeight: localHeight + 'px'}">
      <oper-manager-menu :menuId="menuId"></oper-manager-menu>
    </el-aside>
    <el-main style="padding-top: 0px;background: #fff;padding-left: 0px;margin-left: 20px;border-radius: 5px;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import OperManagerMenu from './OperManagerMenu.vue'
  export default {
    name: "HomeContainer",
    components: {
      OperManagerMenu
    },
    data() {
      return {
        activeIndex: '1',
        menuId: '1'
      }
    },
    computed: {
      localHeight () {
        return window.innerHeight;
      }
    },
    watch: {
      $route() {
        const id = this.$route.params.id;
        this.menuId = id.replace(/_/g, '-');
      },
    },
    mounted() {
      const id = this.$route.params.id;
      this.menuId = id.replace(/_/g, '-');
    }
  }
</script>

<style scoped>

</style>