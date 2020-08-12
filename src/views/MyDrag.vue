<template>
  <ul class="list" id="list">
    <li v-for="(item,index) in bannerList">
      <p class="my-item">
        <i class="el-icon-rank my-rank"></i>
<!--        <span class="my-img">-->
<!--          <el-image-->
<!--              v-if="url"-->
<!--              style="width: 40px; height: 40px"-->
<!--              :src="url"-->
<!--              fit="fill">-->
<!--          </el-image>-->
<!--          <span v-else>请上传图片</span>-->
<!--        </span>-->
        <el-upload
            class="upload-demo"
            ref="upload"
            action="other"
            list-type="picture"
            :file-list="item.fileList"
            :show-file-list="true"
            :auto-upload="false">

          <div class="my-demo" slot="file" slot-scope="{file}">
            <el-image
                v-if="file.url"
                style="width: 40px; height: 40px"
                :src="file.url"
                fit="fill">
            </el-image>
          </div>
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-input size="mini" v-model="item.imgNm" placeholder="请输入内容"></el-input>
        <el-input size="mini" v-model="item.link" placeholder="请输入内容"></el-input>

      </p>
    </li>
  </ul>
</template>

<script>
  import Sortable from 'sortablejs'
  export default {
    props: {
      bannerList: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {
        uwasc:true,
        idx:'1',
        url: ''
      }
    },
    mounted () {
      var _this = this;
      var $ul = this.$el;
      var sortable = new Sortable($ul, {
        onUpdate:function(event){
          //修改items数据顺序
          var newIndex = event.newIndex,
            oldIndex = event.oldIndex,
            $li = $ul.children[newIndex],
            $oldLi = $ul.children[oldIndex];
          // 先删除移动的节点
          $ul.removeChild($li)
          // 再插入移动的节点到原有节点，还原了移动的操作
          if(newIndex > oldIndex) {
            $ul.insertBefore($li,$oldLi)
          } else {
            $ul.insertBefore($li,$oldLi.nextSibling)
          }
          // 更新items数组
          var item = _this.bannerList.splice(oldIndex,1)
          _this.bannerList.splice(newIndex,0,item[0])
          // 下一个tick就会走patch更新
        },
        ghostClass: 'blue-background-class',
        animation: 150,
      })
    },
    methods:{
      btnUp(index){
        var item = this.items[index];
        this.items.splice(index,1);
        this.items.unshift(item);
      },
      handleChange(file, fileList) {
        console.log(file.url, fileList)
      }
    },
    destroyed() {

    }
  }
</script>

<style scoped>
.blue-background-class {
  background: aqua;
}
  .list li {
    list-style: none;
  }
  .my-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 5px;
  }
  .my-rank {
    display: inline-block;
    border: 1px solid #ccc;
    padding: 4px;
    margin-right: 10px;
    border-radius: 3px;
    cursor: move;
  }
  .my-img {
    min-width: 40px;
    height: 40px;
    display: inline-block;
    margin-right: 10px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 5px;
    font-size: 12px;
  }
  /deep/.el-upload-list--picture li{
    padding: 0!important;
      height: auto;
  }
  .upload-demo {
    display: flex;
    justify-content: center;
  }
</style>