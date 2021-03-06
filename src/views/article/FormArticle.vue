<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          <form action="" v-on:submit.prevent>
            <div class="article-create">
              <dt style="">标题：</dt>
              <el-input class="el-input" v-model="params.title" placeholder="至少4个字符"></el-input>
            </div>
            <div class="article-create">
              <dt>文章类别：</dt>
              <el-select class="el-input" v-model="params.category" placeholder="请选择">
                <el-option v-for="item in allCategories" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="article-create">
              <dt>文章标签：</dt>
              <el-select class="el-input" v-model="tags" multiple filterable allow-create placeholder="请选择文章标签">
                <el-option v-for="item in allTags" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="article-create">
              <dt>封面图片：</dt>
              <el-upload class="avatar-uploader"
                         style="padding-left: 17%;"
                         :action="upload_cover_url"
                         :show-file-list="false"
                         :on-success="handleCoverSuccess"
                         :headers="{Authorization: getTocken()}">
                <img v-if="params.cover" :src="params.cover" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="article-create">
              <dt style="margin-right: 2%">内容：</dt>
              <markdown-editor style="width: 70%; padding-left: 17%;" ref="markdownEditor" :configs="configs"
                               :highlight="true" :custom-theme="true" v-model="params.body">
              </markdown-editor>
            </div>
            <div class="article-create">
              <dt style="margin-right: 2%">图片上传：</dt>
              <el-upload
                class="upload-image"
                name="image"
                drag
                :action= "upload_content_url"
                :headers="{Authorization: getTocken()}"
                multiple
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2Mb</div>
              </el-upload>
            </div>
            <div class="article-create">
              <dt>是否允许评论：</dt>
              <el-select class="el-input" v-model="params.is_hidden" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="login-failure" v-if="failure">
              <div class="header">{{failure.message}}</div>
              <ul class="list">
                <li v-for="error in failure.data">{{error[0]}}</li>
              </ul>
            </div>
            <div>
              <button class="article-button" type="submit" @click="submit($event)">提 交</button>
            </div>
          </form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import api from '../../api';
  import store from '../../store';

  export default {
    components: {
      markdownEditor,
    },
    props: ['type'],
    data() {
      return {
        upload_content_url: this.$http.options.root + '/content_image',
        params: {
          title: '',
          cover: '',//文章封面路径
          body: '',
          category: '',
          is_hidden: 'F'
        },
        upload_cover_url: this.$http.options.root + '/article_cover_image',//文章封面api path
        options: [
          {value: 'F', label: '是'},
          {value: 'T', label: '否'}
        ],
        failure: '',
        tags: [],
        allTags: '',
        allCategories: '',
        configs: {
          status: false,
          initialValue: '请输入内容',
          renderingConfig: {
            codeSyntaxHighlighting: true,
            highlightingTheme: 'tomorrow'
          }
        }
      }
    },
    mounted() {
      if (this.type === 'create_article') {
        api.get_tags().then((res) => {
          this.allTags = res.data.data;
        });
        api.get_categories().then((res) => {
          this.allCategories = res.data.data;
        });
      } else {
        api.get_tags().then((res) => {
          this.allTags = res.data.data;
          api.get_categories().then((res) => {
            this.allCategories = res.data.data;
            api.get_article(this.$route.params.slug).then((res) => {
              for (let index in res.data.data.tags) {
                this.tags.push(res.data.data.tags[index].id);
              }
              this.params = res.data.data;
              this.params.category = res.data.data.category_id;
            });
          });
        });
      }
    },
    methods: {
      submit(e) {
        // 判断是否为按了Enter键，防止在输入标签时被提交
        if (e !== null && e.keyCode === 13) {
          return;
        }
        if (this.type === 'create_article') {
          this.params.tag = this.tags;
          api.create_article(this.params).then((res) => {
            if (res.data.status === 1) {
              this.$router.push({name: 'ArticleShow', params: {slug: res.data.data.id}});
            } else {
              this.failure = res.data;
            }
          });
        } else {
          let form = {
            tag: this.tags,
            is_hidden: this.params.is_hidden,
            cover: this.params.cover,
            title: this.params.title,
            body: this.params.body,
            category: this.params.category,
          }
          api.edit_article(this.$route.params.slug, form).then((res) => {
            if (res.data.status === 1) {
              this.$router.push({name: 'ArticleShow', params: {slug: res.data.data.id}});
            }
          });
        }
      },
//      handleImageAdded(file, Editor, cursorLocation) {
//        var formData = new FormData();
//        formData.append('image', file);
//        api.content_image(formData).then((res) => {
//          let url = res.data.data.url // Get url from response
//          Editor.insertEmbed(cursorLocation, 'image', url);
//        }).catch((err) => {
//          console.log(err);
//        })
//      },
      /**
       * 上传图片之前，钩子
       * @param file
       * @returns {boolean}
       */
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLtM = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!');
        }
        if (!isLtM) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLtM;
      },
      /**
       * 取得用户tocken
       * @returns {*}
       */
      getTocken() {
        const auth = store.state.account.auth;
        if (auth.check()) {
          const accessToken = auth.access_token;
          return `Bearer ${accessToken}`;
        }
        return '';
      },
      /**
       * 图片上传成功回调
       * @param res
       * @param file
       */
      handleAvatarSuccess(response, file, fileList) {
        let imageUrl = response.data.url;
        console.log(file.name + '\n' +imageUrl);
        this.params.body += `![](${imageUrl})`;
      },
      handleCoverSuccess(response, file, fileList) {
        if (1 == response.status) {
          this.params.cover = response.data.url;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~simplemde/dist/simplemde.min.css';
  /*@import '~highlight.js/styles/atom-one-dark.css';*/
  .grid-content {
    width: 100%;
    margin-top: 60px;
    .article-create {
      margin-bottom: 20px;
      dt {
        color: #555;
        padding-top: 5px;
        width: 15%;
        text-align: right;
        float: left;
      }
      .el-input {
        width: 70%;
        margin-left: 2%;
      }
      #editor {
        height: 400px;
      }
      .upload-image {
        display: inline-block;
        width: 70%;
      }

    }
    .article-button {
      cursor: pointer;
      width: 70%;
      margin-left: 17%;
      background-color: #00b5ad;
      color: #fff;
      font-size: 17px;
      padding: 5px 10px 5px 10px;
      border: 1px solid #00b5ad;
      border-radius: 100px;
      box-shadow: none;
      &:hover,
      &:focus,
      &:active {
        color: tomato;
        border: 1px solid tomato;
        box-shadow: none;
        border-radius: 100px;
        background-color: #fff;
      }
    }
  }

  .login-failure {
    width: 70%;
    margin-left: 17%;
    margin-bottom: 20px;
    padding: 10px 0 10px;
    border-radius: 4px;
    background-color: #ffeef0;
    color: red;
    line-height: 1.6;
    .header {
      padding: 10px 0 0 35px;
      font-weight: bold;
    }
    .list {
      padding: 10px 0 0 35px;
      text-align: left;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px solid #aaa;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #00b5ad;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 120px;
    display: block;
  }

</style>
