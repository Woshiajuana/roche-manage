<template>
  <div class="app-container">
    <div class="filter-container">
        <el-row>
        <el-form ref="pageForm" :inline="true" :model="listQuery" class="demo-form-inline">
             <el-col :span="4">
                <el-form-item label="姓名">
                    <el-input v-model="listQuery.Name" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="手机">
                    <el-input v-model="listQuery.Mobile" placeholder="请输入手机"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="创建时间">
                   <el-row>
                    <el-col :span="9">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="开始日期" value-format=" yyyy-MM-dd" v-model="listQuery.Stime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">——</el-col>
                    <el-col :span="9">
                        <el-form-item prop="date2">
                            <el-date-picker type="date" placeholder="结束日期" value-format=" yyyy-MM-dd" v-model="listQuery.Etime" style="width: 100%;"></el-date-picker>
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
    <div class="button-container"></div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" width="50"  align="center"></el-table-column>
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
       <el-table-column label="导入日期" class-name="status-col" min-width="110" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.ImportTimeStr }}</span>
        </template>
      </el-table-column>
       <el-table-column label="创建人" class-name="status-col" min-width="110" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.ImportUserID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="首次电话日期" class-name="status-col" min-width="110" align="center">
        <template slot-scope="scope">
           <span>{{ scope.row.FirstVisitTimeStr }}</span>
        </template>
      </el-table-column>
       <!-- <el-table-column label="已电话次数" class-name="status-col" min-width="90" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.AcceptTel}}</span>
        </template>
      </el-table-column> -->
       <el-table-column label="拒绝次数" class-name="status-col" width="80" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.RefuseTel}}</span>
        </template>
      </el-table-column>
       <el-table-column label="创建时间" class-name="status-col" min-width="160" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.CreatedDateStr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
           <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="isNoAnswer(row)">
            拒绝接听
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="isGiveUp(row)">
            放弃服务
          </el-button>
          <el-button type="primary" size="mini" @click="setUserInfo(row)">
            {{row.IsArchives?'修改档案':'新建档案'}}
          </el-button>
          
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />
    <el-dialog title="确定拒绝接听?" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="60px" style="width: 400px; margin-left:50px;">
        <el-form-item label="备注" prop="Remark">
          <el-input type="textarea" v-model="temp.Remark" placeholder="请输入备注" style="width:400px;"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
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
        Stime:'',
        Etime:'',
        Name:'',
        Mobile:'',
        Page_index: 1,
        Page_size: 10,
        Scene:6 //管家待首访任务
      },
      dialogFormVisible: false,
      temp:{
        UserId:'',
        Remark:'',
      },
      rules: {
        Remark: [
          { required: true, message: '请输入备注', trigger: 'change' }
        ]
       }
      
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取列表数据
      this.listLoading = true
      fetchData('/User/VipUser/GetUserVipList',this.listQuery).then(response => {
        if(response.Data){
          this.list = response.Data.Data
          this.total = response.Data.Count
        };
        this.listLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    handleFilter() { // 搜索
      this.listQuery.Page_index = 1
      this.getList()
    },
    handleRefresh(){  //重置handleRefresh
      this.listQuery.Stime = '';
      this.listQuery.Etime = '';
      this.listQuery.Name = '';
      this.listQuery.Mobile = '';
      this.getList()
    },
     setUserInfo(row){ // 建立档案跳转
        this.$router.push({
            path: '/user-archiving',
            query: row
        })
    },
    isNoAnswer(row){  // 拒绝接听
      this.dialogFormVisible = true;
      this.temp.UserId = row.Id;
    },
     updateData() { // 拒绝接听弹出框 提交
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          fetchData('/User/VipUser/SetRefuseTel', this.temp).then((response) => {
            this.$message({
              message: '拒绝接听提交' + response.Message,
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
    isGiveUp(row){  // 放弃服务
     this.$confirm('确定放弃服务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { // 确定
            fetchData('/User/VipUser/SetGiveUp', {Data:row.Id}).then((response) => {
              this.$message({
                message: '确定放弃服务'+response.Message,
                type: response.Status == 0?'success':'error',
                duration: 2000
              });
               this.getList();
            }).catch((error) => {
                console.log(error)
            })
        }).catch(() => { // 取消
          this.$message({
            type: 'info',
            message: '已取消放弃服务'
          });          
        });
    },
    handleDelete(row) { // 删除
        fetchData('/User/VipUser/DeleUserById', {Data:row.Id}).then((response) => {
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
    }
  }
}
</script>