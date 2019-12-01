<template>
    <div class="form-style">
        <!-- <el-row :gutter="20">
            <el-col :span="24"><p>本次控糖训练任务</p></el-col>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-col :xs="24" :md="24">
                    <el-form-item label="排期时间：" prop="TaskPublishTime">
                       <el-date-picker v-model="ruleForm.TaskPublishTime" type="datetimerange" range-separator="——" start-placeholder="开始时间" end-placeholder="结束时间" :readonly="isView"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                     <el-form-item label="任务分类：" prop="TaskCategory">
                        <el-select v-model="ruleForm.TaskCategory" class="filter-item" placeholder="请选择类型" style="width:100%;" :disabled="isView">
                            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="人群标签：" prop="PersonTag">
                         <el-select v-model="ruleForm.PersonTag" class="filter-item" placeholder="请选择类型" style="width:100%;" :disabled="isView">
                            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="24">
                    <el-form-item label="任务说明：" prop="TaskDesc">
                        <el-input type="textarea" v-model="ruleForm.TaskDesc" placeholder="请输入任务说明" :readonly="isView"></el-input>
                    </el-form-item>
                </el-col>
                   <el-col :span="24"><p> 护士总结</p></el-col>
                 <el-col :xs="24" :md="24">
                    <el-form-item label="护士总结：" prop="NurseDesc">
                        <el-input type="textarea" v-model="ruleForm.NurseDesc" placeholder="请输入护士总结" :readonly="isView"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                    <el-form-item>
                        <el-button @click="prevPage">返回</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row> -->
         <set-task-form 
          :isView='true'
          v-if="hackReset"
          :itemData = itemData
          :taskData='{userId:itemData.UserId,sort:itemData.Sort,id:itemData.Id}' 
          :taskCategoryArr='taskCategoryArr' 
          :personTagArr='personTagArr'
          >
          </set-task-form>
    </div>
</template>
<script>
import { fetchData } from '@/api/user'
 import setTaskForm from '../task/components/setTaskForm'
  export default {
    components: { setTaskForm },
    data() {
      return {
        // isView:true,
        // ruleForm: {
        //   TaskPublishTime: '',
        //   TaskCategory: '',
        //   PersonTag: '',
        //   TaskDesc: '',
        //   NurseDesc: ''
        // },
    //     info:{
    //         name:'张三',
    //         mobile:'16325441125',
    //         wechat:'wx122',
    //         buyName:'李四',
    //         buyMobile:'14251558889'
    //     },
    //     value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    //  calendarTypeOptions:[
    //         { key: 'CN', display_name: 'China' },
    //         { key: 'US', display_name: 'USA' },
    //         { key: 'JP', display_name: 'Japan' },
    //         { key: 'EU', display_name: 'Eurozone' }
    //         ],
    //     rules: {
    //       name: [
    //         { required: true, message: '请输入活动名称', trigger: 'blur' },
    //         { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    //       ],
    //       region: [
    //         { required: true, message: '请选择活动区域', trigger: 'change' }
    //       ],
    //       date1: [
    //         { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    //       ],
    //       date2: [
    //         { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    //       ],
    //       type: [
    //         { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    //       ],
    //       resource: [
    //         { required: true, message: '请选择活动资源', trigger: 'change' }
    //       ],
    //       desc: [
    //         { required: true, message: '请填写活动形式', trigger: 'blur' }
    //       ]
    //     },
        itemData:{},
        rowData:{},
        taskCategoryArr:[],
        personTagArr:[],
        hackReset:false
      };
    },
    created() {
      this.rowData = this.$route.query;
      this.getPlanData();
      this.getKeyVal();
    },
    methods: {
       getPlanData() { // 获取排期当前数据 
        this.hackReset = false;
        fetchData('/User/VipUser/GetPlanListById',{Data:[this.rowData.PlanId]}).then(response => {
          if(response.Data){
            this.itemData = response.Data[0];
            this.$nextTick(() => {
              this.hackReset = true
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getKeyVal(){
        this.keyVal(this.str1,0);
        this.keyVal(this.str2,1);
      },
      keyVal(str,type){
          fetchData('/User/VipUser/GetKeyVals',{Data:str}).then(response => {
            if(response.Data){
                if(type == 0){
                    this.taskCategoryArr = response.Data;
                }else if(type == 1){
                    this.personTagArr = response.Data;
                }
            }
        }).catch(error => {
            console.log(error)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      prevPage(){
        this.$router.go(-1)
      }
    }
  }
</script>