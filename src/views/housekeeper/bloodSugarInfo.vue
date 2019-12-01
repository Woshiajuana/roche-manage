<template>
  <div class="app-container">
    <p class="p-title">血糖信息</p>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" width="50" align="center" />
      <!-- <el-table-column label="次数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Time }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="测试时间" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.TestDateStr +"  "+ scope.row.TestTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="餐点" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.TimeStepStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="血糖值" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Bloodsugar }}</span>
        </template>
      </el-table-column>
      <el-table-column label="血糖状态" class-name="status-col" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.GlsStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />
    <p class="p-title">新增血糖记录</p>
    <el-row :gutter="20">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-col :xs="24" :md="12" :lg="12" :xl="6">
          <el-form-item label="日期：" prop="TestDate">
            <el-date-picker v-model="ruleForm.TestDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="12" :xl="6">
          <el-form-item label="时间：" prop="TestTime">
            <el-time-picker v-model="ruleForm.TestTime" value-format="HH:mm:ss" placeholder="请选择时间" style="width:100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="12" :xl="6">
          <el-form-item label="餐点：" prop="TimeStep">
            <el-select v-model="ruleForm.TimeStep" class="filter-item" placeholder="请选择餐点" style="width:100%;">
              <el-option v-for="item in TimeStepEnum" :key="item.val" :label="item.name" :value="item.val" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="12" :xl="6">
          <el-form-item label="血糖值：" prop="Bloodsugar">
            <el-input v-model="ruleForm.Bloodsugar" placeholder="请输入血糖值" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="备注：">
            <el-input v-model="ruleForm.Remark" type="textarea" placeholder="请输入注" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="prevPage">返回</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { fetchData, upload } from '@/api/user'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  // name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      TimeStepEnum: [
        { val: '1', name: '空腹' },
        { val: '2', name: '早餐后' },
        { val: '3', name: '午餐前' },
        { val: '4', name: '午餐后' },
        { val: '5', name: '晚餐前' },
        { val: '6', name: '晚餐后' },
        { val: '7', name: '睡前' }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        Page_index: 1,
        Page_size: 10
      },
      ruleForm: {
        UserId: '',
        TimeStep: '',
        TestDate: '',
        TestTime: '',
        RedProtein: '',
        Remark: ''
      },
      rules: {
        TimeStep: [{ required: true, message: '请选择餐点', trigger: 'change' }],
        TestDate: [{ required: true, message: '请输入日期', trigger: 'change' }],
        TestTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        Bloodsugar: [{ required: true, message: '请输入血糖值', trigger: 'change' }],
        Remark: [{ required: true, message: '请输入备注', trigger: 'change' }]

      }
    }
  },
  created() {
    this.ruleForm.UserId = this.$route.query.UserId
    this.ruleForm.PlanId = this.$route.query.PlanId
    this.getList()
  },
  methods: {
    getList() { // 获取列表数据
      this.listLoading = true
      this.listQuery.UserId = this.ruleForm.UserId
      fetchData('/User/VipUser/GetTestSugarList', this.listQuery).then(response => {
        if (response.Data) {
          this.list = response.Data.Data
          this.total = response.Data.Count
        }
        this.listLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    handleFilter() { // 搜索
      this.listQuery.Page_index = 1
      this.getList()
    },
    handleDelete(row) { // 删除
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定
        fetchData('/User/VipUser/DeleTestSugarById', { Data: row.Id }).then((response) => {
          if (response.Status == 0) {
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
          }
          this.$message({
            // title: '血糖信息删除',
            message:'血糖信息删除'+ response.Message,
            type: response.Status == 0 ? 'success' : 'error',
            duration: 2000
          })
          this.getList()
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => { // 取消
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          fetchData('/User/VipUser/SetTestSugar', this.ruleForm).then(response => {
            this.$message({
              // title: '血糖上传',
              message: '血糖上传'+response.Message,
              type: response.Status == 0 ? 'success' : 'error',
              duration: 2000
            })
            this.resetForm('ruleForm')
            this.getList()
            //  this.prevPage();
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
.upload-btn{
  display: inline
}
.p-title {
    background-color: #E6E6E6;
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
    padding-left: 20px;
}
</style>
