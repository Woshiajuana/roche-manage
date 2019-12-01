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
      <el-table-column label="本次排期时间" min-width="140px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.PlanTimeStr }} {{ scope.row.Hour>9?scope.row.Hour:'0'+scope.row.Hour }}:00 </span>
        </template>
      </el-table-column>
      <el-table-column label="排期次" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.PlanSort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传数据" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.IsUploadSugar?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.status!='deleted'" size="mini" type="primary" @click="viewReports(row)">
            查看报告
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
        Stime: '',
        Etime: '',
        Name: '',
        Mobile: '',
        Page_index: 1,
        Page_size: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取列表数据
      this.listLoading = true
      fetchData('/User/VipUser/GetTaskReportList', this.listQuery).then(response => {
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
    viewReports(row) { // 查看报告
      this.$router.push({
        path: '/view-reports',
        query: row
      })
    }
  }
}
</script>

