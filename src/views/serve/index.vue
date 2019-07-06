<template>
    <div>
        <!-- 商家为商品提供的服务 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="商品名称"
            width="180">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-table-column>
            <el-table-column
            label="退换服务"
            width="180">
                <el-radio v-model="radio1" label="7天退换">7天退换</el-radio><br/>
                <el-radio v-model="radio1" label="15天退换">15天退换</el-radio><br/>
                <el-radio v-model="radio1" label="不退换">不退换</el-radio><br/>
            </el-table-column>
            <el-table-column
            prop="time"
            label="发货时间"
            width="180">
                <el-radio v-model="radio2" label="24小时内发货">24小时内发货</el-radio><br/>
                <el-radio v-model="radio2" label="48小时内发货">48小时内发货</el-radio><br/>
                <el-radio v-model="radio2" label="15天内发货">15天内发货</el-radio><br/>
            </el-table-column>
            <el-table-column
            prop="package"
            label="包邮服务"
            width="180">
                <el-radio v-model="radio3" label="全场包邮">全场包邮</el-radio><br/>
                <el-radio v-model="radio3" label="部分商品包邮">部分商品包邮</el-radio><br/>
                <el-radio v-model="radio3" label="不包邮">不包邮</el-radio><br/>
            </el-table-column>
            <el-table-column
            prop="other"
            label="假一赔十"
            width="180">
                <el-radio v-model="radio4" label="假一赔十">是</el-radio><br/>
                <el-radio v-model="radio4" label=" ">否</el-radio><br/>
            </el-table-column>
            <el-table-column
            prop="other"
            label="极速退款"
            width="180">
                <el-radio v-model="radio5" label="极速退款">是</el-radio><br/>
                <el-radio v-model="radio5" label=" ">否</el-radio><br/>
            </el-table-column>
        </el-table>
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
                this.options=result.data.options;
            })
        },
        data() {
            return {
                tableData: [{
                    name: ''
                }
                ],
                options:[],
                radio1: '',
                radio2: '',
                radio3: '',
                radio4: '',
                radio5: '',
                value: ''
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
        position: absolute;
        right:10px;
        bottom:40px;
    }
</style>