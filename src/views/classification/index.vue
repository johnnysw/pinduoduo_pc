<template>
  <div class="classification">
    <div class="text box-card">
        <i data-v-6806acc0="" class="el-icon-tickets" style="margin-top: 5px;"></i>
        <span data-v-6806acc0="" style="margin-top: 5px;">数据列表</span>
        <el-button @click="goaddgoods()" class="box-card-button">添加</el-button>
    </div>
    <!-- 顶部添加商品类型功能 -->
    <!-- {{this.$store.state.AMsg}} -->
    <el-table
      :data= 'olevel'
      stripe
      style="width: 70%"
      border
      class="tablegoods">
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="typename"
        label="类型名称">
      </el-table-column>
      <el-table-column
        prop="level"
        label="级别">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="查看下级">
        <el-button slot-scope="scope" class="nextlevelview" @click='nextlevelview(scope.$index)' :disabled="flag === 2">查看下级</el-button>
        <!-- <el-button slot-scope="scope" @click='delete(scope.$index)' class="nextlevelview">删除</el-button> -->
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showlevel: this.$store.state.categary,
      flag: this.$store.state.categaryflag,
      // 判断商品级别
      olevel: [],
      // 存入要显示的数据
      addnum: this.$store.state.categaryaddnum
      // 把下层添加的商品加入到上层的index位置
    }
  },
  methods: {
    nextlevelview(index) {
      this.olevel = this.showlevel[index].nextlevel
      // 将下级商品显示
      this.addnum = index
      this.flag = 2
      this.$store.commit('changeflag', this.flag)
    },
    // 点击查看下级商品
    goaddgoods() {
      var addlevel = this.flag
      var addlevelnum = this.addnum
      this.$router.push('/classification/toaddgoods/' + addlevel + '/' + addlevelnum)
      this.$store.commit('addnextnum', this.addnum)
    }
  },
  mounted: function() {
    this.olevel = this.showlevel
    if (this.$route.params.name !== ':name' && this.$route.params.region !== ':region') {
      // 如果有传参
      if (this.$route.params.region === '一级') {
        this.$store.commit('addgoodsregion', this.$route.params.region)
        this.$store.commit('addgoods', this.$route.params.name, this.$route.params.region)
        // 如果添加商品类别为一级，push商品信息并显示
      } else if (this.$route.params.region === '二级') {
        this.$store.commit('addnextnum', this.addnum)        
        this.$store.commit('addnextregion', this.$route.params.region)
        this.$store.commit('addnextgoods', this.$route.params.name)
        this.olevel = this.showlevel[this.addnum].nextlevel
        // 如果添加商品类别为二级，push商品信息在对应的index里并显示
      }
    }
  }
}
</script>
<style scoped>
  *{
    margin: 0px;
    padding: 0px;
  }
  .text {
    font-size: 17px;
  }
  .box-card {
    width: 90%;
    height: 70px;
    margin: 3% auto;
    border: 1px solid rgba(58, 42, 42, 0.1);
    line-height: 70px;
    position: relative;
    padding-left: 10px;
  }
  .box-card-button{
    line-height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .tablegoods{
    text-align: center;
    margin: auto;
    width: 90%;
  }
  .nextlevelview{
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
