import StringUtils from "@/utils/StringUtils";

export default function (config) {
  return {
    data() {
      return {
        maxHeight: 'auto',
        dataList: [], // 表格数据
        total: 0, // 总条数,
        currentPage: 1, // 当前页,
        size: 20, // 一页几条记录，
        listLoading: false,
        multipleSelection: [],
        searchHe: 0,
        fold: false,
        showFold: false,
        foldContainerStyle: {
          zIndex: 100,
          boxShadow: '0px 7px 7px -7px rgba(138, 153, 150, 0.5)'
        },
        foldTop: 0,
        foldStyle: {
          zIndex: 100,
          transform: 'rotate(-90deg)'
        },
        scrollPos: 0,
        tableScrollPos: 0,
        tableEl: null,
        isCache: true,
        resetQueryParams: null,
      }
    },
    created() {
      this.getDataList()
    },
    mounted() {
      this.getTableHeight();
      window.addEventListener('resize', this.getTableHeight);
      let searchEl = this.$el.getElementsByClassName('search-area-class')[0];
      this.searchHe = searchEl.clientHeight;
      let that = this.$el.getAttribute('class') && this.$el.getAttribute('class').includes('app-container') ? this : this.$parent;
      that.$el.addEventListener('scroll', () => {
        this.scrollPos = that.$el.scrollTop;
        if (that.$el.scrollTop + 5 > this.searchHe) {
          this.showFold = true;
          // this.foldContainerStyle.zIndex = this.foldContainerStyle.zIndex
        } else {
          this.showFold = false;
          this.fold = false;
          this.foldStyle.transform = "rotate(-90deg)";
          this.foldContainerStyle.zIndex = 100
        }
      })
      if (this.$refs.dataTable) {
        this.tableEl = this.$refs.dataTable.$el.getElementsByClassName("el-table__body-wrapper")[0];
      } else if (this.$refs.dialogTable) {
        this.tableEl = this.$refs.dialogTable.$el.getElementsByClassName("el-table__body-wrapper")[0];
      }
      this.tableEl.addEventListener('scroll', (e) => {
        this.tableScrollPos = e.target.scrollTop;
      })
    },
    activated() {
      let that = this.$el.getAttribute('class') && this.$el.getAttribute('class').includes('app-container') ? this : this.$parent;
      that.$el.scrollTop = this.scrollPos;
      this.tableEl.scrollTop = this.tableScrollPos;
      if (!this.isCache) {
        this.currentPage = 1
        this.size = 20
        this.queryParams = StringUtils.deepClone(this.resetQueryParams)
        this.getDataList()
        that.$el.scrollTop = 0;
        this.tableEl.scrollTop = 0;
        this.showFold = false;
        this.fold = false;
        this.foldStyle.transform = "rotate(-90deg)";
        this.foldContainerStyle.zIndex = 100
      }else if(this.$route.query.refresh){
        this.getDataList()
      }
    },
    methods: {
      getTableHeight() {
        this.$nextTick(() => {
          let that = this.$el.getAttribute('class') && this.$el.getAttribute('class').includes('app-container') ? this : this.$parent;
          let searchEl = this.$el.getElementsByClassName('search-area-class')[0];
          console.log(this.$refs.tabArea.offsetTop)
          this.searchHe = searchEl.clientHeight;
          // this.foldTop = 84+'px'
          if (!this.$el.getAttribute('class') || !this.$el.getAttribute('class').includes('app-container')) {
            this.foldTop = this.searchHe + this.$el.offsetTop + 'px';
            //  console.log( parseInt(window.getComputedStyle(this.$el.getElementsByClassName("search-fold-icon")[0]).top))
          } else {
            this.foldTop = this.searchHe + 'px';
          }

          if (this.$refs.dataTable) {
            this.maxHeight = that.$el.clientHeight - 80 + 'px'
          } else if (this.$refs.dialogTable) {
            let bodyH = document.body.clientHeight * 0.9;
            let searchH = that.$el.getElementsByClassName('search-area-class')[0].clientHeight;
            this.maxHeight = parseInt(bodyH - searchH - 80 - 54) + 'px'
          }

          // this.maxHeight = that.$el.clientHeight  - 80 - parseInt(this.foldTop) +'px'
        })
      },
      foldSearch() {
        this.fold = !this.fold;
        this.foldContainerStyle.zIndex = this.fold ? 102 : 100;
        this.foldStyle = !this.fold ? {
          zIndex: 999,
          transform: 'rotate(-90deg)'
        } : {
            zIndex: 999,
            transform: 'rotate(90deg)'
          }
      },
      rowKey(row) {
        return row.id.toString()
      },
      handleSelectionChange(val) {
        this.multipleSelection = []
        for (const item of val) {
          this.multipleSelection.push(item.id.toString())
        }
      },
      handleSizeChange(size) {
        this.size = size
        this.currentPage = 1
        this.getDataList()
        if (this.$refs.dataTable) {
          this.$refs.dataTable.bodyWrapper.scrollTop = 0
        } else if (this.$refs.dialogTable) {
          this.$refs.dialogTable.$parent.$parent.$refs.dialog.children[1].scrollTop = 0
        }
      },
      handleCurrentChange(page) {
        this.currentPage = page
        this.getDataList()
        if (this.$refs.dataTable) {
          this.$refs.dataTable.bodyWrapper.scrollTop = 0
        } else if (this.$refs.dialogTable) {
          this.$refs.dialogTable.$parent.$parent.$refs.dialog.children[1].scrollTop = 0
        }
      },
      search() {
        this.currentPage = 1
        this.getDataList()
      },
    },
    destroyed() {
      window.removeEventListener('resize', function () { })
    },
    beforeRouteEnter(to, from, next) {
      if (from.name == config) {
        next(vm => {
          vm.$data.isCache = true
        })
      } else {
        next(vm => {
          vm.$data.isCache = false
        })
      }
    }
  }
}
