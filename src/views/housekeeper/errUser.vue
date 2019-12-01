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
      <el-table-column label="绑定小程序日期" class-name="status-col" width="160" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.CreatedDateStr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="核销码" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Code }}</span>
        </template>
      </el-table-column>
       <el-table-column label="首次电话日期" class-name="status-col" width="160" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.FirstVisitTimeStr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="拒绝接听次数" width="150px" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.RefuseTel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" class-name="status-col" width="160" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.CreatedDateStr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
            <template v-if='row.IsShowMerge'>
                <el-button type="primary" size="mini" @click="dataUpdate(row)">数据合并 </el-button>
            </template>
         
           <el-button v-if="row.status!='deleted'" size="mini" type="danger"  @click="isNoAnswer(row)">拒绝接听 </el-button>
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
      fetchData('/User/VipUser/GetOnlineUserAbList',this.listQuery).then(response => {
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
    handleRefresh(){  //重置
      this.listQuery.Stime = '';
      this.listQuery.Etime = '';
      this.listQuery.Name = '';
      this.listQuery.Mobile = '';
      this.getList()
    },
    dataUpdate(row) {  // 数据合并
        fetchData('/User/VipUser/SetMerageUserAb', {Data:row.Id}).then((response) => {
             debugger
             this.$message({
                // title: '数据合并',
                message: '数据合并'+response.Message,
                type: response.Status == 0?'success':'error',
                duration: 2000
              });
            this.getList()
          }).catch(() => {
              
          })
    },
    isNoAnswer(row){  // 拒绝接听
      this.dialogFormVisible = true;
      this.temp.UserId = row.Id;
    },
     updateData() { // 拒绝接听弹出框 提交
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          fetchData('/User/VipUser/SetRefuseTelByUserAb', this.temp).then((response) => {
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
  }
}
</script>

