<template>
  <div id="load-index">
    <el-row :gutter="25">
      <el-col :span="10" :offset="5">
        <div style="border: 1px solid #fff;padding-top: 10px"></div>
        <div class="content" v-for="(article, index) in articles">
          <div class="content-body">
            <div class="content-left">
              <router-link class="content-title" :to="{name: 'ArticleShow', params: {slug: article.id}}">
                <h3>{{article.title}}</h3>
              </router-link>
              <div style="padding-top: 5px; font-size: 13px; color: #bbb">由
                <router-link :to="{name: 'UserArticles', params: {slug: article.user.id}}">{{article.user.name}}
                </router-link>
                发表于 {{article.created_at}}
              </div>
              <div class="content-body-body">
                {{ article.abstract }} ...
              </div>
              <div style="padding-top: 15px">
                <div v-for="tag in article.tags" style="float: left">
                  <a v-if="tag" :href="'/#/articles?tag=' + tag.name" id="btn-topic">
                    # {{ tag.name }}
                  </a>
                </div>
                <div class="content-count">
                  <span style="padding-right: 4px">
                    <i class="fa fa-eye"></i>
                  </span>
                  <span>{{ article.view_count }}</span>
                  <span style="padding-right: 4px; margin-left: 10px">
                    <i class="fa fa-comments"></i>
                  </span>
                  <span>{{ article.comments_count }}</span>
                  <span style="padding-right: 4px; margin-left: 10px">
                    <i class="fa fa-heart"></i>
                  </span>
                  <span>{{ article.likes_count }}</span>
                </div>
              </div>
            </div>
            <div class="content-right">
              <img :src="article.cover" alt="">
            </div>
          </div>
          <div style="clear:both; border-bottom: 1px solid #ddd; padding-top: 40px"></div>
        </div>
        <div style="text-align: right; margin-top: 20px">
          <el-pagination layout="prev, pager, next" :total="total" :page-size="page_size"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="4" style="margin-top: 20px;">
        <hot-topics></hot-topics>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '../../api';
  import {mapMutations} from 'vuex';
  import {Loading} from 'element-ui';
  import HotTopics from '../../components/HotTopics';

  let loadingInstance;

  export default {
    data() {
      return {
        articles: '',
        tagName: '',
        total: null,
        page_size: 15,
      }
    },
    components: {
      HotTopics
    },
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter');
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.tagName = to.query;
      })

    },
    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate');
      this.tagName = to.query;
      next();
    },
    mounted() {
      const validate_user = this.$route.query.validate;
      if (validate_user) {
        if (validate_user == 'yes') {
          this.message_true();
        } else {
          this.message_false();
        }
      }
      let options = {
        target: document.querySelector('#app')
      };
      loadingInstance = Loading.service(options);
    },
    methods: {
      get_articles(val) {
        api.get_articles({params: {page: val, tag: this.tagName.tag}}).then((res) => {
          if (res.data.status == 1) {
            this.articles = res.data.data.data;
            this.total = Number(res.data.data.total);
            for (let index in this.articles) {
              this.articles[index].abstract = this.articles[index].body.substring(0, 150)
                .replace(/<\/?.+?>/g, "").replace(/ /g, "").replace(/&nbsp;/g, ' ').replace(/#/g, '');
            }
            loadingInstance.close();
          }
        })
      },
      message_true() {
        this.$notify.success({
          title: '激活成功',
          message: '感谢您支持 Cheyy小镇，祝您使用愉快！',
          offset: 100
        });
      },
      message_false() {
        this.$notify.success({
          title: '激活失败',
          message: '请联系管理员（root@icheyy.top）激活用户！',
          offset: 100
        });
      },
      handleCurrentChange(page) {
        this.get_articles(page);
      },
    },
    watch: {
      tagName: function () {
        this.get_articles(undefined);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
    .content-left {
      width: 65%;
      float: left;
      a {
        color: #bbb;
        &:hover {
          color: #00b5ad;
        }
      }
      .content-title {
        color: #222;
        &:hover {
          color: #00b5ad;
          text-decoration: underline;
        }
      }
      .content-body-body {
        padding-top: 12px;
        font-size: 14px;
        line-height: 25px;
      }
    }
    .content-right {
      img {
        margin-left: 3%;
        width: 30%;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }
  }

  .content-count {
    float: left;
    font-size: 14px;
    padding-top: 2px;
    color: #999;
    padding-left: 5px;
  }

  #btn-topic {
    border-radius: 4px;
    font-size: 13px;
    border: 1px solid orangered;
    padding: 2px 7px 2px;
    margin-right: 12px;
    font-weight: 500;
    color: orangered;
  }

  #btn-topic:hover {
    color: #00b5ad;
    border-radius: 4px;
    border: 1px solid #00b5ad;
    box-shadow: none;
    text-decoration: none;
  }
</style>
