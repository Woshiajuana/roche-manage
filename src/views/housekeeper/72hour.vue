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
                <template slot-scope="scope">
                    <span>{{ scope.row.BeforePlanTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="下次训练时间" width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.PlanTimeStr }}</span>
                </template>
            </el-table-column>
            <el-table-column label="下次训练期数" width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.NextPlan }}</span>
                </template>
            </el-table-column>
            <el-table-column label="自传血糖数据" width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.IsUploadSugar?'是':'否' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="拒绝次数" class-name="status-col" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.RefuseTel }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="520" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="isNoAnswer(row)">
                        拒绝接听
                    </el-button>
                    <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="isGiveUp(row)">
                        放弃服务
                    </el-button>
                    <el-button type="primary" size="mini" @click="taskFeedback(row)">
                        <!-- 任务反馈 -->
                        信息采集
                    </el-button>
                    <el-button type="primary" size="mini" @click="handleUpdate(row)">
                        血糖上传
                    </el-button>
                    <el-button v-if="row.status!='deleted'" size="mini" type="primary" @click="viewReports(row)">
                        <!-- 查看详情 -->
                        用户详情
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleCollectConfirm(row)">
                        <!-- 查看详情 -->
                        收集完成
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />
        <el-dialog title="信息采集" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="180px">
                <el-form-item label="体重指数">
                    <el-input v-model="temp.BMI" type="number" placeholder="请输入体重指数" on-keypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" />
                </el-form-item>
                <el-form-item label="糖化血红蛋白">
                    <el-input v-model="temp.RedProtein" type="number" placeholder="请输入糖化血红蛋白" on-keypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" />
                </el-form-item>
                <el-form-item label="糖化血红蛋白测试时间">
                    <el-date-picker v-model="temp.TestRedProtein" type="date" placeholder="请选择糖化血红蛋白测试时间" value-format=" yyyy-MM-dd" style="width: 100%;" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="temp.TaskBackRemark" type="textarea" placeholder="请输入备注" :rows="5" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="taskFeedbackFun">
                    确定
                </el-button>
            </div>
        </el-dialog>

        <el-dialog title="确定拒绝接听?" :visible.sync="isNoAnswerFormVisible">
            <el-form ref="isNoAnswerDataForm" :rules="rules" :model="isNoAnswerTemp" label-position="left" label-width="60px" style="width: 400px; margin-left:50px;">
                <el-form-item label="备注" prop="Remark">
                    <el-input type="textarea" v-model="isNoAnswerTemp.Remark" placeholder="请输入备注" style="width:400px;"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isNoAnswerFormVisible = false">
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
                    Stime: '',
                    Etime: '',
                    Name: '',
                    Mobile: '',
                    Page_index: 1,
                    Page_size: 10,
                    Scene: 8
                },
                dialogFormVisible: false,
                temp: {
                    BMI: '',
                    RedProtein: '',
                    TestRedProtein: '',
                    TaskBackRemark: ''
                },
                rules: {
                    BMI: [{ required: true, message: '请输入体重', trigger: 'change' }],
                    RedProtein: [{ required: true, message: '请尽量在第一次训练和末次训练前提供糖化血红蛋白值', trigger: 'change' }],
                    TestRedProtein: [{ required: true, message: '请选择糖化血红蛋白测试时间', trigger: 'change' }],
                    TaskBackRemark: [{ required: true, message: '请输入备注', trigger: 'change' }],
                    Remark: [{ required: true, message: '请输入备注', trigger: 'change' }]
                },
                isNoAnswerFormVisible: false,
                isNoAnswerTemp:{
                    UserId:'',
                    Remark:'',
                },
            }
        },
        created() {
            this.getList()
        },
        methods: {
            handleCollectConfirm (item) {
                let { UserId, PlanId } = item;
                console.log('item', item)
                this.$confirm('确定收集完成?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { // 确定
                    fetchData('/User/VipUser/SetSendPlan', {
                        IsQEHourOver: true,
                        UserId: UserId,
                        Id: PlanId,
                    }).then((response) => {
                        this.$message({
                            message: '操作'+response.Message,
                            type: response.Status == 0 ? 'success' : 'error',
                            duration: 2000
                        });
                        if (response.Status == 0) {
                            this.getList()
                        }
                    }).catch((error) => {

                    })
                }).catch(() => { // 取消
                });
            },
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
            isNoAnswer(row){  // 拒绝接听
                this.isNoAnswerTemp.Remark = '';
                this.isNoAnswerFormVisible = true;
                this.isNoAnswerTemp.PlanId = row.PlanId;
                this.isNoAnswerTemp.UserId = row.UserId;
                // this.getPlanData(row.PlanId);
            },
            updateData() { // 拒绝接听弹出框 提交
                this.$refs['isNoAnswerDataForm'].validate((valid) => {
                    if (valid) {
                        fetchData('/User/VipUser/SetRefuseTelByPlan', this.isNoAnswerTemp).then((response) => {
                            this.$message({
                                message: '拒绝接听提交' + response.Message,
                                type: response.Status == 0 ? 'success' : 'error',
                                duration: 2000
                            })
                            if (response.Status == 0) {
                                this.isNoAnswerFormVisible = false
                                this.getList()
                            }
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })
            },
            isGiveUp(row){  // 放弃服务
                this.getPlanData(row.PlanId);
                this.$confirm('确定放弃服务?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { // 确定
                    fetchData('/User/VipUser/SetGiveUp', {Data:this.isNoAnswerTemp.UserId}).then((response) => {
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
                this.dialogFormVisible = true;
                this.temp.BMI = '';
                this.temp.RedProtein = '';
                this.temp.TaskBackRemark = '';
                this.temp.PlanId = row.PlanId;
                this.temp.Id = row.PlanId;
                this.temp.UserId = row.UserId;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
                this.getPlanData(row.PlanId);
            },
            taskFeedbackFun() {
                this.$refs['dataForm'].validate((valid) => {
                    console.log(this.temp)
                    if (valid) {
                        fetchData('/User/VipUser/SetPlanInfo', this.temp).then((response) => {
                            this.$message({
                                message:  '任务反馈提交'+response.Message,
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
                        this.temp.UserId = res.UserId;
                        this.isNoAnswerTemp.UserId = res.UserId;

                        // if (res.HousekeeperDesc) {
                        //   this.temp.HousekeeperDesc = res.HousekeeperDesc
                        // }
                        // if (res.Weight) {
                        //   this.temp.Weight = res.Weight
                        // }
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

