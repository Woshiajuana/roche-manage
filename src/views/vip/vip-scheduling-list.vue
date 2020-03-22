<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-form ref="pageForm" :inline="true" :model="listQuery" class="demo-form-inline">
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input v-model="listQuery.Name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机">
                            <el-input v-model="listQuery.Mobile" placeholder="请输入手机"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="完成次数">
                            <el-select
                                clearable
                                v-model="listQuery.PlanComplete"
                                placeholder="请选择完成次数" >
                                <el-option value="1" label="一次"></el-option>
                                <el-option value="2" label="二次"></el-option>
                                <el-option value="3" label="三次"></el-option>
                                <el-option value="4" label="四次"></el-option>
                                <el-option value="5" label="五次"></el-option>
                                <el-option value="6" label="六次"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
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
            <el-table-column label="手机号" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.Mobile }}</span>
                </template>
            </el-table-column>
            <el-table-column label="导入日期" min-width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.ImportTimeStr}}</span>
                </template>
            </el-table-column>

            <el-table-column label="完成次数" min-width="80" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.PlanComplete}}</span>
                </template>
            </el-table-column>
            <el-table-column label="上次时间" min-width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.LastPlanTime}}</span>
                </template>
            </el-table-column>

            <el-table-column label="下次时间" min-width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.NextPlanTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button v-if="row.status!='deleted'" size="mini" type="primary" @click="handleSeeScheduling(row)">
                        查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />

        <el-dialog width="70%" title="查看排期" :visible.sync="objScheduling.is">
            <el-table
                key="objScheduling"
                :data="objScheduling.data"
                border
                fit
                highlight-current-row
                size="small"
                style="width: 100%;">
                <el-table-column label="序号" type="index" width="50" align="center" />
                <el-table-column label="排期日期" align="center" prod="PlanTimeStr">
                    <template slot-scope="scope">
                        <span>{{ scope.row.PlanTimeStr }}</span>
                        <!--<el-date-picker v-model="scope.row.PlanTimeStr" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:100%;" :readonly="true" />-->
                    </template>
                </el-table-column>
                <el-table-column label="排期时间" align="center">
                    <template slot-scope="scope">

                        <span>{{ scope.row.Hour }}</span>
                        <!--<el-select v-model="scope.row.Hour" class="filter-item" placeholder="请选择时间" style="width:100%;" :disabled="true">-->
                        <!--<el-option v-for="item in hourArr" :key="item" :label="item" :value="item" />-->
                        <!--</el-select>-->
                    </template>
                </el-table-column>

                <el-table-column label="备注" align="center">
                    <template slot-scope="scope">

                        <span>{{ scope.row.TaskRemarkCreate }}</span>
                        <!--<el-input v-model="scope.row.TaskRemarkCreate" class="filter-item" placeholder="请输入备注" style="width:100%;" :disabled="true" />-->
                    </template>
                </el-table-column>
                <el-table-column label="任务名称" align="center">
                    <template slot-scope="scope">
                        <span>{{ nameArr[scope.row.Sort-1] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否完成" align="center" width="80" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <span>{{ TaskTypeStr[scope.row.TaskType] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center"  width="300" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleSeeTaskList(scope.row)">查看任务</el-button>
                        <el-button type="text" @click="handleSeeBloodSugarScheme(scope.row)">控糖方案</el-button>
                        <el-button type="text" @click="handleSeeBloodSugar(scope.row)">查看血糖</el-button>
                        <el-button type="text" @click="handleSeeReport(scope.row)"  v-if="scope.$index !== 0">查看报告</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseSeeScheduling">
                    关闭
                </el-button>
            </div>
        </el-dialog>

        <el-dialog title="任务预览" :visible.sync="isTaskPreviewDialog">
            <dl v-for="(item,index) in arrTasks" :key="index">
                <dt>{{ index+1 }}、{{ item.CrowdLabel }}</dt>
                <dd style="padding-left: 10px">{{ item.TaskDec }}</dd>
            </dl>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isTaskPreviewDialog = false">
                    关闭
                </el-button>
            </div>
        </el-dialog>

        <el-dialog title="查看血糖" :visible.sync="objBlood.is">
            <el-table
                key="objBlood"
                :data="objBlood.data"
                border
                fit
                highlight-current-row
                style="width: 100%;">
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
            </el-table>
            <pagination v-show="objBlood.total>0" :total="objBlood.total"
                        :page.sync="objBlood.query.Page_index" :limit.sync="objBlood.query.Page_size" @pagination="getBloodSugarList" />
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseSeeBloodSugar">
                    关闭
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
                    Name:'',
                    Mobile:'',
                    Page_index: 1,
                    Page_size: 10,
                    PlanComplete: '',
                },
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
                    update: '查看详情',
                    create: '新增'
                },
                objScheduling: {
                    is: false,
                    data: [],
                    total: 0,
                    query: {
                        Page_index: 1,
                        Page_size: 10,
                    }
                },

                isTaskPreviewDialog: false,
                arrTasks: [],
                hourArr: [9, 10, 11, 13, 14, 15, 16, 17],
                TaskTypeStr: {
                    0: '未完成',
                    1: '未完成',
                    2: '已完成',
                    3: '预约中'
                },
                nameArr: [
                    '制定专属控糖方案',
                    '树立规范测糖理念',
                    '改善不良生活方式',
                    '掌握科学饮食方法',
                    '培养规律运动习惯',
                    '获得控糖指标改善'
                ],
                SugarTypeEnum: [
                    { val: '0', name: '无' },
                    { val: '1', name: 'I型糖尿病' },
                    { val: '2', name: 'II型糖尿病' },
                    { val: '3', name: '妊娠糖尿病' },
                    { val: '4', name: '其他类型糖尿病' },
                    { val: '5', name: '糖尿病前期' }
                ],
                InsulinMethodEnum: [
                    { val: '0', name: '无' },
                    { val: '1', name: '每天注射一次' },
                    { val: '2', name: '每天注射俩次' },
                    { val: '3', name: '每天注射三次或以上' }
                ],
                TreatmentPlanEnum: [
                    { val: '0', name: '无' },
                    { val: '1', name: '生活方式调整' },
                    { val: '2', name: '口服降糖药' },
                    { val: '3', name: '胰岛素' },
                    { val: '4', name: '口服降糖药+胰岛素' }
                ],
                ComplicationEnum: [
                    { val: '0', name: '无' },
                    { val: '1', name: '糖尿病肾病' },
                    { val: '2', name: '糖尿病视网膜病' },
                    { val: '3', name: '糖尿病足病' },
                    { val: '4', name: '糖尿病神经病变' },
                    { val: '5', name: '糖尿病心脑血管病' },
                    { val: '6', name: '其它' },
                    { val: '7', name: '无并发症' }
                ],
                objBlood: {
                    is: false,
                    data: [],
                    total: 0,
                    query: {
                        Page_index: 1,
                        Page_size: 10,
                    }
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            handleSeeBloodSugarScheme (item) {
                let { UserId } = item;
                window.open(`https://api.91jkys.com/medical/user/partner-user/report?pId=${UserId}&aId=roche`);
            },
            handleSeeReport (item) {
                let { TaskType, Id, UserId } = item;
                if (TaskType != 2)
                    return this.$message({
                        message: `该排期还没有报告哦！`,
                        type: 'info',
                        duration: 2000
                    });
                window.open(`https://api.rocheprogram.com/dist/adviser_report.html?userid=${UserId}&id=${Id}&v=${new Date().getTime()}`);
            },
            handleCloseSeeBloodSugar () {
                this.objBlood = { is: false, data: [], total: 0, query: { Page_index: 1, Page_size: 10 }};
            },
            getBloodSugarList () {
                fetchData('/User/VipUser/GetTestSugarListByPlan', this.objBlood.query).then(response => {
                    if (response.Data) {
                        this.objBlood.data = response.Data.Data;
                        this.objBlood.total = response.Data.Count
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            handleSeeBloodSugar (item) {
                this.handleCloseSeeBloodSugar();
                this.objBlood.query.UserId = item.UserId;
                this.objBlood.query.PlanId = item.Id;
                this.getBloodSugarList();
                this.objBlood.is = true;
            },

            handleSeeTaskList(item) {
                let { TaskRemarkDetail } = item;
                this.arrTasks = [];
                fetchData('/User/VipUser/GetTrainPatientUsers', {
                    Data: item.TrainPatientIds
                }).then(response => {
                    this.arrTasks = (response && response.Data) || [];
                    if (this.arrTasks.length) {
                        this.arrTasks.push({ CrowdLabel: '备注', TaskDec: TaskRemarkDetail || '无' });
                        this.isTaskPreviewDialog = true
                    } else {
                        this.$message({
                            message: `该排期还没有任务清单！`,
                            type: 'info',
                            duration: 2000
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            handleCloseSeeScheduling () {
                this.objScheduling = { is: false, data: [], query: { Page_index: 1, Page_size: 10 }};
            },
            handleSeeScheduling (item) {
                this.handleCloseSeeScheduling();
                fetchData('/User/VipUser/GetPlanList', {
                    Data: item.UserId
                }).then(response => {
                    if (response.Data) {
                        this.objScheduling.data = response.Data
                    }
                }).catch(error => {
                    console.log(error)
                });
                this.objScheduling.is = true;
            },
            getList() { // 获取列表数据
                this.listLoading = true
                let options = {};
                for(let key in this.listQuery) {
                    this.listQuery[key] !== '' && (options[key] = this.listQuery[key]);
                }
                fetchData('/User/VipUser/GetUserPlanHisList',options).then(response => {
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
                for(let key in this.listQuery) {
                    if (key === 'Page_index') {
                        this.listQuery[key] = 1;
                    } else if (key === 'Page_size') {
                        this.listQuery[key] = 10;
                    } else {
                        this.listQuery[key] = '';
                    }
                }
                this.getList();
            },
            setUserInfo(row){ // 建立档案跳转
                this.$router.push({
                    path: '/vip-user-archiving',
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
                            message: '确定立即核销'+response.Message,
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
            viewReports(row){ // 查看详情
                // row.isView = true;
                //  this.$router.push({
                //       path: '/user-archiving',
                //       query: row
                //   })
                this.temp = Object.assign({}, row) // copy obj
                if(this.temp.Sex){
                    this.temp.Sex = (this.temp.Sex).toString();
                };
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            }
        }
    }
</script>

