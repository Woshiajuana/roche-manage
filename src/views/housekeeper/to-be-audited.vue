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
      <el-table-column label="核销码" min-width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180px" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.CreatedDateStr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="isAudit(row)">
             立即核销
          </el-button>
           <el-button v-if="row.status!='deleted'" size="mini" type="primary" @click="viewReports(row)">
            查看信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />
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
        Scene:3 // 用户待核销
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取列表数据
      this.listLoading = true
      fetchData('/User/VipUser/getImportUserVipList',this.listQuery).then(response => {
        if(response.Data){
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
    handleRefresh(){  //重置
      this.listQuery.Stime = '';
      this.listQuery.Etime = '';
      this.listQuery.Name = '';
      this.listQuery.Mobile = '';
      this.getList()
    },
    viewReports(row){ // 查看信息
     
      row.isView = true;
      this.$router.push({
          path: '/user-archiving',
          query: row
      })
    },
    isAudit(row) {  // 核销
      this.$confirm('确定立即核销?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          fetchData('/User/VipUser/ActiveCode', {Data:row.Id}).then((response) => {
              this.$message({
                // title: '确定立即核销',
                message: '立即核销'+response.Message,
                type: response.Status == 0?'success':'error',
                duration: 2000
              });
               this.getList();
            }).catch((error) => {
                console.log(error)
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消核销'
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
