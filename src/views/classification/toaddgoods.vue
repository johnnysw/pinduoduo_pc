<template>
  <div class="add-goods">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类名称:">
        <el-input v-model="form.name" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="上级分类:">
        <el-select v-model="form.region" :placeholder="this.$route.params.addlevel === '2'?'上级分类':'无上级分类'">
          <el-option v-show="this.$route.params.addlevel === '2'" label="一级" value="一级" class="goods-option"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goindex(form.name, form.region)">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: ''
      }
    }
  },
  methods: {
    goindex(name, region) {
      this.$router.push('/classification/classification/' + name + '/' + ((region !== '一级') ? '一级' : '二级'))
    }
  }
}
</script>
<style scoped>
  .add-goods{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid rgba(58, 42, 42, 0.1);
    padding: 30px;
  }
</style>

