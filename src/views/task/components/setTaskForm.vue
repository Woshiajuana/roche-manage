<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24"><p>本次控糖训练任务</p></el-col>
      <el-form ref="TaskForm" :model="TaskForm" :rules="rules" label-width="120px" class="demo-ruleForm">

        <el-col :xs="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="排期日期：" prop="PlanTime">
            <!-- <el-date-picker v-model="TaskForm.time" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :readonly="isView"></el-date-picker> -->
            <el-date-picker v-model="TaskForm.PlanTime" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" :readonly="isView" style="width:100%;" />

          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="排期时间：" prop="Hour">
            <el-select v-model="TaskForm.Hour" class="filter-item" placeholder="请选择时间" style="width:100%;" :disabled="isView">
              <el-option v-for="item in hourArr" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="任务名称：" prop="Name">
            <el-select v-model="TaskForm.Name" class="filter-item" placeholder="请选择任务名称" style="width:100%;" :disabled="isView">
              <el-option v-for="item in taskNameArr" :key="item.Id" :label="item.Key" :value="item.Key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="任务分类：" prop="TaskCategory">
            <el-select v-model="TaskForm.TaskCategory" class="filter-item" placeholder="请选择任务分类" style="width:100%;" :disabled="isView">
              <el-option v-for="item in taskCategoryArr" :key="item.Id" :label="item.Key" :value="item.Id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="人群标签：" prop="PersonTag">
            <el-select v-model="TaskForm.PersonTag" class="filter-item" placeholder="请选择人群标签" style="width:100%;" :disabled="isView">
              <el-option v-for="item in personTagArr" :key="item.Id" :label="item.Key" :value="item.Id" />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="体重：" prop="Weight">
                        <el-input type="number" v-model="TaskForm.Weight" placeholder="请输入体重" :readonly="isView" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                    </el-form-item>
                </el-col> -->
        <!-- <el-col :xs="24" :md="24">
                    <el-form-item label="任务内容：" prop="TaskDesc">
                        <el-input type="textarea" v-model="ruleForm.TaskDesc" placeholder="请输入任务说明" :readonly="isView"></el-input>
                    </el-form-item>
                </el-col> -->
        <!-- 请输入任务说明 -->
        <el-col :xs="24" :md="24">
          <el-form-item label="任务说明：">
            <div v-if="TaskDesc_show" :contenteditable="isView?false:true" class="desc-div" @focus="inpFocus(0,&quot;TaskDesc&quot;)">
              <span v-for="(item,key) in itemData.TaskDesc" :key="key">{{ item }}</span>
            </div>
            <el-input v-else ref="TaskDesc" v-model="TaskForm.TaskDesc" type="textarea" placeholder="请输入任务说明" :readonly="isView" :rows="5" @blur="inpBlur(0,&quot;TaskDesc&quot;)" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24">
          <el-form-item>
            <template v-if="!isView">
              <el-button type="primary" @click="submitForm('TaskForm',1)">开始任务</el-button>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="24"><p> 护士总结</p></el-col>
        <!-- 请输入护士总结  -->
        <el-col v-if="has_NurseDesc" :xs="24" :md="24">
          <el-form-item label="护士总结：">
            <div v-if="NurseDesc_show" :contenteditable="isView?false:true" class="desc-div" @focus="inpFocus(1,&quot;NurseDesc&quot;)">
              <span v-for="(item,key) in itemData.NurseDesc" :key="key">{{ item }}</span>
            </div>
            <el-input v-else ref="NurseDesc" v-model="TaskForm.NurseDesc" type="textarea" placeholder="请输入护士总结" :readonly="isView" :rows="5" @blur="inpBlur(1,&quot;NurseDesc&quot;)" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24">
          <el-form-item>
            <template v-if="!isView">
              <el-button type="primary" @click="submitForm('TaskForm',2)">保存</el-button>
              <el-button v-if="itemData.TaskType == 2 || itemData.TaskType == 1" type="primary" @click="sendTask">发送管家</el-button>
              <!-- <el-button @click="resetForm('TaskForm')">重置</el-button> -->
            </template>
            <el-button @click="prevPage">返回</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { fetchData } from '@/api/user'

