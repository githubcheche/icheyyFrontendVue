<template>
  <div>
    <headers></headers>
    <div id="register" class='login-wrap'>
      <div class="container">
        <div class="ms-title">
          <span>
            <router-link to="/user/login" style="color: #00b5ad; font-weight: bold">登录</router-link>
          </span>
          <span class="this-span">·</span>
          <span>
            <router-link to="/user/register" style="color: #00b5ad; font-weight: bold">注册</router-link>
          </span>
        </div>
        <div class="ms-login">
          <el-form ref="params" status-icon :model="params" :rules="rules" label-width="82px">
            <el-form-item label="用户名：" prop="name">
              <el-input v-model="params.name" placeholder="至少4个字符"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="params.email" placeholder="请填写真实邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
              <el-input type="password" placeholder="至少6个字符" v-model="params.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password_confirmation" label="确认密码：">
              <el-input type="password" placeholder="请再次输入密码" v-model="params.password_confirmation" auto-complete="off"></el-input>
            </el-form-item>
            <div class="login-failure" v-if="failure">
              <div class="header">{{failure.message}}</div>
              <ul class="list">
                <li v-for="error in failure.data">{{error[0]}}</li>
              </ul>
            </div>
            <div class="login-btn">
              <el-button class="btn-define" @click="submit()">注 册</el-button>
            </div>
          </el-form>
          <!--<div class="pull-center">-->
          <!--<el-button class="github_login" @click="github_login()">GitHub 账号注册</el-button>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api';
import { mapState, mapMutations } from 'vuex';
import Headers from '../../components/Headers';

export default {
  name: 'register',
  components: {
    Headers
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.params.password_confirmation !== '') {
          this.$refs.params.validateField('password_confirmation');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.params.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      params: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      rules: {
        name: [
          { required: true, message: '账户不能为空' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirmation: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  computed: mapState({
    success: state => state.account.register.success,
    failure: state => state.account.register.failure,
  }),
  methods: {
    // 注册
    submit() {
      this.$store.dispatch('accountRegisterSubmit', this.params);
    },
    // 注册成功
    successWatcher(val, oldVal) {
      if (val && !oldVal) {
        this.message();//提示注册成功
        setTimeout(() => {
          this.$router.push({ name: 'Login' });//2s后跳转到登入界面
        }, 2000);
      }
    },
    message() {
      //element-ui提示组件
      this.$notify.success({
        title: '注册成功',
        message: '感谢您支持 Cheyy小镇，请先到前往邮箱激活账号',
        offset: 100
      });
    },
    //    github_login() {
    //      window.open('https://api.laravue.org/github');
    //    }
  },
  watch: {
    success: 'successWatcher',
  }
}
</script>

<style lang="scss" scoped>
.message {
  margin-bottom: 18px;
  text-align: center
}

.login-wrap {
  margin-top: 5%;
  position: relative;
  width: 100%;
  height: 100%;
  .container {
    position: absolute;
    top: 10%;
    left: 38%;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
}

.ms-title {
  margin: 40px 0 20px;
  text-align: center;
  font-size: 25px;
  color: #555;
  .this-span {
    padding: 0 20px 0 20px;
  }
}

.ms-login {
  width: 360px;
  padding: 40px;
  border-radius: 5px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 36px;
}

.btn-define {
  background-color: #00b5ad;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border-color: #f1f1f1;
  box-shadow: none;
}

.btn-define:hover,
.btn-define:active {
  background-color: #169e98;
  box-shadow: none;
}

.pull-center {
  text-align: center;
}

.login-failure {
  padding: 10px 0 10px;
  border-radius: 4px;
  background-color: #ffeef0;
  margin-bottom: 20px;
  color: red;
  line-height: 1.6;
  text-align: left;
  .header {
    padding: 10px 0 0 35px;
    font-weight: bold;
  }
  .list {
    padding: 10px 0 0 35px;
  }
}

.github_login {
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  color: #00b5ad;
  font-size: 15px;
  font-weight: bold;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
}
</style>
