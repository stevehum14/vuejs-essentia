<template>
  <div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1 class="text-center">{{ title }}</h1>
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
<!--            创建时间-->
            <abbr>{{date | moment('from')}}</abbr>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body">
              <div class="markdown-body" v-html="content"></div>
<!--              编辑删除图标-->
              <div v-if="auth && uid === 1" class="panel-footer operate">
                <div class="actions">
                  <a @click="deleteArticle" class="admin" href="javascript:;"><i class="fa fa-trash-o"></i></a>
                  <a @click="editArticle" class="admin" href="javascript:;"><i class="fa fa-pencil-square-o"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SimpleMDE from 'simplemde'
  import hljs from 'highlight.js'
  import emoji from 'node-emoji'
  // 引入 mapState 辅助函数
  import {mapState} from 'vuex'

  export default {
    name: 'Content',
    data(){
      return {
        title: '', //文章标题
        content:'',//文章内容
        date: '', //创建时间
        uid: 1 //用户ID
      }
    },
    computed: {
      // 将仓库的以下状态混入到计算属性之中
      ...mapState([
        'auth',
        'auth'
      ])

    },
    // 在实例创建完成后
    created() {
      // 从当前路由对象获取参数 articleId
      const articleId = this.$route.params.articleId
      // 从 getArticleById 返回指定 ID 的文章
      const article = this.$store.getters.getArticleById(articleId)

      if(article){
        let { uid,title,content,date} = article

        this.uid = uid
        this.title = title
          // 使用编辑器的 markdown 方法将 Markdown 内容转成 HTML
        // this.content = SimpleMDE.prototype.markdown(content)
        // 为 => 先使用 emojify 方法解析 emoji 字符串标识，name => name 表示不认识的就返回原值
        this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
        this.date = date

        this.$nextTick(()=>{
          // 遍历当前实例下的 'pre code' 元素
          this.$el.querySelectorAll('pre code').forEach((el)=>{
            // 使用 highlight.js 的 highlightBlock 方法进行高亮
            hljs.highlightBlock(el)
          })
        })
      }
    },
    methods: {
      //编辑文章
      editArticle() {
        this.$router.push({name: 'Edit',params:{articleId:this.articleId}})
      },
      //删除文章
      deleteArticle(){
        this.$swal({
          text: '你确定要删除此内容吗?',
          confirmButtonText: '删除'
        }).then((res)=>{
          if(res.value){
            this.$store.dispatch('post',{articleId:this.articleId})
          }
        })

      }
    }
  }

</script>
<style scoped></style>
