<!--姚之琳-->
<template>
  <div>
    <el-container>
      <!--<el-header>-->
          <!--<p>商品管理</p>-->
      <!--</el-header>-->
      <el-main>
        <!--选项卡-->
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="出售中的商品" name="first"></el-tab-pane>
            <el-tab-pane label="仓库中的商品" name="second"></el-tab-pane>
          </el-tabs>
          <el-select
            v-model="value"
            placeholder="全部"
            @change="change"
            class="select"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-input
            v-model="input"
            size="small"
            class="query"
            @change="changeEvent"
            placeholder="全部"
          ></el-input>

          <el-button
            size="mini"
            type="primary"
            @click="queryList"
          >查询</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="goPublish"
            class="right"
          >+发布商品</el-button>

            <el-table
              ref="multipleTable"
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              border
              fit
              highlight-current-row
              align="center"
              style="width: 100%"
              :row-key="getRowKey"
              @select="handleSelect"
              @selection-change="handleSelectionChange"
              v-loading="listLoading"
            >
            <el-table-column
              type="selection"
              :reserve-selection="true"
            >
            </el-table-column>
            <el-table-column
              prop="id"
              label="商品"
              align="center"
              width="300">
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-row>
                      <el-col :span="8">
                        <img :src="scope.row.src" alt="" class="image">
                      </el-col>
                      <el-col :span="16">
                        <p>{{ scope.row.name }}</p>
                        <p>{{ scope.row.id }}</p>
                      </el-col>
                    </el-row>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="category"
              label="分类"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row.category }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              align="center"
              width="150">
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    ￥{{ scope.row.price }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="storage"
              label="库存"
              align="center"
              width="100">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.storage }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sale"
              label="总销量"
              align="center"
              width="100">
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row.totalSale }}
                  </div>
              </template>
            </el-table-column>
              <el-table-column
                prop="time"
                label="发布时间"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handlePopularize(scope.$index, scope.row)">推广</el-button>
              </template>
            </el-table-column>
          </el-table>

        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
          <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="butchDelete" >确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="downVisible" width="300px" center>
          <div class="del-dialog-cnt">是否将商品下架？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="downVisible = false">取 消</el-button>
            <el-button type="primary" @click="butchDown" >确 定</el-button>
          </span>
        </el-dialog>

        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </div>
        <div class="left">
          <el-button @click="downVisible=true">批量下架</el-button>
          <el-button @click="delVisible=true">批量删除</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { getProduct,getStorage } from '@/api/table';
  export default {
    data() {
      return {
        listLoading: true,
        tableData:[],
        originData:[],
        //多选框
        multipleSelection: [],
        delArr:[],    //存放删除的商品id
        downArr:[],     //存放下架的商品id，
        delVisible:false,    //删除提示弹窗
        downVisible:false,     //下架提示弹窗
        //分页选项
        currentPage: 1,  //当前页数
        pageSize:5,  //每页条数
        total:0,   //总条数
        activeName: 'first',  //当前页数
        pageSizes:[3,5,10] , //每页显示条数
        //输入框查询
        input: '',
        groupData:[],
      //  过滤
        options: [{
          value: '全部',
          label: '全部'
        },{
          value: '华为',
          label: '华为'
        }, {
          value: '小米',
          label: '小米'
        },{
          value: '苹果',
          label: '苹果'
        }],
        value: '',
      }
    },
    created(){
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getProduct().then(response => {
          this.originData = response.data.items;
          this.tableData = this.originData;
          this.groupData = this.originData;
          this.listLoading = false;
        });
      },
      fetchStorage() {
        this.listLoading = true;
        getStorage().then(response => {
          this.originData = response.data.items;
          this.tableData = this.originData;
          this.groupData = this.originData;
          this.listLoading = false;
        });
      },
//选项卡函数------------------------------
      handleClick(tab, event) {
        // console.log(this.activeName);
        if(this.activeName == 'first'){
          // console.log(1);
          this.fetchData();
        }else{
          // console.log(2);
          this.fetchStorage();
        }
      },
//操作按钮----------------------------------------
      handleEdit(index, row) {
        // console.log(index, row);
        console.log(row.id)
      },
      handlePopularize(index, row) {
        // console.log(index, row);
        console.log(row.id)
      },
//分页---------------------------------------
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },
//checkbox-------------------------------------------
      handleSelect(selection,row){
        // console.log(row);
        // console.log(selection);
      },
      handleSelectionChange(selection){
        this.multipleSelection = selection;
      },
      getRowKey (row) {
        return row.id
      },
      //delete
      butchDelete(){
        var length = this.multipleSelection.length;
        for (let i = 0; i < length; i++) {
          this.delArr.push(this.multipleSelection[i].id);
        }
        console.log(this.delArr);
        for(var i=0;i<this.delArr.length;i++){
          this.originData.forEach((elem,index) => {
            if(elem.id == this.delArr[i]){
              this.originData.splice(index,1);
            }
          });
        }
        this.delVisible = false;//取消删除弹框
        this.$refs.multipleTable.clearSelection();//清空勾选选项
      },
      butchDown(){
        var length = this.multipleSelection.length;
        for (let i = 0; i < length; i++) {
          this.downArr.push(this.multipleSelection[i].id);
        }
        console.log(this.downArr);
        console.log(this.indexArr);
        this.downVisible = false;//取消删除弹框
        this.$refs.multipleTable.clearSelection();//清空勾选选项
      },
//查询-----------------------------------------------------------
      queryList(){
        // console.log(this.input);
        var queryData = [];
        this.groupData.forEach((elem,index) => {
            if(elem.name.indexOf(this.input) != -1){
              queryData.push(elem)
            }
        });
        this.tableData = queryData;
        this.input = '';
      },
      changeEvent(){
        console.log(this.input);
      },
//过滤-----------------------------------------------
      change(val){
        console.log(val);
        var filterData = [];
        if(val == '全部'){
          console.log(111);
          filterData = this.originData;
        }
        this.originData.forEach((elem,index) => {
          if(elem.category.indexOf(val) != -1){
            filterData.push(elem)
          }
        });
        this.tableData = filterData;
        this.groupData = filterData;
      },
//发表商品-------------------
      goPublish(){
          console.log(1111);
      },
    },
  }
</script>

<style scoped>
  .right{
    float:right
  }
  .el-pagination{
    float:right
  }
  .left{
    float:left
  }
  .el-col.el-col-8 img{
    width: 80px;
    height: 80px;
  }
  .query{
    width: 200px;
  }
</style>
