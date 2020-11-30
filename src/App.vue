<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  overflow: hidden;
}
#nprogress .bar {
  background: #ff6f9b !important; //自定义颜色
}
.el-dialog__wrapper{
  display: flex;
}
.el-dialog {
  // position: absolute;
  // left: 50%;
  // max-height: 90vh;
  // overflow: hidden;
  margin: auto!important;
  // top: 50% !important;
  // transform: translate(-50%, -50%);
  // border-radius: 5px;
}
.el-dialog__header {
  background: #ff6f9b;
  padding: 15px !important;
  box-shadow: rgba(138, 153, 150, 0.5) 0px 7px 7px -7px;
  position: relative;
  z-index: 10000;
  min-height: 50px;
  .el-dialog__title,
  .el-icon-close {
    color: #fff;
    transition: all 0.5s;
  }
  .el-dialog__headerbtn:hover {
    .el-icon-close {
      color: #fff !important;
      font-weight: bold;
      transform: rotate(180deg);
    }
    .el-icon-close::before {
      font-size: 18px !important;
    }
  }
}
.el-dialog__body {
  max-height: calc(90vh - 140px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
  }
}
.el-dialog__footer {
  padding: 18px !important;
  border-top: 1px solid #e7e7e7;
}
.el-icon-circle-close:not(.el-input__icon ):before{
  color:#fff;
}
.el-tiptap-editor--fullscreen{
    z-index: 9999999999;
  }


</style>
