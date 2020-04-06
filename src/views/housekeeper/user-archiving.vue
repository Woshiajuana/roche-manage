<template>
    <div class="form-style">
        <el-row :gutter="20">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
                <el-col :span="24"><p>用户联系方式</p></el-col>
                <!-- <el-col :xs="12" :sm="8" :md="8" :lg="4"><div class="show-info">姓名：<span class="span-info">{{ ruleForm.Name }}</span></div></el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="6"><div class="show-info">电话：<span class="span-info">{{ ruleForm.Mobile }}</span></div></el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="4"><div class="show-info">微信：<span class="span-info">{{ ruleForm.WxNo }}</span></div></el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="4"><div class="show-info">购买人姓名：<span class="span-info">{{ ruleForm.BuyUser }}</span></div></el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="6"><div class="show-info">购买人电话：<span class="span-info">{{ ruleForm.BuyUserMobile }}</span></div></el-col> -->
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="使用者姓名：" prop="Name">
                        <el-input v-model="ruleForm.Name " type="text" placeholder="请输入使用者姓名" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <!-- <el-col :xs="24" :md="12" :lg="8" :xl="6"><div class="show-info">使用者电话：<span class="span-info">{{ ruleForm.Mobile }}</span></div></el-col> -->
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="使用者电话：" prop="Mobile">
                        <el-input v-model="ruleForm.Mobile " type="text" placeholder="请输入使用者电话" :readonly="true" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="使用者微信：" prop="WxNo">
                        <el-input v-model="ruleForm.WxNo " type="text" placeholder="请输入使用者微信" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="购买人姓名：" prop="BuyUser">
                        <el-input v-model="ruleForm.BuyUser " type="text" placeholder="请输入购买人姓名" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="购买人电话：" prop="BuyUserMobile">
                        <el-input v-model="ruleForm.BuyUserMobile " type="text" placeholder="请输入购买人电话" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="购买人微信：" prop="BuyWxNo">
                        <el-input v-model="ruleForm.BuyWxNo" type="text" placeholder="请输入购买人微信" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="购买者关系：" prop="BuyUserRelation">
                        <el-input v-model="ruleForm.BuyUserRelation" type="text" placeholder="请输入购买人与使用者关系" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="备注：" prop="ArchiveRemark">
                        <el-input v-model="ruleForm.ArchiveRemark" type="text" placeholder="请输入备注" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :span="24"><p>用户基础信息</p></el-col>

                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="性别：" prop="Sex">
                        <el-radio-group v-model="ruleForm.Sex" :disabled="isView">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
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
                        <el-date-picker v-model="ruleForm.Brithday"   type="date" value-format=" yyyy-MM-dd" placeholder="请选择出生日期" style="width:100%;" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="糖化血红蛋白：">
                        <el-input v-model="ruleForm.RedProtein" placeholder="请输入糖化血红蛋白" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="测试时间：">
                        <el-date-picker v-model="ruleForm.LastTestRedProtein" type="date" value-format=" yyyy-MM-dd" placeholder="请选择测试时间" style="width:100%;" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="核销码："  >
                        <el-input v-model="ruleForm.Code" placeholder="请输入核销码" :readonly="isView" />
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="血压："  >
                        <el-input v-model="ruleForm.BloodPressure" placeholder="请输入血压" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="胆固醇："  >
                        <el-input v-model="ruleForm.Cholesterol" placeholder="请输入胆固醇" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="甘油三酯："  >
                        <el-input v-model="ruleForm.Triglyceride" placeholder="请输入甘油三酯" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="高密度脂蛋白："  >
                        <el-input v-model="ruleForm.HighDensity" placeholder="请输入高密度脂蛋白" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="低密度脂蛋白："  >
                        <el-input v-model="ruleForm.LowDensity" placeholder="请输入低密度脂蛋白" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="尿酸："  >
                        <el-input v-model="ruleForm.UricAcid" placeholder="请输入尿酸" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="BMI："  >
                        <el-input v-model="ruleForm.BMI" placeholder="自动计算" :disabled="true" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="是否饮酒：">
                        <el-radio-group v-model="ruleForm.DrinkWine" :disabled="isView">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="是否吸烟：">
                        <el-radio-group v-model="ruleForm.Smoke" :disabled="isView">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>


                <el-col :span="24"><p> 用户疾病信息</p></el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="糖尿病类型：" prop="SugarType">
                        <el-select v-model="ruleForm.SugarType" class="filter-item" placeholder="请选择类型" style="width:100%;" :disabled="isView">
                            <el-option v-for="item in SugarTypeEnum" :key="item.val" :label="item.name" :value="item.val" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="确诊时间：" prop="DiagnosisTime">
                        <el-date-picker v-model="ruleForm.DiagnosisTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择时间" style="width:100%;" :readonly="isView" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="24" :xl="24" />
                <el-col :xs="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="当前治疗方案：" prop="TreatmentPlan">
                        <el-select v-model="ruleForm.TreatmentPlan" class="filter-item" placeholder="请选择方案" style="width:100%;" :disabled="isView">
                            <el-option v-for="item in TreatmentPlanEnum" :key="item.val" :label="item.name" :value="item.val" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="InsulinMethod">
                        <el-select v-model="ruleForm.InsulinMethod" class="filter-item" placeholder="请选择方案" style="width:100%;" :disabled="isView">
                            <el-option v-for="item in InsulinMethodEnum" :key="item.val" :label="item.name" :value="item.val" />
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
                        <el-checkbox-group v-model="ruleForm.Complications" :disabled="isView">
                            <el-checkbox v-for="(item,key) in ComplicationEnum" :key="key" :label="item.val">{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                    <el-form-item>
                        <template v-if="!isView">
                            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
<!--                            <el-button type="primary" @click="createPlan">生成排期</el-button>-->
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </template>
                        <el-button @click="prevPage">返回</el-button>
                    </el-form-item>
                </el-col>

            </el-form>


        </el-row>
    </div>
</template>
<script>
    import { fetchData } from '@/api/user'
    export default {
        data() {
            return {
                isView: false,
                ruleForm: {
                    Id: undefined,
                    Name: '',
                    Mobile: '',
                    WxNo:'',
                    Sex: '',
                    BuyUser: '',
                    BuyUserMobile: '',
                    BuyWxNo:'',
                    Height: '',
                    Weight: '',
                    Brithday: '',
                    RedProtein: '',
                    LastTestRedProtein:'',
                    Code: '',
                    SugarType: '',
                    DiagnosisTime: '',
                    InsulinMethod: '0',
                    TreatmentPlan: '',
                    Complications: [],

                    BuyUserRelation: '', // 20191130 新增购买关系
                    ArchiveRemark: '', // 20191130 新增购买关系

                    BMI: '', //20200322 BMI
                    BloodPressure: '', //20200322 血压
                    Cholesterol: '', //20200322 胆固醇
                    Triglyceride: '', //20200322 甘油三酯
                    HighDensity: '', //20200322 高密度脂蛋白
                    LowDensity: '', //20200322 低密度脂蛋白
                    UricAcid: '', //20200322 尿酸
                    DrinkWine: false, //20200322 饮酒
                    Smoke: false, //20200322 吸烟
                },
                timesArr:[
                    'D2',
                    'D15',
                    'D35',
                    'D55',
                    'D75',
                    'D90'
                ],
                nameArr:[
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
                    { val: '1', name: '糖尿病肾病' },
                    { val: '2', name: '糖尿病视网膜病' },
                    { val: '3', name: '糖尿病足病' },
                    { val: '4', name: '糖尿病神经病变' },
                    { val: '5', name: '糖尿病心脑血管病' },
                    { val: '6', name: '其它' },
                    { val: '7', name: '无并发症' }
                ],
                hourArr: [9, 10, 11, 13, 14, 15, 16, 17],
                rules: {
                    Name: [{ required: true, message: '请输入使用者姓名', trigger: 'blur' }],
                    WxNo: [{ required: true, message: '请输入使用者微信', trigger: 'blur' }],
                    BuyUser: [{ required: true, message: '请输入购买人姓名', trigger: 'blur' }],
                    BuyUserMobile: [{ required: true, message: '请输入购买人电话', trigger: 'blur' }],
                    BuyWxNo: [{ required: true, message: '请输入购买人微信', trigger: 'blur' }],

                    Sex: [{ required: true, message: '请选择姓别', trigger: 'change' }],
                    Height: [{ required: true, message: '请输入身高', trigger: 'blur' }],
                    Weight: [{ required: true, message: '体重', trigger: 'blur' }],
                    Brithday: [{ required: true, message: '请输入出生日期名', trigger: 'change' }],
                    RedProtein: [{ required: true, message: '请输入糖化血红蛋白', trigger: 'blur' }],
                    LastTestRedProtein: [{ required: true, message: '请输入糖化血红蛋白测试时间', trigger: 'change' }],
                    Code: [{ required: true, message: '请输入核销码,否则无法使用控糖方案', trigger: 'blur' }],
                    SugarType: [{ required: true, message: '请选择糖尿病类型', trigger: 'change' }],
                    DiagnosisTime: [{ required: true, message: '请输入确诊时间', trigger: 'blur' }],
                    TreatmentPlan: [{ required: true, message: '请选择当前治疗方案', trigger: 'change' }],
                    InsulinMethod: [{ required: true, message: '请选择胰岛素方案', trigger: 'change' }],
                    Complications: [{ required: true, message: '请选择慢性并发症', trigger: 'change', type: 'array' }]
                },
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: false,
                taskNameArr: [],
                UserId:'',
                PlanImgUrl:'',
                pickerBeginDateBefore:this.endTime(),

            }
        },
        created() {

        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                const rowData = this.$route.query;
                this.UserId = rowData.UserId;
                console.log(rowData)
                if (rowData.isView) { // 是否是查看
                    this.isView = true;
                    this.getUserInfo();
                }else{
                    this.setData(rowData);
                };
                this.getPlanList()
            },
            setData(rowData){


                this.ruleForm.BuyUserRelation = rowData.BuyUserRelation || '';
                this.ruleForm.ArchiveRemark = rowData.ArchiveRemark || '';

                this.ruleForm.BMI = rowData.BMI || '';
                this.ruleForm.BloodPressure = rowData.BloodPressure || '';
                this.ruleForm.Cholesterol = rowData.Cholesterol || '';
                this.ruleForm.Triglyceride = rowData.Triglyceride || '';
                this.ruleForm.HighDensity = rowData.HighDensity || '';
                this.ruleForm.LowDensity = rowData.LowDensity || '';
                this.ruleForm.UricAcid = rowData.UricAcid || '';
                this.ruleForm.DrinkWine = rowData.DrinkWine || '';
                this.ruleForm.Smoke = rowData.Smoke || '';

                this.PlanImgUrl = rowData.PlanImgUrl;
                this.ruleForm.Sex = rowData.Sex?rowData.Sex.toString():'';
                this.ruleForm.Id = rowData.Id;
                this.ruleForm.Name = rowData.Name;
                this.ruleForm.Mobile = rowData.Mobile;
                this.ruleForm.WxNo = rowData.WxNo;
                this.ruleForm.BuyUser = rowData.BuyUser;
                this.ruleForm.BuyUserMobile = rowData.BuyUserMobile;
                this.ruleForm.BuyWxNo = rowData.BuyWxNo;
                // if (rowData.IsArchives) {
                this.ruleForm.Height = rowData.Height;
                this.ruleForm.Weight = rowData.Weight;
                this.ruleForm.Brithday = rowData.BrithdayStr;
                this.ruleForm.RedProtein = rowData.RedProtein;
                this.ruleForm.Code = rowData.Code || rowData.SlashsoftCode;
                this.ruleForm.SugarType = rowData.SugarType?rowData.SugarType.toString():'';
                this.ruleForm.DiagnosisTime = rowData.DiagnosisTime;
                this.ruleForm.InsulinMethod = rowData.InsulinMethod?rowData.InsulinMethod.toString():'0';
                this.ruleForm.TreatmentPlan = rowData.TreatmentPlan?rowData.TreatmentPlan.toString():'';
                if(rowData.Complications){
                    this.ruleForm.Complications = [];
                    JSON.parse(rowData.Complications).forEach((item) => {
                        this.ruleForm.Complications.push(item.toString())
                    })
                }


                // }

            },
            submitForm(formName) {
                console.log(this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var submitData = {
                            Id: this.ruleForm.Id,
                            Name: this.ruleForm.Name,
                            Mobile: this.ruleForm.Mobile,
                            WxNo: this.ruleForm.WxNo,
                            Sex: this.ruleForm.Sex,
                            BuyUser: this.ruleForm.BuyUser,
                            BuyUserMobile: this.ruleForm.BuyUserMobile,
                            BuyWxNo: this.ruleForm.BuyWxNo,
                            Height: this.ruleForm.Height,
                            Weight: this.ruleForm.Weight,
                            Brithday: this.ruleForm.Brithday,
                            RedProtein: this.ruleForm.RedProtein,
                            Code: this.ruleForm.Code,
                            SugarType: this.ruleForm.SugarType,
                            DiagnosisTime: this.ruleForm.DiagnosisTime,
                            InsulinMethod: this.ruleForm.InsulinMethod,
                            TreatmentPlan: this.ruleForm.TreatmentPlan,
                            BuyUserRelation: this.ruleForm.BuyUserRelation,
                            ArchiveRemark: this.ruleForm.ArchiveRemark,
                            Complications: JSON.stringify(this.ruleForm.Complications),


                            BloodPressure: this.ruleForm.BloodPressure,
                            Cholesterol: this.ruleForm.Cholesterol,
                            Triglyceride: this.ruleForm.Triglyceride,
                            HighDensity: this.ruleForm.HighDensity,
                            LowDensity: this.ruleForm.LowDensity,
                            UricAcid: this.ruleForm.UricAcid,
                            DrinkWine: this.ruleForm.DrinkWine,
                            Smoke: this.ruleForm.Smoke,
                        }
                        console.log(submitData)
                        // this.ruleForm.Complications = JSON.stringify(this.ruleForm.Complications);
                        fetchData('/User/VipUser/ActiveUser', submitData).then(response => {
                            //  this.ruleForm.Complications = JSON.parse(this.ruleForm.Complications);
                            this.$message({
                                // title: '用户建档',
                                message: '用户建档'+response.Message,
                                type: response.Status == 0 ? 'success' : 'error',
                                duration: 2000
                            });
                            this.resetForm('ruleForm');
                            //  this.prevPage();
                        }).catch(error => {
                            console.log(error)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            endTime(){
                let self = this
                return {
                    disabledDate(time){
                        const thDate=new Date("2010-12-31");
                        return time.getTime() > thDate;
                    }
                }
            },
            createPlan() { // 生成排期
                fetchData('/User/VipUser/CreatePlan', { Data: this.ruleForm.Id }).then(response => {
                    this.$message({
                        // title: '生成排期',
                        message: '生成排期'+response.Message,
                        type: response.Status == 0 ? 'success' : 'error',
                        duration: 2000
                    })
                    this.getPlanList()
                }).catch(error => {
                    this.getPlanList()
                    console.log(error)
                })
            },
            getPlanList() {
                this.listLoading = true;
                fetchData('/User/VipUser/GetPlanList', { Data: this.$route.query.Id }).then(response => {
                    if (response.Data) {
                        this.list = response.Data
                        this.total = response.Data.Count
                    }
                    this.listLoading = false
                    this.getTaskName()
                }).catch(error => {
                    console.log(error)
                })
            },
            planTimeSaveFun(row) {
                var temp = {
                    UserId: row.UserId,
                    Id: row.Id,
                    Hour: row.Hour,
                    PlanTime: row.PlanTimeStr,
                    Sort: row.Sort,
                    TaskRemarkCreate: row.TaskRemarkCreate,
                    Name: row.Name
                    // Weight:row.Weight
                }
                fetchData('/User/VipUser/SetPlan', temp).then(response => {
                    this.$message({
                        // title: '排期保存',
                        message: '排期保存'+response.Message,
                        type: response.Status == 0 ? 'success' : 'error',
                        duration: 2000
                    })
                    this.getPlanList()
                }).catch(error => {
                    console.log(error)
                })
            },
            planTimeSave(row, index) {
                // console.log(index)
                if (index == 0) {
                    if (!this.compareTime(index, index + 1)) {
                        this.planTimeSaveFun(row)
                    } else {
                        this.$message({ message: '当期时间不能大于下期时间', type: 'warning' })
                    }
                } else if (index == 5) {
                    if (this.compareTime(index, index - 1)) {
                        this.planTimeSaveFun(row)
                    } else {
                        this.$message({ message: '当期时间不能小于上期时间', type: 'warning' })
                    }
                } else {
                    if (this.compareTime(index, index - 1) && !this.compareTime(index, index + 1)) {
                        this.planTimeSaveFun(row)
                    } else {
                        this.$message({ message: '当期时间不能小于上期时间且不能大于下期时间', type: 'warning' })
                    }
                }
            },
            compareTime(num1, num2) {
                var date1 = this.list[num1].PlanTimeStr
                var date2 = this.list[num2].PlanTimeStr
                var oDate1 = new Date(date1)
                var oDate2 = new Date(date2)
                if (oDate1.getTime() > oDate2.getTime()) {
                    // console.log('第一个大');
                    return true
                } else {
                    // console.log('第二个大');
                    return false
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            prevPage() {
                this.$router.go(-1)
            },
            getTaskName() {
                fetchData('/User/VipUser/GetKeyVals', { Data: this.str3 }).then(response => {
                    if (response.Data) {
                        this.taskNameArr = response.Data
                        console.log(this.taskArr)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            getUserInfo(){ //获取用户详情
                fetchData('/User/VipUser/GetUserById', {Data:this.UserId}).then(response => {
                    if (response.Data) {
                        //this.ruleForm = response.Data;
                        this.setData(response.Data)
                    }
                }).catch(error => {
                    console.log(error)
                })

            },

        }
        // watch: {
        //     '$route' () {
        //         this.init();
        //     }
        // }
    }
</script>
