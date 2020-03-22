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
                    <el-col :span="4">
                        <el-form-item label="是否完成">
                            <el-select clearable v-model="listQuery.IsPlanComplete" placeholder="请选择是否完成">
                                <el-option value="1" label="已完成"></el-option>
                                <el-option value="2" label="未完成"></el-option>
                                <el-option value="3" label="未开始"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="已训练期次">
                            <el-select clearable
                                       v-model="listQuery.Sort"
                                       placeholder="请选择期次" >
                                <el-option value="1" label="一期"></el-option>
                                <el-option value="2" label="二期"></el-option>
                                <el-option value="3" label="三期"></el-option>
                                <el-option value="4" label="四期"></el-option>
                                <el-option value="5" label="五期"></el-option>
                                <el-option value="6" label="六期"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
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
                    <span>{{ scope.row.Name ||  scope.row.NickName }}</span>
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
            <el-table-column label="是否激活" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.IsAtMember?'是':'否' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否绑定" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.IsBind?'是':'否' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否放弃" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.IsGiveUp?'是':'否' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否完成" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.IsPlanComplete?'是':'否' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="首访日期" min-width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.FirstVisitTimeStr}}</span>
                </template>
            </el-table-column>
            <el-table-column label="已训练次数" width="120" class-name="status-col" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.PlanComplete}}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否完成训练" width="120" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.IsPanlComplete?'是':'否' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="最后完成时间" min-width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.LastPlanCompleteTimeStr}}</span>
                </template>
            </el-table-column>
            <!--        <el-table-column label="完成训练期数" min-width="150px" align="center">-->
            <!--            <template slot-scope="scope">-->
            <!--                <span>{{ scope.row.PlanComplete}}</span>-->
            <!--            </template>-->
            <!--        </el-table-column>-->
            <el-table-column label="操作" align="center" width="350" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button v-if="row.status!='deleted'" size="mini" type="primary" @click="handleSeeHistory(row)">
                        查看排期
                    </el-button>
                    <el-button v-if="row.status!='deleted'" size="mini" type="primary" @click="viewReports(row)">
                        查看详情
                    </el-button>
                    <el-button v-if="row.status!='deleted'" size="mini" type="primary" @click="handleSeeBloodSugar(row)">
                        查看血糖
                    </el-button>
                    <el-button type="primary" size="mini" @click="setUserInfo(row)">
                        {{ row.IsArchives ? '修改档案' : '新建档案' }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.Page_index" :limit.sync="listQuery.Page_size" @pagination="getList" />

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

        <el-dialog title="查看排期历史" :visible.sync="objHistory.is">
            <el-table
                key="objHistory"
                :data="objHistory.data"
                border
                fit
                highlight-current-row
                style="width: 100%;">
                <el-table-column label="序号" type="index" width="50"  align="center"></el-table-column>
                <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Name }}</span>
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
            </el-table>
            <pagination v-show="objHistory.total>0" :total="objHistory.total"
                        :page.sync="objHistory.query.Page_index" :limit.sync="objHistory.query.Page_size" @pagination="getHistoryList" />
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseHistory">
                    关闭
                </el-button>
            </div>
        </el-dialog>


        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm"  :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="姓名">
                    <el-input v-model="temp.Name" placeholder="" readonly/>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="temp.Mobile" placeholder="" readonly/>
                </el-form-item>
                <el-form-item label="导入日期">
                    <el-input v-model="temp.ImportTimeStr" placeholder="" readonly/>
                </el-form-item>
                <el-form-item label="是否激活">
                    <span>{{ temp.IsAtMember?'是':'否' }}</span>
                </el-form-item>
                <el-form-item label="是否绑定">
                    <span>{{ temp.IsBind?'是':'否' }}</span>
                </el-form-item>
                <el-form-item label="是否放弃">
                    <span>{{ temp.IsGiveUp?'是':'否' }}</span>
                </el-form-item>
                <el-form-item label="首访日期">
                    <el-input v-model="temp.FirstVisitTimeStr" placeholder="" readonly/>
                </el-form-item>
                <el-form-item label="已训练次数">
                    <el-input v-model="temp.PlanComplete" placeholder="" readonly/>
                </el-form-item>
                <el-form-item label="是否完成训练">
                    <span>{{ temp.IsPanlComplete?'是':'否' }}</span>
                </el-form-item>
                <el-form-item label="完成训练时间">
                    <el-input v-model="temp.LastPlanCompleteTime" placeholder="" readonly/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    关闭
                </el-button>
                <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
                  确定
                </el-button> -->
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
                    Sort:'',
                    IsPlanComplete:'',
                    Etime:'',
                    Name:'',
                    Mobile:'',
                    Page_index: 1,
                    Page_size: 10,
                    Scene:1 //
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
                objBlood: {
                    is: false,
                    data: [],
                    total: 0,
                    query: {
                        Page_index: 1,
                        Page_size: 10,
                    }
                },
                objHistory: {
                    is: false,
                    data: [],
                    total: 0,
                    query: {
                        Page_index: 1,
                        Page_size: 10,
                        Name: '',
                    }
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            handleSeeHistory (item) {
                this.handleCloseHistory();
                this.objHistory.query.UserId = item.Id;
                this.getHistoryList();
                this.objHistory.is = true;
            },
            handleCloseHistory () {
                this.objHistory = { is: false, data: [], total: 0, query: { Page_index: 1, Page_size: 10 }};
            },

            getHistoryList () {
                fetchData('/User/VipUser/GetUserPlanHisList', this.objHistory.query).then(response => {
                    if (response.Data) {
                        this.objHistory.data = response.Data.Data;
                        this.objHistory.total = response.Data.Count
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            handleCloseSeeBloodSugar () {
                this.objBlood = { is: false, data: [], total: 0, query: { Page_index: 1, Page_size: 10 }};
            },
            getBloodSugarList () {
                fetchData('/User/VipUser/GetTestSugarList', this.objBlood.query).then(response => {
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
                this.objBlood.query.UserId = item.Id;
                this.getBloodSugarList();
                this.objBlood.is = true;
            },
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
            handleRefresh(){  //重置
                this.listQuery.Stime = '';
                this.listQuery.Etime = '';
                this.listQuery.Name = '';
                this.listQuery.Mobile = '';
                this.listQuery.IsPlanComplete = '';
                this.listQuery.Sort = '';
                this.getList()
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

