<template>
    <div>
        <!-- 商家为商品提供的服务 -->
        <div class="ipt">
            <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable
            icon="el-icon-search"
            >
            </el-input>
        </div>
        <div>
           <el-table
            ref="multipleTable"
            :data="tables"
            tooltip-effect="dark"
            style="width: 100%"
            height="250"
            border
            @row-click="clickRow"
            @selection-change="handleSelectionChange"
            v-model="content"
            >
            <el-table-column
                prop="name"
                label="商品名称"
            >
            </el-table-column>
            <el-table-column
                prop="price"
                label="商品价格"
            >
            </el-table-column>
            </el-table>
        </div>
        <div class="content">
            <p class="choose">您选择的商品为</p>
            <p>{{ this.content }}</p>
        </div>
        <div>
            <el-table
            :data="opctions"
            border
            style="width: 100%">
            <el-table-column
            label="退换服务"
            >
                <el-radio v-model="radio1" label="7天退换">7天退换</el-radio><br/>
                <el-radio v-model="radio1" label="15天退换">15天退换</el-radio><br/>
                <el-radio v-model="radio1" label="不退换">不退换</el-radio><br/>
            </el-table-column>
            <el-table-column
            prop="time"
            label="发货时间"
            >
                <el-radio v-model="radio2" label="24小时内发货">24小时内发货</el-radio><br/>
                <el-radio v-model="radio2" label="48小时内发货">48小时内发货</el-radio><br/>
                <el-radio v-model="radio2" label="15天内发货">15天内发货</el-radio><br/>
            </el-table-column>
            <el-table-column
            prop="package"
            label="包邮服务"
            >
                <el-radio v-model="radio3" label="全场包邮">全场包邮</el-radio><br/>
                <el-radio v-model="radio3" label="部分商品包邮">部分商品包邮</el-radio><br/>
                <el-radio v-model="radio3" label="不包邮">不包邮</el-radio><br/>
            </el-table-column>
            <el-table-column
            prop="other"
            label="假一赔十"
            >
                <el-radio v-model="radio4" label="假一赔十">是</el-radio><br/>
                <el-radio v-model="radio4" label=" ">否</el-radio><br/>
            </el-table-column>
            <el-table-column
            prop="other"
            label="极速退款"
            >
                <el-radio v-model="radio5" label="极速退款">是</el-radio><br/>
                <el-radio v-model="radio5" label=" ">否</el-radio><br/>
            </el-table-column>
        </el-table>
        </div>
        <div class="content">
            <p class="choose">您选择的商品服务有</p>
            <p>{{ radio1 }}</p>
            <p>{{ radio2 }}</p>
            <p>{{ radio3 }}</p>
            <p>{{ radio4 }}</p>
            <p>{{ radio5 }}</p>
        </div>
        <div class="btn">
            <el-row>
                <el-button>提交</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        created() {
            axios.get(" https://www.easy-mock.com/mock/5d1d7b2e9c09f702d2981c31/pinpai/product")
            .then((result) => {
                // console.log(result);
                this.tableData=result.data.tableData;
            })
        },
        data() {
            return {
                opctions:[{}],
                tableData: [],
                radio1: '',
                radio2: '',
                radio3: '',
                radio4: '',
                radio5: '',
                value: '',
                input: '',
                content: '',
                multipleSelection: []
            }
        },
        methods: {
            clickRow(row){  //点击某一行的时候触发的事件
                this.$refs.multipleTable.toggleRowSelection(row);
                this.content = row.name;
                // console.log(row);
            },
            handleSelectionChange(val) {   //选择项发生变化的时候触发的事件
                this.multipleSelection = val;   
           },            
        },
        computed:{
            tables:function(){
                var input=this.input;
                if(input){
                return  this.tableData.filter(function(dataNews){
                    return Object.keys(dataNews).some(function(key){
                    return String(dataNews[key]).toLowerCase().indexOf(input) > -1
                    })
                })
                }
                return this.tableData;
            }
        }
    }
</script>

<style scoped>
    p{
        color:#909399;
        margin-left:10px;
        margin-right:10px;
        font-size:13px;
    }
    .choose{
        font-weight: bold;
        font-size: 15px;
    }
    .content{
        border:1px solid #EBEEF5;
        margin:10px;
    }
    .btn{
        float: right;
        margin:10px;
    }
    .ipt{
        display: flex;
        margin:30px;
    }
</style>