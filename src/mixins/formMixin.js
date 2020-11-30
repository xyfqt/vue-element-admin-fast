export default function(config) {
  return {
    data() {
      return {
        isDisabled: true,
        loading: false,
        id: '',
        backVisible: false,
        oldData: {}
      }
    },
    created() {
      this.id = this.$route.query.id
    },
    methods: {
      globalValidate(formName) {
        this.$refs[formName].validate(valid => {
          this.isDisabled = !valid
        })
      },
      compareData(data) {
        for (const item in data) {
          if (data[item].toString() != this.oldData[item].toString()) {
            return true
          }
        }
        return false
      },
      changeBack() {
        if (this.compareData(this.formData)) {
          this.backVisible = true
        } else {
          this.back()
        }
      },
      back() {
        this.$router.push({
          path: config, query: {
            refresh: "refresh"
          }
        })
      },
    }
  }
}
