import {
  // necessary extensions
  FontType,
  FontSize,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
  Iframe,
  CodeBlock,
  Blockquote,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  LineHeight,
  HorizontalRule,
  HardBreak,
  // TrailingNode,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  FormatClear,
  TextColor,
  TextHighlight,
  Preview,
  Print,
  Fullscreen
  // SelectAll
} from 'element-tiptap'
import StringUtils from '@/utils/StringUtils'

async function uploadImage(file, path) {
  const res = await StringUtils.uploadFileOss(this, file, path)
  return res
}

export default function(config) {
  return {
    data() {
      return {
        extensions: [
          new FontType(),
          new FontSize(),
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading({ level: 5 }),
          new Bold({ bubble: true }), // render command-button in bubble menu.
          new Underline(),
          new Italic(),
          new Strike(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new Link(),
          new Image({
            uploadRequest: function(e) {
              return uploadImage(e, config.path)
            }
          }),
          new Iframe(),
          new CodeBlock(),
          new Blockquote(),
          new TodoItem(),
          new TodoList(),
          new TextAlign(),
          new Indent(),
          new LineHeight(),
          new HorizontalRule(),
          new History(),
          new Table(),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new HardBreak(),
          new FormatClear(),
          new TextColor(),
          new TextHighlight(),
          new Preview(),
          new Print(),
          new Fullscreen({
            update: function() {
              console.log('aaa')
            }
          })
          // new SelectAll(),
          // new TrailingNode()
        ],
        vloading: false,
        vloadingText: '获取富文本视频上传链接'
      }
    },
    methods: {
      uploadVideo() {
        if (this.vloading) return
        this.vloadingText = '视频上传中，请耐心等待'
        this.vloading = true
        baseApi.uploadVideo({ video: this.$refs.upVideo.files[0] }).then(res => {
          if (res.data) {
            this.$message({
              showClose: true,
              message: `视频链接：${res.data}`,
              type: 'success',
              duration: 0
            })
          }
          this.$refs.upVideo.value = ''
          this.vloadingText = '获取富文本视频上传链接'
          this.vloading = false
        })
      }
    }
  }
}
