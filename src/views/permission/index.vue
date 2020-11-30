<template>
  <div class="app-container">
    <div class="tab-area">
      <select-tab :tab-data="tabData" @tabClick="selectTab" :current="select" />
    </div>
    <keep-alive>
      <component :is="selectcom" />
    </keep-alive>
  </div>
</template>

<script>
  import SelectTab from '@/components/SelectTab/index'

  import page from '@/views/permission/page.vue'


  export default {
    name: 'Order',
    components: {
      SelectTab,
      page,
    },
    data() {
      return {
        tabData: [{ key: '1', value: '淘宝', name: 'page' }, { key: '2', value: '拼多多', name: 'page' }],
        selectcom: 'page',
        select:0,
      }
    },
    created() {
      let platform = this.$route.query.platform;
      if(platform){
        if(platform==1){
          this.select = 0;
          this.selectcom = "page";
        }else if(platform==2){
          this.select = 1;
          this.selectcom = "page";
        }
      }else {
        // window.history.replaceState(null,null,'/#/permission/pager?platform=1');
      }
    },
    methods: {
      selectTab(item, index) {
        this.select = index;
        this.selectcom = item.name
        window.history.replaceState(null,null,`/#/permission/page?platform=${item.key}`);
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>

