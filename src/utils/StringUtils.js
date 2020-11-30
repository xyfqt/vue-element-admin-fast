import OSS from 'ali-oss'
import baseApi from '@/api/base'

export default {

  json2FormData(data) {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return formData
  },
  isEmpty(obj, flag) {
    if (obj === 'null' || obj == 'undefined' || !obj) {
      return true
    }
    if (flag) {
      if (Array.isArray(obj) && !obj.length) {
        return true
      }
      if (typeof obj === 'object') {
        for (var key in obj) {
          return false// 返回false，不为空对象
        }
        return true
      }
    }
    return false
  },

  // 金额保留两位小数
  doubleDigist(amount, digist) {
    digist = digist || 2
    amount = parseFloat(amount)
    if (amount == 0) {
      return amount.toFixed(digist)
    } else {
      var strArr = amount.toString().split('.')
      var decimalStr
      if (isEmpty(strArr[1])) {
        strArr[1] = '0'.repeat(digist)
      } else if (strArr[1].length < digist) {
        strArr[1] = strArr[1] + '0'.repeat(digist - strArr[1].length)
      }
      decimalStr = strArr[1].substr(0, digist)
      return `${strArr[0]}\.${decimalStr}`
    }
  },

  // 版本比对
  versionCompare(newVersion, oldVersion) {
    var newArr = newVersion.split('.')
    var oldArr = oldVersion.split('.')

    var vlength = newArr.length > oldArr.length ? newArr.length : oldArr.length

    for (var i = 0; i < vlength; i++) {
      if (isEmpty(oldArr[i])) {
        return true
      } else if (isEmpty(newArr[i])) {
        return false
      }

      var newN = newArr[i]
      var oldN = oldArr[i]

      var nlength = newN.length > oldN.length ? newN.length : oldN.length

      if (newN.length < nlength) {
        newN = '0'.repeat(nlength - newN.length) + newN
      } else if (oldN.length < nlength) {
        oldN = '0'.repeat(nlength - oldN.length) + oldN
      }

      newN = newN.split('')
      oldN = oldN.split('')

      for (var j = 0; j < nlength; j++) {
        // oldN[j] = oldN[j] == undefined ? '0' : oldN[j];
        // newN[j] = newN[j] == undefined ? '0' : newN[j];

        if (newN[j].localeCompare(oldN[j]) == 1) {
          return true
        } else if (newN[j].localeCompare(oldN[j]) == -1) {
          return false
        }
      }
    }
    return false
  },

  deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    let targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = this.deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    if (Object.prototype.toString.call(source) === '[object Date]') {
      targetObj = new Date(source.getTime())
    }
    return targetObj
  },

  formaterTime(timestamp, format) {
    if (!timestamp) return ''
    if (Object.prototype.toString.call(timestamp) === '[object Date]') {
      timestamp = timestamp.getTime()
    }
    if (!format) {
      format = 'yyyy-MM-dd hh:mm:ss'
    }
    timestamp = parseInt(timestamp)
    const realDate = new Date(timestamp)

    function timeFormat(num) {
      return num < 10 ? '0' + num : num
    }

    const date = [
      ['M+', timeFormat(realDate.getMonth() + 1)],
      ['d+', timeFormat(realDate.getDate())],
      ['h+', timeFormat(realDate.getHours())],
      ['m+', timeFormat(realDate.getMinutes())],
      ['s+', timeFormat(realDate.getSeconds())],
      ['q+', Math.floor((realDate.getMonth() + 3) / 3)],
      ['S+', realDate.getMilliseconds()]
    ]

    const regYear = new RegExp('(y+)', 'i')
    const reg1 = regYear.exec(format)
    if (reg1) {
      format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length))
    }
    for (let i = 0; i < date.length; i++) {
      const k = date[i][0]
      const v = date[i][1]

      const reg2 = new RegExp('(' + k + ')').exec(format)
      if (reg2) {
        format = format.replace(reg2[1], reg2[1].length == 1
          ? v : ('00' + v).substring(('' + v).length))
      }
    }
    return format
  },

  getGroupData(arr, groupName) {
    const newArry = []
    const tempMap = {}
    if (!arr) return
    for (const item of arr) {
      if (!tempMap[item[groupName]]) {
        tempMap[item[groupName]] = item
        item['label'] = item.title
        const objData = {
          id: item['id'] + 'a',
          label: item[groupName],
          children: [item]
        }
        newArry.push(objData)
      } else {
        for (const newItem of newArry) {
          if (item[groupName] == newItem['label']) {
            item['label'] = item.title
            newItem['children'].push(item)
            break
          }
        }
      }
    }
    return newArry
  },

  getFileName(file) {
    let rdmString = ''
    for (
      ;
      rdmString.length < 8;
      rdmString += Math.random()
        .toString(36)
        .substr(2)
    ) {
    }
    let tag = (rdmString + Date.now()).split('')
    tag.sort(function() {
      return 0.5 - Math.random()
    })
    tag = tag.join('')
    const nameArr = file.name.split('.')
    return tag + '.' + nameArr[nameArr.length - 1]
  },
  filterChinese(fileName) {
    // 过滤掉文件名中的中文（也包含日文和韩文），不包含中文符号
    var regex = /[\u4E00-\u9FA5\uF900-\uFA2D]/
    // 包含中文
    if (regex.test(fileName)) {
      // 用于临时存储单字符
      var chinese = ''
      // 用于校验是否是中文
      var flag = false
      // 用于存储过滤后的文件名
      var filterChinese = ''
      for (var i = 0; i < fileName.length; i++) {
        chinese = fileName.substring(i, i + 1)
        flag = regex.test(chinese)
        // 该字符不是中文
        if (!flag) {
          filterChinese += chinese
        }
      }
      // 过滤掉中文后的文件名
      fileName = filterChinese
    }
    return fileName
  },

  /*
  * that:上下文对象
  * file:文件
  * path:文件路径
  * result:处理结果目标
  * type:文件类型 默认是图片
  * progress:是否需要显示进度
  * */
  async uploadFileOss(that, file, path, result, type, progress) {
    const isJPG = /^image\/(jpeg|png|jpg|gif)$/.test(file.type)
    const limitSize = file.size / 1024 / 1024

    if (!isJPG && !type) {
      that.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
      return
    }
    if (limitSize > 2 && !type) {
      that.$message.error('上传图片大小不能超过 2MB!')
      return
    } else if (limitSize > 10 && type === 'xls') {
      that.$message.error('上传文件大小不能超过 10MB!')
      return
    } else if (limitSize > 100 && type === 'video') {
      that.$message.error('上传视频大小不能超过 100MB!')
      return
    }

    const res = await baseApi.getUploadToken()
    const domain = res.data.host
    const client = new OSS({
      accessKeyId: res.data.accessKeyId,
      accessKeySecret: res.data.accessKeySecret,
      secure:true,
      stsToken: res.data.securityToken,
      bucket: res.data.bucket,
      endpoint: "http://oss-cn-beijing.aliyuncs.com",
      // region: 'oss-cn-beijing'
    })

    const fileName = this.getFileName(file).replace(/,/g, '')
    const response = await client.multipartUpload(`${path}${fileName}`, file, {
      progress: function(pro) {
        if (progress) {
          that.progress = parseInt(pro * 100)
        }
        console.log(pro)
      }
    })
    const fileUrl = domain + response.name
    if (result) {
      result.push({
        url: fileUrl,
        status: 'success',
        name: file.name
      })
    } else {
      result = fileUrl
    }
    return result
  },

  searchTimeFormat(date, format) {
    let start = ''
    let end = ''
    if (!format) {
      format = 'yyyy-MM-dd'
    }
    if (date && typeof date !== 'string' && date[0]) {
      start = this.formaterTime(
        typeof date[0] === 'number'
          ? date[0]
          : date[0].getTime(),
        format
      )
      end = this.formaterTime(
        typeof date[1] === 'number'
          ? date[1]
          : date[1].getTime(),
        format
      )
    }
    return {
      start,
      end
    }
  }
}
