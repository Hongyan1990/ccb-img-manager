<template>
  <div>
    <el-row :gutter="10" style="font-weight: bold; color: #72767b; line-height: 50px;">
      <el-col :span="3">文章编号</el-col>
      <el-col :span="3">文章标题</el-col>
      <el-col :span="3">文章作者</el-col>
      <el-col :span="3">发表时间</el-col>
      <el-col :span="4">文章摘要</el-col>
      <el-col :span="4">原文链接</el-col>
      <el-col :span="4">操作</el-col>
    </el-row>
    <ul class="list" id="list">
      <li v-for="(item,i) in topics">
        <el-row :gutter="10" style="line-height: 40px" >
          <el-tooltip class="item" effect="dark" :content="item.articleNo" placement="top-start">
            <el-col :span="3" class="item-single">
              <span >{{item.articleNo}}</span>
            </el-col>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="item.articleTitle" placement="top-start">
            <el-col :span="3" class="item-single">
              <span>{{item.articleTitle}}</span>
            </el-col>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="item.articleAuthor" placement="top-start">
            <el-col :span="3" class="item-single">
              <span>{{item.articleAuthor}}</span>
            </el-col>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="item.publishTime" placement="top-start">
            <el-col :span="3" class="item-single">
              <span>{{item.publishTime==='Invalid date'?'':item.publishTime}}</span>
            </el-col>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" placement="top-start">
            <pre slot="content">{{item.articleAbstract}}</pre>
            <el-col :span="4" class="item-single">
              <span>{{item.articleAbstract}}</span>
            </el-col>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="item.articleUrl" placement="top-start">
            <el-col :span="4" class="item-single">
              <span>{{item.articleUrl}}</span>
            </el-col>
          </el-tooltip>
          <el-col :span="4">
            <el-tooltip class="item" effect="dark" content="置顶" placement="top-start">
              <i class="el-icon-top my-icon" @click="topArticle(i)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
              <i class="el-icon-edit my-icon" @click="editArticle(item, i)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <i class="el-icon-delete my-icon" @click="deleteArticle(i)"></i>
            </el-tooltip>
            <i class="el-icon-rank my-rank"></i>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>

</template>

<script>
  import Sortable from 'sortablejs'
  export default {
    name: "ArticleDrag",
    props: {
      topics: {
        type: Array,
        default: () => ([])
      }
    },
    mounted () {
      var _this = this;
      var $ul = document.getElementById('list');
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
          var item = _this.topics.splice(oldIndex,1)
          _this.topics.splice(newIndex,0,item[0])
          // 下一个tick就会走patch更新
        },
        ghostClass: 'blue-background-class',
        animation: 150,
        filter: '.filtered'
      })
    },
    methods: {
      topArticle(index) {
        // if(index === 0) return;
        const item = this.topics[index];
        this.topics.splice(index, 1);
        this.topics.unshift(item);
      },
      deleteArticle(i) {
        this.$emit('deleteArticle', i)
      },
      editArticle(item, i) {
        this.$emit('editArticle', item, i)
      }
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
    overflow-x: hidden;
    color:#606266;
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
    border-radius: 3px;
    cursor: move;
  }
  .my-icon {
    display: inline-block;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 3px;
    cursor: pointer;
  }
  .item-single {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    min-height: 25px;
  }
  .gred-back {
    background-color: #cccccc;
  }
</style>