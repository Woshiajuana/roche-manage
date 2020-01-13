<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-form ref="pageForm" :inline="true" :model="listQuery" class="demo-form-inline">
          <el-col :span="4">
            <el-form-item label="姓名">
              <el-input v-model="listQuery.Name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="手机">
              <el-input v-model="listQuery.Mobile" placeholder="请输入手机" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建时间">
              <el-row>
                <el-col :span="9">
                  <el-form-item prop="date1">
                    <el-date-picker v-model="listQuery.Stime" type="date" placeholder="开始日期" value-format=" yyyy-MM-dd" style="width: 100%;" />
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">——</el-col>
                <el-col :span="9">
                  <el-form-item prop="date2">
                    <el-date-picker v-model="listQuery.Etime" type="date" placeholder="结束日期" value-format=" yyyy-MM-dd" style="width: 100%;" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button size="small" class="filter-item" type="primary" icon="el-icon-refresh" @click="handleRefresh()">重置</el-button>
                </el-col>

              </el-row>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>

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
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Mobile }}</span>
        </template>
      </el-table-column>
       <el-table-column label="微信号" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.WxNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓别" width="50px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Sex == 1?'男':'女' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次训练时间" width="150px" align="center">
        <template slot-scope="scope" v-if="scope.row.BeforePlanTime" >
          <span>{{ scope.row.BeforePlanTime }}  {{ scope.row.Hour>9?scope.row.Hour:'0'+scope.row.Hour}}:00</span>
        </template>
      </el-table-column>
      <el-table-column label="本次训练时间" width="150px" align="center">
        <template slot-scope="scope" v-if="scope.row.AfterPlanTime" >
          <span>{{ scope.row.PlanTimeStr }}  {{ scope.row.Hour>9?scope.row.Hour:'0'+scope.row.Hour }}:00</span>
        </template>
      </el-table-column>
      <el-table-column label="本次训练期数" width="150px" align="center">
        <template slot-scope="scope" v-if="scope.row.Sort">
          <span>{{scope.row.Sort}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
           <el-button v-if="row.status!='deleted'" size="mini" type="primary" @click="getWords(row)">
            获取文案提醒
          </el-button>
          <el-button v-if="!row.IsSendMsg" type="primary" size="mini" @click="wordsSend(row)">
            是否已发送
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />
    <el-dialog title="发送" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px">
        <el-form-item label="请选择" prop="IsSendMsg">
          <el-select v-model="temp.IsSendMsg" placeholder="是否已发送">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="isSendFun">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '@/api/user'
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        Stime: '',
        Etime: '',
        Name: '',
        Mobile: '',
        Page_index: 1,
        Page_size: 10,
        Scene: 9
      },
      dialogFormVisible: false,
      temp: {
        IsSendMsg: '',
      },
      rules: {
        IsSendMsg: [{ required: true, message: '请选择', trigger: 'change' }]
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取列表数据
      this.listLoading = true
        fetchData('/User/VipUser/GetTrainPlanList', this.listQuery).then(response => {
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
    handleRefresh() { // 重置
      this.listQuery.Stime = ''
      this.listQuery.Etime = ''
      this.listQuery.Name = ''
      this.listQuery.Mobile = ''
      this.getList()
    },
    viewReports(row) { // 查看详情
      row.isView = true
      this.$router.push({
        path: '/user-archiving',
        query: row
      })
    },
    handleUpdate(row) { // 血糖上传
      this.$router.push({
        path: '/bloodSugarInfo',
        query: row
      })
    },
    getWords(row){  // 获取提醒文案
    var temp = {
      PlanId:row.PlanId,
      Id:row.PlanId,
      UserId: row.UserId
    }
     fetchData('/User/VipUser/GetSendPlanMsg', temp).then((response) => {
       if(response.Data){
         let str = response.Data
        this.$alert(str, '文案提醒', {
            confirmButtonText: '确定',
            callback: action => {
              //确定事件
            }
          });
       }
      }).catch((error) => {
          console.log(error)
      })

    },
    wordsSend(row){
      this.dialogFormVisible = true;
      this.temp.IsSendMsg = '';
      this.temp.Id = row.PlanId;
      this.temp.UserId = row.UserId;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      });
    },
     isSendFun() { // 是否已发送
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          fetchData('/User/VipUser/SetSendPlan', this.temp).then((response) => {
            this.$message({
              message:  '已发送'+response.Message,
              type: response.Status == 0 ? 'success' : 'error',
              duration: 2000
            })
            if (response.Status == 0) {
              this.dialogFormVisible = false
              this.getList()
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    },
    handleDelete(row) { // 删除
      fetchData('/User/VipUser/DeleUserById', { Data: row.Id }).then((response) => {
        debugger
        this.$message({
          // title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(() => {

      })
    },
    taskFeedback(row) {
      this.dialogFormVisible = true
      this.temp.Weight = ''
      this.temp.HousekeeperDesc = ''
      this.temp.Id = row.PlanId
      this.temp.UserId = row.Id
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getPlanData(row.PlanId)
    },
    taskFeedbackFun() { // 任务反馈 提交
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.temp)
        if (valid) {
          fetchData('/User/VipUser/SetPlan', this.temp).then((response) => {
            this.$message({
              // title: '任务反馈',
              message:  '任务反馈'+response.Message,
              type: response.Status == 0 ? 'success' : 'error',
              duration: 2000
            })
            if (response.Status == 0) {
              this.dialogFormVisible = false
              this.getList()
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    },
    getPlanData(PlanId) { // 获取排期当前数据
      this.hackReset = false
      fetchData('/User/VipUser/GetPlanListById', { Data: [PlanId] }).then(response => {
        if (response.Data) {
          const res = response.Data[0]
          if (res.HousekeeperDesc) {
            this.temp.HousekeeperDesc = res.HousekeeperDesc
          }
          if (res.Weight) {
            this.temp.Weight = res.Weight
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

