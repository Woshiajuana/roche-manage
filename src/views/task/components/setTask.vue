<template>
  <el-collapse v-if="hasPlanTime" accordion>
    <template v-for="(item,key) in list">
      <el-collapse-item :key="key">
        <template slot="title">
          <span class="line-span">任务时间：{{ item.PlanTimeStr }}  {{ item.Hour>9?item.Hour:'0'+item.Hour }}:00</span>
          <!-- <span class='line-span' v-if='item.TaskCategory'>任务类型：{{taskCategoryArr[item.TaskCategory].Key}}</span> -->
        </template>
        <div>
          <set-task-form
            v-if="hackReset"
            :updata-list="getList"
            :item-data="item"
            :task-data="{userId:item.UserId,sort:item.Sort,id:item.Id,Name:item.Name,Weight:item.Weight}"
            :task-category-arr="taskCategoryArr"
            :person-tag-arr="personTagArr"
            :task-name-arr="taskNameArr"
          />
        </div>
      </el-collapse-item>
    </template>
  </el-collapse>
  <div v-else class="noData"> 未生成排期,无任务数据 </div>
</template>
<script>
import { fetchData } from '@/api/user'
import setTaskForm from './setTaskForm'

export default {
  name: 'SetTask',
  components: { setTaskForm },
  props: {
    userId: {
      type: String
    }
  },
  data() {
    return {
      list: [],
      taskCategoryArr: [],
      personTagArr: [],
      taskNameArr: [],
      hackReset: false,
      hasPlanTime: true
    }
  },
  created() {
    //this.getKeyVal()
    this.getList()
  },
  methods: {
    getList() { // 获取排期数据
      this.hackReset = false
      fetchData('/User/VipUser/GetPlanList', { Data: this.userId }).then(response => {
        if (response.Data) {
          this.list = response.Data
          this.$nextTick(() => {
            this.hackReset = true
          })
          // console.log(this.taskCategoryArr[this.list[0].TaskCategory].Key)
        }
        if (response.Data.length == 0) {
          this.hasPlanTime = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getKeyVal() {
      // 任务分类
      // let str1 = '5224d6ba56e246498b253ac670c6059b'
      this.keyVal(this.str1, 0)
      // 人群标签
      // let str2 = 'cc0d4a2bc44341158a41562f6b530690'
      this.keyVal(this.str2, 1)
      // 任务名称
      this.keyVal(this.str3, 2)
    },
    keyVal(str, type) {
      fetchData('/User/VipUser/GetKeyVals', { Data: str }).then(response => {
        if (response.Data) {
          if (type == 0) {
            this.taskCategoryArr = response.Data
          } else if (type == 1) {
            this.personTagArr = response.Data
          } else if (type == 2) {
            this.taskNameArr = response.Data
            console.log(this.taskArr)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.line-span{
    padding-right: 50px;
}
.noData{
    line-height: 60px;
    color: #909399;
    text-align: center;
}
</style>
