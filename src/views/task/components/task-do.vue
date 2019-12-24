<template>
    <div class="select-task-div">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for='(item,index) in taskName' :key="index" :title="item.name" :name="index">
                <dl v-for="(detail,detailIndex) in item.con" :key="detail.Id">
                    <dt>
                        {{detailIndex+1}}、{{detail.CrowdLabel}}

                        <el-button type="text" style="margin-left: 20px" @click="handleAddCities(detail)">添加</el-button>
                    </dt>
                    <dd class="detail-span">描述：{{detail.TaskDec}}</dd>
                </dl>
                <!--<el-checkbox-group v-model="checkboxGroup" @change="handleCheckedCitiesChange">-->
                    <!--<el-checkbox v-for="(detail,detailIndex) in item.con" :label="detail.Id" :key="detail.Id" style="width:100%;white-space: inherit;min-height:30px;">-->
                        <!--{{detailIndex+1}}、{{detail.CrowdLabel}}-->
                        <!--<span class="detail-span">描述：{{detail.TaskDec}}</span>-->
                    <!--</el-checkbox>-->
                <!--</el-checkbox-group>-->
            </el-collapse-item>
        </el-collapse>
        <div>
            <p>任务清单操作</p>
            <el-row :gutter="20">
                <el-col :xs="24" :md="12" :lg="8" v-for="(item,index) in selectedTasks" :key="index" style="margin-bottom:15px;">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>{{taskName[item.PatientCategory-1].name}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="delSelectedTasks(index)">删除</el-button>
                        </div>
                        <div>
                            <h3 style="margin: 0 0 10px;">{{item.CrowdLabel}}</h3>
                            <el-input type="textarea" rows="3" v-model="item.TaskDec"></el-input>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="20">
            <el-col :xs="24" :md="12" :lg="8" :xl="6">
                <span style="display: inline-block; margin: 10px 0">备注：</span>
                <el-input v-model="TaskRemarkDetail " type="textarea" placeholder="请输入本次训练备注" />
            </el-col>
        </el-row>
        <div style="padding:10px 0;">
            <el-button type="primary" :loading="listLoading" @click="handlePreview">任务预览</el-button>
            <el-button v-if="!rowData.IsSendReport && !$route.query.isFirst" type="primary" @click="sendOutFun">发布报告</el-button>
            <el-button @click="prevPage">返回</el-button>
        </div>

        <el-dialog title="任务预览" :visible.sync="isTaskPreviewDialog">
            <dl v-for="(item,index) in selectedTasks" :key="index">
                <dt>{{index+1}}、{{item.CrowdLabel}}</dt>
                <dd style="padding-left: 10px">{{item.TaskDec}}</dd>
            </dl>
            <dl>
                <dt>{{selectedTasks.length + 1}}、备注</dt>
                <dd style="padding-left: 10px">{{TaskRemarkDetail || '无'}}</dd>
            </dl>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isTaskPreviewDialog = false">
                    取消
                </el-button>
                <el-button type="primary" @click="setTaskFun">
                    发布任务
                </el-button>
            </div>
        </el-dialog>

        <el-dialog title="报告预览" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px">
                <dl class="report-dl">
                    <dt style="font-size: 14px">空腹或餐前血糖</dt>
                    <dl>平均：{{temp.AvgFastingBeforeVal}}</dl>
                    <dl>报告：{{temp.FastingBeforeReport}}</dl>
                    <dl style="padding-left: 0">
                        <el-form-item label="建议：">
                            <el-input v-model="temp.FastingBeforeDesc" type="textarea" placeholder="请输入空腹或餐前血糖建议" :rows="3"/>
                        </el-form-item>
                    </dl>

                    <dt style="font-size: 14px">餐后血糖</dt>
                    <dl>平均：{{temp.AvgAfterVal}}</dl>
                    <dl>报告：{{temp.AfterReport}}</dl>
                    <dl style="padding-left: 0">
                        <el-form-item label="建议：">
                            <el-input v-model="temp.AfterDesc" type="textarea" placeholder="请输入餐后血糖建议" :rows="3"/>
                        </el-form-item>
                    </dl>

                    <dt style="font-size: 14px">低血糖</dt>
                    <dl>平均：{{temp.AvgLowVal}}</dl>
                    <dl>报告：{{temp.LowReport}}</dl>
                    <dl style="padding-left: 0">
                        <el-form-item label="建议：">
                            <el-input v-model="temp.LowDesc" type="textarea" placeholder="请输入低血糖建议" :rows="3" />
                        </el-form-item>
                    </dl>

                    <dt style="font-size: 14px">糖化血红蛋白</dt>
                    <dl>HB1：{{temp.HB1}}</dl>
                    <dl>HB2：{{temp.HB2}}</dl>
                    <dl>报告：{{temp.HBReport}}</dl>

                    <dt style="font-size: 14px">体重</dt>
                    <dl>指数：{{temp.BMI}}</dl>
                    <dl>报告：{{temp.BMIReport}}</dl>
                </dl>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="setPlanReport">
                    确认发送
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { fetchData } from '@/api/user'
    export default {
        name: 'taskDo',
        props: {
            rowData: {
                type: Object
            }
        },
        data() {
            return {
                // 备注
                TaskRemarkDetail: '',

                // 预览任务弹窗
                isTaskPreviewDialog: false,

                activeNames: ['0'],
                dataList:[],
                taskName:[//任务清单模板所有数据，处理后
                    {name:'饮食',con:[]},
                    {name:'运动',con:[]},
                    {name:'血糖监测',con:[]},
                    {name:'其它监测',con:[]},
                    {name:'生活方式',con:[]}
                ],
                checkboxGroup:[],//任务清单折叠面板中已勾选的数据 Ids
                taskAll:[],//任务清单模板所有数据，未处理
                selectedTasks:[],//任务清单折叠面板中已勾选的完整数据[{},{}]
                historyTasksData:[],//获取已保存过的任务清单数据，历史数据
                dialogFormVisible: false,
                temp: {
                    FastingBeforeReport: '',
                    AfterReport: '',
                    LowReport: '',
                    HBReport: '',
                    BMIReport:''
                },
                rules: {
                    FastingBeforeReport: [{ required: true, message: '请输入空腹或餐前血糖建议', trigger: 'change' }],
                    AfterReport: [{ required: true, message: '请输入餐后血糖建议', trigger: 'change' }],
                    LowReport: [{ required: true, message: '请输入低血糖建议', trigger: 'change' }],
                    HBReport: [{ required: true, message: '请输入血红蛋白报告', trigger: 'change' }],
                    BMIReport: [{ required: true, message: '请输入体重指数报告', trigger: 'change' }]
                },
                listLoading:false
            }
        },
        created() {
            this.getDataList();
        },
        methods: {
            handlePreview () {
                if (this.selectedTasks && this.selectedTasks.length) {
                    this.isTaskPreviewDialog = true
                } else {
                    this.$message({
                        message: `该排期还没有任务清单！`,
                        type: 'info',
                        duration: 2000
                    })
                }
            },
            handleChange(val) {
                // console.log(val);
            },
            getDataList() {
                this.listLoading = true
                this.taskAll = []
                this.taskName = [//任务清单模板所有数据，处理后
                    {name:'饮食',con:[]},
                    {name:'运动',con:[]},
                    {name:'血糖监测',con:[]},
                    {name:'其它监测',con:[]},
                    {name:'生活方式',con:[]}
                ];
                fetchData('/User/VipUser/GetTrainPatientConfigs',{}).then(response => {
                    if (response.Data) {
                        this.taskAll = response.Data;
                        response.Data.forEach((item)=>{
                            this.taskName[item.PatientCategory-1].con.push({...item});
                        });
                    }
                    this.getPlanData();
                    this.listLoading = false
                }).catch(error => {
                    console.log(error)
                })
            },


            handleAddCities (item) {
                this.selectedTasks.push({...item});
            },

            handleCheckedCitiesChange(value) {
                // console.log(value);
                // if(this.checkboxGroup.length == 0){
                //     return;
                // };
                this.getTasksCardArr();
            },
            getTasksCardArr(){ //设置清单操作的数据
                this.selectedTasks = [];

                this.checkboxGroup.forEach((itemId)=>{ //复选框勾选的ids循环
                    this.taskAll.map((item)=>{
                        if(item.Id == itemId){ //在所有数据中查勾选id的完整数据
                            this.selectedTasks.push(item);
                        }
                    });
                });
                if(this.historyTasksData.length>0){ //是否有历史数据
                    this.historyTasksData.map((oldItem)=>{
                        this.selectedTasks.map((newItem,index)=>{
                            if(newItem.Id == oldItem.ConfigId){
                                oldItem.Id = oldItem.ConfigId;
                                this.selectedTasks.splice(index,1,oldItem)
                            }
                        });
                    });
                }
            },
            setTaskFun(){
                if(this.selectedTasks.length == 0){
                    this.$message({
                        message: '未选择任务清单操作',
                        type: 'error',
                        duration: 2000
                    })
                    return;
                };
                this.selectedTasks.forEach((item)=>{
                    item.UserId = this.rowData.UserId;
                    item.PlanId = this.rowData.Id
                });
                console.log(this.selectedTasks)

                this.isTaskPreviewDialog = false;
                // let temp = {
                //     UserId:this.rowData.UserId,
                //     PlanId:this.rowData.Id,
                //     PatientConfigIds:this.checkboxGroup
                // }
                this.$confirm('确定发布任务吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetchData('/User/VipUser/SetPlanPatient', {
                        TrainPatientUsers: this.selectedTasks,
                        TaskRemarkDetail: this.TaskRemarkDetail,
                        PlanId: this.$route.query.Id,
                        UserId : this.$route.query.UserId,
                    }).then(response => {
                        if (response.Data) {
                            this.$message({
                                title: '设置成功',
                                message: '设置成功'+response.Message,
                                type: response.Status == 0 ? 'success' : 'error',
                                duration: 2000
                            })
                            this.checkboxGroup = [];
                            // this.prevPage();
                            this.getDataList();
                        }
                        this.listLoading = false
                    }).catch(error => {
                        console.log(error)
                    })
                }).catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: '已取消'
                    // });
                });
            },
            delSelectedTasks(index){ //任务清单操作的删除按钮
                this.selectedTasks.splice(index, 1);
//                this.checkboxGroup.forEach((itemId,index)=>{
//                    if(data.Id == itemId){
//                        this.checkboxGroup.splice(index,1)
//                    }
//                });
//                this.getTasksCardArr();
            },
            sendOutFun(){
                let temp={
                    UserId:this.rowData.UserId,
                    PlanId:this.rowData.Id,
                };
                //获取训练报告内容
                fetchData('/User/VipUser/GetPlanReport', temp).then((response) => {
                    //  this.$message({
                    //     message:  response.Message,
                    //     type: response.Status == 0 ? 'success' : 'error',
                    //     duration: 2000
                    // })
                    if(response.Status == 0){
//                        for(name in this.temp){
//                            this.temp[name] = response.Data[name]?response.Data[name]:'';
//                        }
                        this.temp = {...response.Data};
                        this.dialogFormVisible = true;
                        this.$nextTick(() => {
                            this.$refs['dataForm'].clearValidate()
                        });
                    }

                    console.log('this.temp => ', this.temp)
                }).catch((error) => {
                    console.log(error)
                })
                // let temp={
                //     UserId:this.rowData.UserId,
                //     Id:this.rowData.Id,
                // }
                // this.$confirm('确定发送报告?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
//                     fetchData('/User/VipUser/SetCompletePlan', temp).then((response) => {
//                         this.$message({
//                             message: '发送报告'+response.Message,
//                             type: response.Status == 0?'success':'error',
//                             duration: 2000
//                         });
//                         }).catch((error) => {
//                             console.log(error)
//                         })
                // }).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '已取消发送'
                //     });
                // });
            },
            setPlanReport() { //发布报告 建议提交
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        // this.temp.Id = this.rowData.Id;
                        // 保存
                        fetchData('/User/VipUser/SetPlanReport', {
                            ...this.temp,
                            UserId: this.$route.query.UserId,
                            PlanId: this.$route.query.Id,
                        }).then((response) => {
                            this.dialogFormVisible = false;
                            this.$emit('refreshReport');

                            // 发送
                            fetchData('/User/VipUser/SetCompletePlan', {
                                ...this.temp,
                                UserId: this.$route.query.UserId,
                                PlanId: this.$route.query.Id,
                                Id: this.rowData.Id,
                            }).then((response) => {
                                this.$message({
                                    message: '发送报告'+response.Message,
                                    type: response.Status == 0?'success':'error',
                                    duration: 2000
                                });
                            }).catch((error) => {
                                console.log(error)
                            })
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })
            },
            getTasksList(data){ // 这个是获取保存后的患者任务清单（历史数据）
                fetchData('/User/VipUser/GetTrainPatientUsers',{Data:data}).then(response => {
                    if(response.Data){
                        this.checkboxGroup=[];
                        this.historyTasksData = response.Data;
                        this.historyTasksData.forEach((item)=>{
                            this.checkboxGroup.push(item.ConfigId);
                        });
                        // if(response.Data[0].TrainPatientIds){
                        //     if(response.Data[0].TrainPatientIds.length>0){
                        //         this.checkboxGroup = response.Data[0].TrainPatientIds
                        //     }
                        // };
                        this.getTasksCardArr();
                    }
                    //测试
                    // this.historyTasksData.push({PatientCategory:4,Id:42,TaskDec:'陈述事实',CrowdLabel:'忧郁易激动'});
                    // this.getTasksCardArr()
                }).catch(error => {
                    console.log(error)
                })
            },
            getPlanData() { // 获取排期当前数据
                fetchData('/User/VipUser/GetPlanListById',{Data:[this.rowData.Id]}).then(response => {
                    if(response.Data){
                        //测试
                        //this.checkboxGroup = [42]
						this.TaskRemarkDetail = response.Data[0].TaskRemarkDetail || '';
                        this.getTasksList(response.Data[0].TrainPatientIds);//查历史数据
                        // if(response.Data[0].TrainPatientIds){
                        //     if(response.Data[0].TrainPatientIds.length>0){
                        //         this.checkboxGroup = response.Data[0].TrainPatientIds
                        //     }
                        // };
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            prevPage(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style >
    .select-task-div{
        padding: 0 5px;
    }
    .select-task-div .el-checkbox{
        width: 100%;
        white-space: inherit;
        min-height: 30px;
    }
    .select-task-div .el-checkbox .el-checkbox__label{
        width: 97%;
        vertical-align: text-top;
    }
    .select-task-div .el-checkbox__label .detail-span{
        display: block;
        padding: 10px 0;

    }
    .select-task-div .el-checkbox__input.is-checked+.el-checkbox__label .detail-span{
        color: #606266;
        display: block;
    }
    .report-dl{
        line-height: 1.5;
    }
    .report-dl dt{
        font-weight: bold;
        margin-top: 10px;
    }
    .report-dl dl{
        margin: 0;
        margin-top: 5px;
        padding-left: 25px;
    }
    .report-dl .el-form-item__label{
        font-weight: normal !important;
    }
</style>
