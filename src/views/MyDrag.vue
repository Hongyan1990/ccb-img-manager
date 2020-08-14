<template>
    <ul class="list" id="list">
      <li v-for="(item,i) in bannerList">
        <p class="my-item">
          <i class="el-icon-rank my-rank"></i>
          <span class="my-img">
            <el-image
                v-if="item.imgUrl"
                style="width: 40px; height: 40px"
                :src="item.imgUrl"
                fit="fill">
            </el-image>
            <span v-else>请上传图片</span>
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(i)"
            >
              <i class="el-icon-zoom-in my-zoom"></i>
            </span>
          </span>
          <el-upload
              class="upload-demo"
              ref="upload"
              action="other"
              :on-change="handleChange"
              :file-list="item.fileList"
              :show-file-list="false"
              :auto-upload="false">
            <i slot="default" style="margin-right: 10px;" class="el-icon-plus" @click="index=i"></i>
          </el-upload>
          <el-tooltip class="item" effect="dark" :content="item.picName||'图片名称'" placement="top-start">
            <el-input class="my-input" size="mini" v-model="item.picName" placeholder="图片名称"></el-input>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="item.picUrl||'跳转链接'" placement="top-start">
            <el-input class="my-input" size="mini" v-model="item.picUrl" placeholder="跳转链接"></el-input>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="轮播时间（S）" placement="top-start">
            <el-input class="my-input" size="mini" v-model="item.picStayTime" placeholder="轮播时间（S）"></el-input>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="请选择登录方式" placement="top-start">
            <el-select class="my-input" size="mini" v-model="item.loginType" placeholder="请选择登录方式">
              <el-option label="不登录" value="0"></el-option>
              <el-option label="密码登录" value="1"></el-option>
              <el-option label="token登录" value="2"></el-option>
            </el-select>
          </el-tooltip>

          <i class="el-icon-delete my-del" @click="deleteBanner(i)"></i>
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
        url: '',
        index: 0,
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
      handleChange(file, fileList) {
        console.log(file, fileList, this.index);
        let fileName = file? file.name: null;
        const i = this.index;
        if(fileName) {
          this.bannerList[i].imgUrl = URL.createObjectURL(file.raw)
          this.bannerList[i].picName = new Date().getTime() + fileName
        }

      },
      handlePictureCardPreview(i) {
        const url = this.bannerList[i].imgUrl;
        if(!url) return;
        this.$emit('showRoomDialog', url)
      },
      deleteBanner(i) {
        this.bannerList.splice(i, 1)
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
  .list {
    max-height: 200px;
    overflow: auto;
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
    max-width: 40px;
    display: inline-block;
    margin-right: 10px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 5px;
    font-size: 12px;
    position: relative;
  }
  /deep/.el-upload-list--picture li{
    padding: 0!important;
      height: auto;
  }
  .upload-demo {
    display: flex;
    justify-content: center;
  }
  .el-upload-list__item-preview {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
    line-height: 1.8;
  }
  .my-img:hover .el-upload-list__item-preview{
    opacity: 1;
  }
  .my-zoom {
    cursor: pointer;
  }
  .my-input {
    width: 150px;
  }
  .my-del {
    cursor: pointer;
    margin-left: 10px;
  }
</style>