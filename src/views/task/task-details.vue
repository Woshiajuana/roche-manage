<template>
    <div class="form-style">
        <el-row :gutter="20">
            <el-col :span="24"><p>用户联系方式</p></el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="4"><div class="show-info">姓名：<span class="span-info">{{ ruleForm.Name }}</span></div></el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6"><div class="show-info">电话：<span class="span-info">{{ ruleForm.Mobile }}</span></div></el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="4"><div class="show-info">微信：<span class="span-info">{{ ruleForm.WxNo }}</span></div></el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="4"><div class="show-info">购买人姓名：<span class="span-info">{{ ruleForm.BuyUser }}</span></div></el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6"><div class="show-info">购买人电话：<span class="span-info">{{ ruleForm.BuyUserMobile }}</span></div></el-col>
            <el-col :span="24"><p>用户基础信息</p></el-col>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="性别：" prop="Sex">
                        <!-- <el-radio-group v-model="ruleForm.Sex" :disabled="isView">
                                                              <el-radio label="1">男</el-radio>
                                                              <el-radio label="2">女</el-radio>
                                                            </el-radio-group> -->
                        {{ ruleForm.Sex == 1?'男':'女' }}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="身高（厘米）：" prop="Height">
                        <el-input v-model="ruleForm.Height " type="number" placeholder="请输入身高" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item type="number" label="体重（公斤）：" prop="Weight">
                        <el-input v-model="ruleForm.Weight" placeholder="请输入体重" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="出生日期：" prop="Brithday">
                        <el-date-picker v-model="ruleForm.BrithdayStr" type="date" value-format="yyyy-MM-dd" placeholder="请选择出生日期" style="width:100%;" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="糖化血红蛋白：" prop="RedProtein">
                        <el-input v-model="ruleForm.RedProtein" placeholder="请输入糖化血红蛋白" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="核销码：">
                        <el-input v-model="ruleForm.Code" placeholder="请输入核销码" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :span="24"><p> 用户疾病信息</p></el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="糖尿病类型：" prop="SugarType">
                        <el-input v-model="ruleForm.SugarTypeStr" placeholder="糖尿病类型" :disabled="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="确诊时间：" prop="DiagnosisTime">
                        <el-date-picker v-model="ruleForm.DiagnosisTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" style="width:100%;" :disabled="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="24" :xl="24" />
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="当前治疗方案：" prop="TreatmentPlan">
                        <el-input v-model="ruleForm.TreatmentPlanStr" placeholder="" :disabled="isView" />
                    </el-form-item>
                    <!--                    <el-form-item label="" prop="InsulinMethod">-->
                    <!--                        <el-input v-model="ruleForm.InsulinMethodStr" placeholder="" :readonly="isView" />-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="" prop="InsulinMethod">
                        <el-select v-model="ruleForm.InsulinMethod" :disabled="isView" class="filter-item" placeholder="请选择方案" style="width:100%;">
                            <el-option v-for="item in InsulinMethodEnum" :key="item.val" :label="item.name" :value="+item.val" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col :xs="24" :md="12" :lg="8" :xl="6">
                                                    <el-form-item label="" prop="InsulinMethod">
                                                        <el-select v-model="ruleForm.InsulinMethod" class="filter-item" placeholder="请选择方案" style="width:100%;">
                                                         <el-option v-for="item in InsulinMethodEnum" :key="item.val" :label="item.name" :value="item.val" />
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col> -->
                <el-col :xs="24" :sm="24">
                    <el-form-item label="慢性并发症：" prop="Complications">
                        <!--                        <el-input v-model="ruleForm.ComplicationsStr" placeholder="" :readonly="isView" />-->
                        <el-checkbox-group v-model="ruleForm.Complication" :disabled="isView">
                            <el-checkbox v-for="(item,key) in ComplicationEnum" :key="key" :label="+item.val">{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                    <el-form-item>
                        <template v-if="!isView">
                            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                            <el-button type="primary" @click="createPlan">生成排期</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </template>
                        <!-- <el-button @click="prevPage">返回</el-button> -->
                    </el-form-item>
                </el-col>
            </el-form>

            <el-col :span="24"><p>控糖训练排期列表</p></el-col>
            <el-col :span="24">
                <el-table
                    key="1"
                    v-loading="listPlanLoading"
                    :data="listPlan"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%;"
                >
                    <el-table-column label="序号" type="index" width="50" align="center" />
                    <el-table-column label="排期日期" align="center">
                        <template slot-scope="scope">
                            <el-date-picker v-model="scope.row.PlanTimeStr" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:100%;" :readonly="true" />
                        </template>
                    </el-table-column>
                    <el-table-column label="排期时间" align="center">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.Hour" class="filter-item" placeholder="请选择时间" style="width:100%;" :disabled="true">
                                <el-option v-for="item in hourArr" :key="item" :label="item" :value="item" />
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column label="备注" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.TaskRemarkCreate" class="filter-item" placeholder="请输入备注" style="width:100%;" :disabled="true" />
                        </template>
                    </el-table-column>
                    <el-table-column label="任务名称" align="center">
                        <template slot-scope="scope">
                            <span>{{ nameArr[scope.row.Sort-1] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否完成" align="center" width="230" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <span>{{ TaskTypeStr[scope.row.TaskType] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button type="text" style="margin-left: 20px" @click="handleSeeTaskList(scope.row)">查看任务清单</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>

            <el-col :span="24"><p>控糖训练排期详情</p></el-col>
            <el-col :span="24">
                <template>
                    <el-tabs v-model="activeName" class="tab-page-div" @tab-click="handleClick">
                        <!--<el-tab-pane label="月报" name="second">-->
                        <!--<report-form  v-if='tabsIndex == 1' title="本月" tab_type="1" :temp="month_queryData" />-->
                        <!--</el-tab-pane>-->

                        <el-tab-pane label="血糖记录" name="first">
                            <el-table
                                :key="tableKey"
                                v-loading="listLoading"
                                :data="list"
                                border
                                fit
                                highlight-current-row
                                style="width: 100%;"
                            >
                                <el-table-column label="序号" type="index" align="center" width="50" />
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
                            <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />

                        </el-tab-pane>
                        <el-tab-pane label="任务报告" name="second">
                            <report-form v-if="tabsIndex == 1" ref="report" title="本周" tab_type="0" :temp="week_queryData" />
                        </el-tab-pane>
                        <el-tab-pane label="控糖方案" name="third">
                            <iframe width="100%" height="500px" :src="'https://jkys-wechat.91jkys.com/user/third/login?pin=' + $route.query.UserId +'&accessId=roche&page=HEALTH_MANAGE'" frameborder="0" />
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </el-col>
            <el-col :span="24"><p>任务清单</p></el-col>
            <el-col :span="24">
                <!-- <set-task :userId="rowData.Id" /> -->
                <task-do :row-data="rowData" @refreshReport="handleRefreshReport" />
            </el-col>

        </el-row>

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
    </div>
</template>
<script>
    import reportForm from './components/reportForm'
    import setTask from './components/setTask'
    import taskDo from './components/task-do'
    import { fetchData } from '@/api/user'
    import Pagination from '@/components/Pagination'

    export default {
        components: { Pagination, reportForm, setTask, taskDo },
        data() {
            return {
                isTaskPreviewDialog: false,
                arrTasks: [],
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
                hourArr: [9, 10, 11, 13, 14, 15, 16, 17],
                ruleForm: {},
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
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },
                activeName: 'first',
                tableKey: 0,
                list: null,
                listPlan: null,
                total: 0,
                listLoading: true,
                listPlanLoading: true,
                listQuery: {
                    Page_index: 1,
                    Page_size: 10
                },
                rowData: {},
                BTime: '',
                week_queryData: {
                    url: '/User/VipUser/GetPlanReport',
                    UserId: ''
                },
                month_queryData: {
                    url: '/User/VipUser/GetMonthReport',
                    UserId: ''
                },
                setTaskData: {},
                tabsIndex: 0
            }
        },
        created() {
            console.log(this.$route.query)
            this.rowData = this.$route.query
            this.week_queryData.UserId = this.rowData.UserId
            this.month_queryData.UserId = this.rowData.UserId
            this.initData()
        },
        methods: {

            handleRefreshReport() {
                if (this.$refs.report && this.$refs.report.getData) {
                    this.$refs.report.getData()
                }
            },

            handleSeeTaskList(item) {
                fetchData('/User/VipUser/GetTrainPatientUsers', {
                    Data: item.TrainPatientIds
                }).then(response => {
                    this.arrTasks = (response && response.Data) || []
                    if (this.arrTasks.length) {
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

            getPlanList() {
                this.listPlanLoading = true
                fetchData('/User/VipUser/GetPlanList', {
                    Data: this.$route.query.UserId
                }).then(response => {
                    if (response.Data) {
                        this.listPlan = response.Data
                        //                        this.total = response.Data.Count
                    }
                    this.listPlanLoading = false
                }).catch(error => {
                    console.log(error)
                })
            },

            initData() {
                this.isView = true
                this.ruleForm = this.rowData
                this.getUserInfo()
                this.ruleForm.SugarType = this.rowData.SugarType ? this.rowData.SugarType.toString() : ''
                this.ruleForm.InsulinMethod = this.rowData.InsulinMethod ? this.rowData.InsulinMethod.toString() : ''
                this.ruleForm.TreatmentPlan = this.rowData.TreatmentPlan ? this.rowData.TreatmentPlan.toString() : ''
                if (this.ruleForm.Complications) {
                    const arr = this.ruleForm.Complications
                    this.ruleForm.Complications = []
                    JSON.parse(arr).forEach((item) => {
                        this.ruleForm.Complications.push(item.toString())
                    })
                }
                this.ruleForm.Sex = this.rowData.Sex ? this.rowData.Sex.toString() : ''
                this.getList()
                this.getPlanList()
            },
            handleClick(tab, event) {
                this.tabsIndex = tab.index
                if (tab.index == 0) {
                    console.log('122')
                    this.getList()
                } else if (tab.index == 1) {
                    console.log('任务报告')
                }
            },
            getList() { // 获取列表数据 血糖
                this.listLoading = true
                this.listQuery.UserId = this.$route.query.UserId
                fetchData('/User/VipUser/GetTestSugarList', this.listQuery).then(response => {
                    if (response.Data) {
                        //          debugger
                        this.list = response.Data.Data
                        this.total = response.Data.Count
                    }
                    this.listLoading = false
                }).catch(error => {
                    console.log(error)
                })
            },
            getUserInfo() { // 获取用户详情
                fetchData('/User/VipUser/GetUserById', { Data: this.rowData.UserId }).then(response => {
                    if (response.Data) {
                        console.log(response.Data)
                        this.ruleForm = response.Data
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!')
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
    .tab-page-div{
        /* background-color: #E6E6E6; */
        padding-left: 20px;
        min-height: 300px;
    }

</style>
