<template>
<div>
  <span >{{commentInfo.created | showDate}}</span>
</div>
</template>

<script>
  import {dataformat} from "common/utils"
    export default {
        name: "DetailCommentInfo",
      props: {
          commentInfo: {
            type: Object,
            default() {
              return {}
            }
          }
      },
      filters: {
          showDate(date) {
            //将时间戳转成Date 对象
            //const date = new Date(value * 1000) //默认传入毫秒,时间戳*1000
            //将Date进行格式化
            return dataformat(date*1000)

          }
      }
    }
</script>

<style scoped>

</style>
