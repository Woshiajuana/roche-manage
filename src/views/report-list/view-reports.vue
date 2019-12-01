<template>
    <div class="form-style">
        <el-row :gutter="20">
            <el-col :span="24"><p>本次控糖训练任务</p></el-col>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-col :xs="24" :md="24">
                    <el-form-item label="排期时间：" prop="name">
                       <el-date-picker v-model="value1" type="datetimerange" range-separator="——" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                     <el-form-item label="任务分类：" prop="name">
                        <el-select v-model="ruleForm.type" class="filter-item" placeholder="请选择类型" style="width:100%;">
                            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="人群标签：" prop="name">
                         <el-select v-model="ruleForm.type" class="filter-item" placeholder="请选择类型" style="width:100%;">
                            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="24">
                    <el-form-item label="任务内容：" prop="name">
                       <el-select v-model="ruleForm.type" class="filter-item" placeholder="请选择类型" style="width:100%;">
                            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="24">
                    <el-form-item label="任务说明：" prop="name">
                        <el-input type="textarea" v-model="ruleForm.name" placeholder="请输入任务说明"></el-input>
                    </el-form-item>
                </el-col>
                   <el-col :span="24"><p> 护士总结</p></el-col>
                 <el-col :xs="24" :md="24">
                    <el-form-item label="护士总结：" prop="name">
                        <el-input type="textarea" v-model="ruleForm.name" placeholder="请输入护士总结"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                    <el-form-item>
                        <el-button @click="prevPage">返回</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

         <set-task-form 
          :itemData = rowData
          :taskData='{userId:item.UserId,sort:item.Sort,id:item.Id}' 
          :taskCategoryArr='taskCategoryArr' 
          :personTagArr='personTagArr'
          >
          </set-task-form>
    </div>
</template>
<script>
 import setTaskForm from '../task/components/setTaskForm'
  export default {
    components: { setTaskForm },
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        info:{
            name:'张三',
            mobile:'16325441125',
            wechat:'wx122',
            buyName:'李四',
            buyMobile:'14251558889'
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
     calendarTypeOptions:[
            { key: 'CN', display_name: 'China' },
            { key: 'US', display_name: 'USA' },
            { key: 'JP', display_name: 'Japan' },
            { key: 'EU', display_name: 'Eurozone' }
            ],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        rowData:{},
        taskCategoryArr:[],
        taskCategoryArr:[]
      };
    },
    created() {
    //  console.log(this.$router.currentRoute.query)
      console.log(this.$route.query)
      this.rowData = this.$route.query;
      this.keyVal()
    },
    methods: {
      getData(){
        fetchData('User/VipUser/SendTask',{Data:this.taskData.id}).then(response => {
            this.$message({
                // title: '发送给管家',
                message: '发送给管家'+response.Message,
                type: response.Status == 0?'success':'error',
                duration: 2000
            });
        }).catch(error => {
            console.log(error)
        })
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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