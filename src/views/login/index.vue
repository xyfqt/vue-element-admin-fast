<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      hide-required-asterisk
    >
      <el-form-item class="title">
        <img src="@/assets/images/logo.png" />
        <span>欢迎登录</span>
      </el-form-item>
      <el-form-item prop="username" label="账号">
        <el-input v-model="loginForm.username" placeholder="请输入账号" name="username" type="text">
          <i
            class="el-icon-user el-input__icon"
            slot="suffix"
            :style="{'color':loginForm.username? '#ff6f9b' : ''}"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          @keyup.enter.native="handleLogin"
          :type="passwordType"
        >
          <span
            class="show-pwd"
            slot="suffix"
            @click="passwordType = passwordType === 'password' ? 'text' : 'password' "
          >
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              style="cursor:pointer"
            />
          </span>
          <i
            class="el-icon-lock el-input__icon"
            slot="suffix"
            :style="{'color':loginForm.password? '#ff6f9b' : ''}"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item class="side-item">
        <img src="@/assets/images/jr_icon.png" alt />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-top:24px"
          @click.prevent="handleLogin"
        >登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "fenbei123456",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      passwordType: "password",
      loading: false,
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery,
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/images/bg_img.png") no-repeat center;
  display: flex;
  .login-form {
    background: url("../../assets/images/dl_bg_img.png") no-repeat center;
    background-size: 837px 577px;
    position: relative;
    width: 837px;
    padding: 128px 118px 142px 137px;
    height: 577px;
    margin: 80px auto;
    box-sizing: border-box;
    ::v-deep .el-form-item__content {
      width: 288px;
    }
    .title ::v-deep .el-form-item__content {
      font-size: 24px;
      display: flex;
      align-items: center;
      img {
        margin-right: 14px;
        width: 44px;
      }
    }
    .side-item {
      position: absolute;
      right: 118px;
      top: 170px;
      width: 249px;
      height: 223px;
    }
  }
}
</style>