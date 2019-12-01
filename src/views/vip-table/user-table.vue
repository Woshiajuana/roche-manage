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
    <div class="button-container">
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button> -->
      <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button> -->
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
      <el-table-column label="购买人姓名" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.BuyUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买人手机" class-name="status-col" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.BuyUserMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" class-name="status-col" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.CreatedDateStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" class-name="status-col" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ImportUserID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="temp.Name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="Mobile">
          <el-input v-model="temp.Mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="微信号" prop="WxNo">
          <el-input v-model="temp.WxNo" placeholder="请输入微信号" />
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-radio-group v-model="temp.Sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="购买人姓名" prop="BuyUser">
          <el-input v-model="temp.BuyUser" placeholder="请输入购买人姓名" />
        </el-form-item>
        <el-form-item label="购买人电话" prop="BuyUserMobile">
          <el-input v-model="temp.BuyUserMobile" placeholder="请输入购买人电话" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
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
        Scene: 1
      },
      showReviewer: false,
      temp: {
        id: undefined,
        Name: '',
        Mobile: '',
        WxNo: '',
        Sex: '',
        BuyUser: '',
        BuyUserMobile: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      // dialogPvVisible: false,
      pvData: [],
      rules: {
        Name: [
          { required: true, message: '请输入使用者姓名', trigger: 'change' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        Mobile: [
          { required: true, message: '请输入使用人手机号', trigger: 'change' },
          { validator: (rule, value, callback) => {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            console.log(reg.test(value))
            if (reg.test(value)) {
              callback()
            } else {
              return callback(new Error('请输入正确的手机号'))
            }
          }, trigger: 'change' }
        ],
        WxNo: [{ required: true, message: '请输入微信号', trigger: 'change' }],
        Sex: [{ required: true, message: '请选择姓别', trigger: 'change' }],
        BuyUser: [{ required: true, message: '请输入购买人姓名', trigger: 'change' }],
        BuyUserMobile: [
          { required: true, message: '请输入购买人手机', trigger: 'change' },
          { validator: (rule, value, callback) => {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            console.log(reg.test(value))
            if (reg.test(value)) {
              callback()
            } else {
              return callback(new Error('请输入正确的手机号'))
            }
          }, trigger: 'change' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取列表数据
      this.listLoading = true
      fetchData('/User/VipUser/getImportUserVipList', this.listQuery).then(response => {
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
    resetTemp() { // 新增重置数据
      this.temp = {
        Id: undefined,
        Name: '',
        Mobile: '',
        Sex: '',
        BuyUser: '',
        BuyUserMobile: ''
      }
    },
    handleCreate() { // 新增按钮
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() { // 弹出框 新增确定 提交
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dataFun(this.temp)
        }
      })
    },
    handleUpdate(row) { // 编辑按钮
      this.temp = Object.assign({}, row) // copy obj
      if(this.temp.Sex){
        this.temp.Sex = (this.temp.Sex).toString();
      };
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() { // 弹出框 编辑确定 提交
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(this.temp)
          var editData = {
            Id: this.temp.Id,
            Name: this.temp.Name,
            Mobile: this.temp.Mobile,
            WxNo: this.temp.WxNo,
            Sex: this.temp.Sex,
            BuyUser: this.temp.BuyUser,
            BuyUserMobile: this.temp.BuyUserMobile
          }
          this.dataFun(editData)
        }
      })
    },
    dataFun(data) {
      fetchData('/User/VipUser/SaveUserArchive', data).then((response) => {
        this.$message({
          // title: this.textMap[this.dialogStatus],
          message: this.textMap[this.dialogStatus] + response.Message,
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
    },
    handleDelete(row) { // 删除
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定
        fetchData('/User/VipUser/DeleUserById', { Data: row.Id }).then((response) => {
          if (response.Status == 0) {
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
          }
          this.$message({
            title: '用户删除',
            message: '用户删除'+response.Message,
            type: response.Status == 0 ? 'success' : 'error',
            duration: 2000
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => { // 取消
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
    // handleDownload() { // 导出
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const data = this.formatJson(filterVal, this.list)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: 'table-list'
    //     })
    //     this.downloadLoading = false
    //   })
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // }
  }
}
</script>
