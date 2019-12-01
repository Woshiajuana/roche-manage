<template>
    <div>
        <!--<div class="filter-container">-->
            <!--<el-row :gutter="20">-->
                <!--<el-form ref="pageForm" :inline="true" class="demo-form-inline">-->
                    <!--<template v-if="tab_type == 0">-->
                        <!--&lt;!&ndash;<el-col :span="3">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-form-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="getData('1')">上一周</el-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                        <!--<el-col :span="5">-->
                            <!--<el-form-item label="">-->
                                <!--<el-date-picker v-model="BTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" @change="changeWeek" style="width:100%"></el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--&lt;!&ndash;<el-col :span="3">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-form-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="getData('-1')">下一周</el-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--</template>-->
                    <!--<template v-else-if="tab_type == 1">-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="">-->
                                <!--<el-date-picker v-model="BTime" type="month" value-format="yyyy-MM" placeholder="选择月份" @change="changeWeek" style="width:100%"></el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--&lt;!&ndash; <el-col :span="3">-->
                            <!--<el-form-item>-->
                                <!--<el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>-->
                            <!--</el-form-item>-->
                        <!--</el-col> &ndash;&gt;-->
                    <!--</template>-->

                <!--</el-form>-->
            <!--</el-row>-->
        <!--</div>-->
		<el-row>
			<el-button size="small" class="filter-item" type="primary" @click="handleReport(true)">重新生成报告</el-button>
		</el-row>
        <div class="card-div">
            <el-row :gutter="20">
                <el-col :xs="24" :md="24" :lg="24" :xl="24">
                    <el-card class="box-card all-total">
                        <div slot="header" class="clearfix">
                            <span>{{title}}详情</span>
                        </div>
                        <div class="text-item">
                            <ul>
                                <li>总次数：{{list.TestSugarTimes}}</li>
                                <li>正常次数：{{list.NormalSugarTimes}}</li>
                                <li>偏低次数：{{list.LowSugarTimes}}</li>
                                <li>升高次数：{{list.HighSugarTimes}}</li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20">

                <el-col :xs="12" :md="12" :lg="6" :xl="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>血糖监测</span>
                        </div>
                        <div class="text-item">
                            <ul>
                                <li><span>监测频率：</span><span>{{list.MonitorSummary}}</span></li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="12" :md="12" :lg="6" :xl="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>空腹或餐前血糖</span>
                        </div>
                        <div class="text-item">
                            <ul>
                                <li><span>平均：</span><span>{{list.AvgFastingBeforeVal}}</span></li>
                                <li><span>报告：</span><span>{{list.FastingBeforeReport}}</span></li>
                                <li><span>建议：</span><span>{{list.FastingBeforeDesc}}</span></li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="12" :md="12" :lg="6" :xl="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>餐后血糖</span>
                        </div>
                        <div class="text-item">
                            <ul>
                                <li><span>平均：</span><span>{{list.AvgAfterVal}}</span></li>
                                <li><span>报告：</span><span>{{list.AfterReport}}</span></li>
                                <li><span>建议：</span><span>{{list.AfterDesc}}</span></li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="12" :md="12" :lg="6" :xl="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>低血糖</span>
                        </div>
                        <div class="text-item">
                            <ul>
                                <li><span>平均：</span><span>{{list.AvgLowVal}}</span></li>
                                <li><span>报告：</span><span>{{list.LowReport}}</span></li>
                                <li><span>建议：</span><span>{{list.LowDesc}}</span></li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>

            </el-row>

            <el-row :gutter="20">


                <el-col :xs="12" :md="12" :lg="6" :xl="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>糖化血红蛋白</span>
                        </div>
                        <div class="text-item">
                            <ul>
                                <li><span>服务开始时糖化血红蛋白值（HB1)：</span><span>{{list.HB1}}</span></li>
                                <li><span>服务结束时糖化血红蛋白值（HB2）：</span><span>{{list.HB2}}</span></li>
                                <li><span>报告：</span><span>{{list.HBReport}}</span></li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="12" :md="12" :lg="6" :xl="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>体重</span>
                        </div>
                        <div class="text-item">
                            <ul>
                                <li><span>体重指数：</span><span>{{list.BMI}}</span></li>
                                <li><span>报告：</span><span>{{list.BMIReport}}</span></li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="12" :md="12" :lg="6" :xl="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>血糖波动</span>
                        </div>
                        <div class="text-item">
                            <ul>
                                <li><span>波动幅度：</span><span>{{list.AvgVal}}</span></li>
                                <li><span>单日最大值：</span><span>{{list.DayMaxVal}}</span></li>
                                <li><span>单日最大报告：</span><span>{{list.DayMaxWholeReport}}</span></li>
                                <li><span>报告：</span><span>{{list.WholeReport}}</span></li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list.SugarReportExtends"
            border
            fit
            highlight-current-row
            style="width: 100%;"
        >
            <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>

            <el-table-column label="测试日期" min-width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.TestDateStr }}</span>
                </template>
            </el-table-column>
            <el-table-column label="星期" min-width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.Week }}</span>
                </template>
            </el-table-column>
            <el-table-column label="测试时间段" min-width="150px">
                <template slot-scope="scope">
                    <span>{{ scope.row.TimeStepStr }}</span>
                </template>
            </el-table-column>
            <el-table-column label="血糖指数类型" min-width="110px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.GlsStr }}</span>
                </template>
            </el-table-column>
            <el-table-column label="血糖值" min-width="120px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.Bloodsugar }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { fetchData } from '@/api/user'

    export default {
        name: 'reportForm',
        props: {
            temp: {
                type: Object,
                default: () => {
                    return {
                        url: '',
                        UserId: ''
                    }
                }
            },
            title: {
                type: String,
                default: '本周'
            },
            tab_type: {
                type: String,
                default: '0'
            },
        },
        data() {
            return {
                tableKey: 0,
                list: {
                    SugarReportExtends:[]
                },
                total: 0,
                listLoading: true,
                rowData:{},
                BTime:'',
                Type:1 //1
            };
        },
        created() {
            this.getNowDate();
            this.getData()
        },
        methods: {
            handleReport (IsReCacl) {
                this.$confirm('如果重新生成之前的报告会更新，确定要重新生成吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { // 确定
                    this.getData(IsReCacl);
                }).catch(() => { // 取消

                });
            },
            getData(IsReCacl = false){
                let queryData = {
                    UserId:this.temp.UserId,
                    BTime:this.BTime,
                    PlanId: this.$route.query.Id,
                }
//                if(this.tab_type == 0){
//                    queryData.Type = e?e:'1';
//                }
                fetchData(this.temp.url,{
                    ...queryData,
                    IsReCacl: IsReCacl,
                }).then(response => {
                    if(response.Data){
                        this.list = response.Data;
                        // this.list.SugarReportExtends = response.Data.SugarReportExtends?response.Data.SugarReportExtends:[]
                        this.list.SugarReportExtends = response.Data.SugarReportExtends;
                    };
                    this.listLoading = false
                }).catch(error => {
                    console.log(error)
                })
            },
            getNowDate(){
                let nowDate = new Date();
                let nowYear = nowDate.getFullYear(); //获取完整的年份(4位,1970-????)
                let nowMonth = nowDate.getMonth()+1>9?nowDate.getMonth()+1:"0"+(nowDate.getMonth()+1); //获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;
                let nowDay = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate(); //获取当前日(1-31)
                if(this.tab_type == 0){
                    this.BTime = nowYear +'-'+ nowMonth +'-'+ nowDay;
                }else{
                    this.BTime = nowYear +'-'+ nowMonth;
                }

            },
            setWeek(type){

            },
            changeWeek(e){
                this.getData();
            },
        }
    }
</script>
<style scoped>
    .tab-page-div{
        /* background-color: #E6E6E6; */
        padding-left: 20px;
        min-height: 300px;
    }
    .card-div{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .box-card {
        margin-bottom: 10px;
        min-height: 285px;
    }
    .box-card.all-total{
        min-height: 145px;
    }
    .text-item ul{
        padding: 0;
    }
    .text-item li{
        list-style-type: none;
        min-height: 30px;
        line-height: 30px;
    }
    .text-item li > span{
        display: inline-block;
        /* float: left; */
        vertical-align: text-top;
    }
    .text-item li > span:first-child{
        /*width: 45px;*/
    }
    .text-item li > span:last-child{
        /*width: calc(100% - 45px);*/
    }
    .all-total .text-item li{
        float: left;
        width: 25%;
    }

</style>
