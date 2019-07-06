<template>
<div>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="广告名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="广告区域">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="广告时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" value-format=" yyyy-MM-dd"  v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="广告类型" >
      <el-radio-group v-model="form.type">
      <el-radio label="手机数码" name="type"></el-radio>
      <el-radio  label="礼品鲜花" name="type"></el-radio>
      <el-radio  label="男装女装" name="type"></el-radio>
      <el-radio  label="母婴用品" name="type"></el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item label="活动细节">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <template scope="scope3">
    <el-button type="primary" @click="add()">立即创建</el-button>
    <el-button type="primary" @click="search(scope3.$index)">筛选</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    </template>
  </el-form-item>
 
</el-form>

 <el-table :data="tableData" stripe style="width: 100%" >
    <el-table-column prop="name" label="广告名称"></el-table-column>
    <el-table-column prop="area" label="广告区域"></el-table-column>
    <el-table-column prop="time" label="广告时间"></el-table-column>
    <el-table-column prop="type" label="广告类型"></el-table-column>
    <el-table-column prop="details" label="广告细节">
      <template  scope="scope1">
        <el-button plain @click="open(scope1.$index)">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="operate" label="操作">
      <template scope="scope"> 
        <i class="el-icon-delete" @click="del(scope.$index,tableData)"></i>
     </template> 
    </el-table-column>
     <el-table-column prop="edit" label="编辑">
      <template scope="scope"> 
        <i class="el-icon-edit" @click="change(scope.$index,tableData)"></i>
     </template> 
    </el-table-column>
  </el-table>
</div>
</template>
<script>
    import axios from 'axios'
    export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
         
        }, 
        tableData:[],
        isShow:true,  
         input:''  
      }
    },
    created(){
      this.getData();
    },
    methods: {
      add() {
        this.tableData.push({
          name:this.form.name,
          area:this.form.region,
          time:this.form.date1,
          type:this.form.type,
          details:this.form.desc
        })
        this.form.name="";
        this.form.region="";
        this.form.date1="";
        this.form.type="";
        this.form.desc=""
      },
      change(index){
        this.tableData.splice(index,1,{
          name:this.form.name,
          area:this.form.region,
          time:this.form.date1,
          type:this.form.type,
          details:this.form.desc
        })
        this.form.name="";
        this.form.region="";
        this.form.date1="";
        this.form.type="";
        this.form.desc=""
      },
      getData(){
        this.isShow = true;
        axios.get('https://www.easy-mock.com/mock/5d1ea22f2dd4f159a4d2e0c7/advertise/addata')
        .then((result)=>{
          console.log(result.data.data.projects);
          this.isShow = false;
            this.tableData = [...this.tableData,...result.data.data.projects];
        })
      },
      del(index,rows){
       rows.splice(index,1)
      },
      open(index) {
        const h = this.$createElement;
        this.$notify({
          title: this.tableData[index].name,
          message: h('i', { style: 'color: teal'}, this.tableData[index].details)
        });
      },
      search(){
        let searchData = this.tableData.filter((obj,index)=>{
          return obj.name.includes(this.input);
        })
        this.tableData = [...searchData];
        this.input = '';
      }
    }
  }
</script>
<style>

</style>