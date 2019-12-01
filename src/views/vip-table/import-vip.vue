<template>
  <div class="app-container">
    <div class="button-container">
        <!-- <el-button class="filter-item" type="primary" icon="el-icon-edit">
        导入
      </el-button> -->

      <el-upload
        class="upload-btn"
        :action="importUrl"
        :show-file-list= false
        :http-request="uploadFile"
        accept='.xls,.xlsx'
        >
        <el-button class="filter-item" type="primary" icon="el-icon-upload2">导入</el-button>
      </el-upload>
      <el-button class="filter-item" type="primary" icon="el-icon-download">
        <a href="static/template.xlsx"  download="导入模板">下载导入模板</a>
      </el-button>
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
      <el-table-column label="导入文件标题" width="150px" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.Title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="导入批次" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.ImportBatch}}</span>
        </template>
      </el-table-column>
       <el-table-column label="导入人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ImportUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总条数" width="100px" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.Total}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出错条数" width="100px" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.TotalError}}</span>
        </template>
      </el-table-column>
      <el-table-column label="导入时间" min-width="110px" align="center">
       <template slot-scope="scope">
          <span>{{ scope.row.CreatedDateStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"><a :href="scope.row.Path"> 文件下载</a></el-button>
          <el-button  size="mini" type="primary" @click="viewLog(scope.row)">查看日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { fetchData,upload } from '@/api/user'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  // name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        Page_index: 1,
        Page_size: 10
      },
      // importUrl:'https://admin.roche.jiappo.cn/User/VipUser/ImportUserVipExcel?access_token='+ this.$store.state.user.token,
      importUrl:'',
      apiUr:this.apiUrl
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() { // 获取列表数据
      this.listLoading = true
      fetchData('/User/VipUser/GetImportLogList',this.listQuery).then(response => {
        this.list = response.Data.Data
        this.total = response.Data.Count
        this.listLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    handleFilter() { // 搜索
      this.listQuery.Page_index = 1
      this.getList()
    },
    viewLog(row) { // 查看日志
     this.$alert(row.ErrorInfo, '查看日志', {
          confirmButtonText: '确定',
          callback: action => {   //确定时间
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
    },
    uploadFile(params){ //导入
      const _file = params.file
      let formData = new FormData()
      formData.append("file", _file)
      upload(formData).then(response => {
        this.$message({
          // title: '导入VIP',
          message: '导入VIP' + response.Message,
          type: response.Status == 0?'success':'error',
          duration: 2000
        });
        this.getList();
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.upload-btn{
  display: inline
}
</style>