export default {
  name: 'SetTaskForm',
  props: {
    taskData: {
      type: Object,
      default: () => {
        return {
          id: '',
          userId: '',
          sort: '',
          Name: ''
          // Weight:''
        }
      }
    },
    itemData: {
      type: Object
      // default: () => {
      //     return {
      //         id:'',
      //         userId: '',
      //         sort: ''
      //     }
      // }
    },

    taskCategoryArr: {
      type: Array
    },
    personTagArr: {
      type: Array
    },
    taskNameArr: {
      type: Array
    },
    updataList: {
      type: Function,
      default: null
    },
    isView: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      ruleForm: {},
      rules: {
        PlanTime: [
          { required: true, message: '请选择排期日期', trigger: 'change' }
        ],
        Hour: [{ required: true, message: '请选择排期时间', trigger: 'change' }],
        taskName: [
          { required: true, message: '请选择任务名称', trigger: 'change' }
        ],
        //   Weight: [
        //     { required: true, message: '请输入体重', trigger: 'change' }
        //   ],
        TaskCategory: [
          { required: true, message: '请选择任务分类', trigger: 'blur' }
        ],
        PersonTag: [
          { required: true, message: '请选择人群标签', trigger: 'blur' }
        ],
        TaskDesc: [
          { required: true, message: '请输入任务说明', trigger: 'blur' }
        ],
        NurseDesc: [
          { required: true, message: '请输入护士总结', trigger: 'blur' }
        ]
      },
      hourArr: [9, 10, 11, 13, 14, 15, 16, 17],
      // isView:false,
      rowData: {},
      TaskForm: {
        PlanTime: '',
        Hour: '',
        TaskCategory: '',
        PersonTag: '',
        TaskDesc: '',
        NurseDesc: '',
        Name: ''
        // Weight:''
      },
      TaskDesc_show: false,
      NurseDesc_show: false,
      has_NurseDesc: false
    }
  },
  created() {
    this.initData()
    console.log(this.itemData)
  },
  methods: {
    initData() {
      if (this.itemData.TaskType == 2 || this.itemData.TaskType == 1) {
        this.has_NurseDesc = true
      }
      this.TaskForm.Name = this.itemData.Name
      // this.TaskForm.Weight = this.itemData.Weight
      this.TaskForm.Hour = this.itemData.Hour

      // if(this.itemData.StageBeginTimeStr && this.itemData.StageEndTimeStr){
      //     this.TaskForm.time = [this.itemData.StageBeginTimeStr,this.itemData.StageEndTimeStr]
      // };

      this.TaskForm.PlanTime = this.itemData.PlanTimeStr
      this.TaskForm.TaskCategory = this.itemData.TaskCategory
      this.TaskForm.PersonTag = this.itemData.PersonTag
      // this.TaskForm.TaskDesc = this.itemData.TaskDesc
      // this.TaskForm.NurseDesc = this.itemData.NurseDesc
      console.log(this.itemData.TaskDesc)
      if (this.itemData.TaskDesc) {
        this.itemData.TaskDesc = this.itemData.TaskDesc.split('；')
        this.itemData.TaskDesc.reverse() // 倒序
        this.TaskDesc_show = true
      }
      if (this.itemData.NurseDesc) {
        this.itemData.NurseDesc = this.itemData.NurseDesc.split('；')
        this.itemData.NurseDesc.reverse()
        this.NurseDesc_show = true
      }
    },
    inpFocus(e, name) {
      if (this.isView) return
      e == 0 ? this.TaskDesc_show = false : e == 1 ? this.NurseDesc_show = false : ''
      this.$nextTick(() => {
        this.$refs[name].focus()
      })
    },
    inpBlur(e, name) {
      if (this.TaskForm[name].length > 0) return
      if (this.itemData.TaskDesc) {
        e == 0 ? this.TaskDesc_show = true : e == 1 ? this.NurseDesc_show = true : ''
      }
    },
    submitForm(formName, TaskType) { // 保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = {
            // Name:this.TaskForm.Name,
            // Weight:this.TaskForm.Weight,
            Id: this.taskData.id,
            UserId: this.taskData.userId,
            Sort: this.taskData.sort,
            // Hour:this.TaskForm.Hour,
            // PlanTime:this.TaskForm.PlanTime,
            // TaskCategory:this.TaskForm.TaskCategory,
            // PersonTag:this.TaskForm.PersonTag,
            TaskType: this.has_NurseDesc ? TaskType : TaskType // 建任务1，总结传2
          }
          // this.TaskForm.TaskDesc.length>0?datas.TaskDesc=this.TaskForm.TaskDesc:datas.TaskType = 2;
          // this.TaskForm.NurseDesc.length>0?datas.NurseDesc=this.TaskForm.NurseDesc:datas.TaskType = 1;

          if (TaskType == 1) {
            datas.Name = this.TaskForm.Name
            datas.Hour = this.TaskForm.Hour
            datas.PlanTime = this.TaskForm.PlanTime
            datas.TaskCategory = this.TaskForm.TaskCategory
            datas.PersonTag = this.TaskForm.PersonTag
            datas.TaskDesc = this.TaskForm.TaskDesc
          } else if (TaskType == 2) {
            datas.NurseDesc = this.TaskForm.NurseDesc
          }

          console.log(datas)
          fetchData('/User/VipUser/SetTask', datas).then(response => {
            this.$message({
              title: '设置任务',
              message: '设置任务'+response.Message,
              type: response.Status == 0 ? 'success' : 'error',
              duration: 2000
            })
            this.updataList()
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sendTask() { // 发送给管家
      this.$confirm('确定发送给管家?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定
        fetchData('User/VipUser/SendTask', { Data: this.taskData.id }).then(response => {
          this.$message({
            // title: '发送给管家',
            message: '发送给管家'+response.Message,
            type: response.Status == 0 ? 'success' : 'error',
            duration: 2000
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => { })// 取消
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    prevPage() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>

.desc-div{
    height: 120px;
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    /* color: #606266; */
    color: #c0c4cc;
    background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    overflow-y: auto;
    overflow-x: hidden;
}
.desc-div > span{
    display: inline-block;
    width: 100%;
}
</style>

