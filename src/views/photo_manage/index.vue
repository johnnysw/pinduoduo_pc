<template>
    <div>
        <!-- 发布商品 马玉雪 -->
      
        <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="基本信息">
              
            </el-form-item>
            <!-- 名称 商品分类 -->
            <el-form-item label="*名称" class="NName">
                <el-input v-model="form.name" placeholder="商品名称，字数5~60"></el-input>
            </el-form-item>
            <el-form-item label="*商品分类">
                <el-select v-model="form.region" placeholder="请选择分类">
                    <el-option label="衣服" value="衣服"></el-option>
                    <el-option label="帽子" value="帽子"></el-option>
                </el-select>
            </el-form-item>

            <!-- 商品图 -->
            <el-form-item label="*商品图"></el-form-item>
            <!-- 封面图 -->
            <span>
                <el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="2.2">
                            <div class="grid-content bg-purple">
                                <el-form-item>
                                    <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    list-type="picture-card"
                                    >
                                    <!-- :on-success/:on-error
                                        分别是图片上传成功/失败绑定的函数，在函数里面我们可以进行一些操作，我们可以拿到成功或者失败的的图片信息 -->
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon">封面图</i>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div class="grid-content bg-purple">
                                <!-- 描述图（照片墙） -->
                                <el-form-item class="describe_photo">
                                    <el-upload
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove"
                                        >
                                        <i class="el-icon-plus">描述图</i>
                                    </el-upload>
                                </el-form-item>
                                <el-dialog :visible.sync="dialogVisible" >
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
            </span>
            <!-- 商品详情 -->
            <el-form-item label="*商品详情"></el-form-item>
            <el-form-item style="width: 1000px">   
                <quill-editor 
                    v-model="content" 
                    ref="myQuillEditor" 
                    :options="editorOption" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    style="higth: 920px"
                    >
                </quill-editor> 
            </el-form-item>

            <!-- 销售信息 -->
            <el-form-item label="*销售信息"></el-form-item>
            <el-form-item style="width: 1000px">
                
                <el-table :data="tableData" style="width: 100%" >
                    <el-table-column  label="图片" prop="photo">
                    </el-table-column>
                    <el-table-column label="规格名称*" prop="name">
                    </el-table-column>
                     <el-table-column label="单价*" prop="pirce">
                    </el-table-column>
                     <el-table-column label="发售总数*" prop="sum">
                    </el-table-column>
                     <el-table-column label="描述" prop="describe">
                    </el-table-column>
                     <el-table-column label="每人限购数*" prop="num">
                    </el-table-column>

                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
               
                <el-button type="text" size="mini" @click="add">添加</el-button>
                <el-button type="text" size="mini" @click="sure">确定</el-button>
                 <!-- 销售信息输入框 -->
                 <span  v-show="isShow"  id="hid_input">
                    <el-row :gutter="20">
                        <el-col :span="4">

                            <div class="grid-content bg-purple">
                                <span>图片上传：</span>
                                <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </div>

                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                 <span>规格名称：</span><input class='Input' v-model="sell_name" placeholder="请输入商品名"/>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <span>单价：</span><input class='Input' v-model="sell_pirce" placeholder="请输入商品名"/>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <span>发售总数：</span><input class='Input' v-model="sell_sum" placeholder="请输入商品名"/>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <span>描述：</span><input class='Input' v-model="sell_describe" placeholder="请输入商品名"/>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <span>每人限购数：</span><input class='Input' v-model="sell_num" placeholder="请输入商品名"/>
                            </div>
                        </el-col>
                        
                    </el-row>
                 </span>
                 
            </el-form-item>

            <el-form-item label="配置信息"></el-form-item>   
            <el-form-item label="上架时间">
                <el-radio-group v-model="radio" >
                    <el-form-item>
                        <el-radio :label="3">立即上架</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-radio :label="6" >定时上架</el-radio>
                        <div class="block" v-show="radio==6">
                            <span class="demonstration">设置时间</span>
                            <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-radio :label="9">放入仓库</el-radio>
                    </el-form-item>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="促销设置">
                <el-form-item>
                    <el-checkbox v-model="integral"> 使用积分抵现</el-checkbox>
                    <span>
                        <el-form-item>
                            <span v-show="integral">
                                <span >抵现比例</span>
                                <el-input v-model="integral_proportion" placeholder="" size='mini' class="integral"></el-input>%
                            </span>
                        </el-form-item>
                    </span>
                </el-form-item>

                <el-form-item>
                    <el-checkbox v-model="discount">折扣促销</el-checkbox> 
                    <el-form-item>
                        <span v-show="discount">
                            <span>折扣</span>
                            <el-input v-model="discount_proportion" placeholder="" size='mini' class="integral"></el-input>折
                        </span>
                    </el-form-item>
                </el-form-item>
            </el-form-item>

            <el-form-item label="配送方式">
                <el-radio-group v-model="expressage">
                    <el-form-item>
                        <el-radio :label="2">在线电子票，无需物流</el-radio>
                    </el-form-item>
                    <el-form-item >
                        <el-radio :label="4">快递发货</el-radio>
                        <div>
                            <el-form-item v-show="expressage == 4">
                                <span>
                                    <span>发货地：</span>
                                    <el-input v-model="address_" placeholder="" size='mini' class="integral"></el-input>
                                </span>
                                <br>
                                <span >
                                    <span >运费设置：</span>
                                    <el-input v-model="freight" placeholder="" size='mini' class="integral"></el-input>%
                                </span>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item>
                <span>
                    <el-button type="primary" @click="onSubmit">提交信息</el-button>
                </span>
            </el-form-item>
        </el-form>

    </div>
</template>

<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.10.0/lib/index.js"></script>

<script>
// new Vue().$mount('#hid_input')
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data() {
            return {
                isShow:false,
                search:'',
                input:'',
                isShow:false,
                // 表单
                form: {
                name: '',// 名称
                region: '',// 商品分类
               
                type: [],
                resource: '',
                desc: '',
                },

                // 描述图
                dialogImageUrl: '',
                dialogVisible: false,
                a:'',
                b:'',
                c:'',
               
                // 主图
                imageUrl: "",
                Pphoto_name:'',
                Pphoto_uid:'',

                // 销售信息  的图片
                fileList: [
                    {
                        name: 'food.jpeg', 
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    },
                ],
                // 上架时间
                radio: 3,

                // 上架时间： 定时上架的设置时间
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                            text: '今天',
                            onClick(picker) {
                            picker.$emit('pick', new Date());
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                            }
                        }, {
                            text: '一周前',
                            onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                            }
                        }
                    ]
                },
                // 选择日期
                value1: '',
                // 促销设置  抵现比例
                integral: '',
                integral_proportion:'',
                discount: '',
                discount_proportion:'',

                // 配送方式
                expressage: 2,
                // 地址
                address_:'',
                // 运费
                freight:'',

                // 销售信息
                tableData:[
                    {
                        id:0,
                        photo:'mmm',
                        name: '服装',
                        pirce: 123,
                        sum:16,
                        describe:'好看',
                        num:'5'
                    },
                ],
                // 销售信息列表
                sell_photo:'',
                sell_name:'',
                sell_pirce:'',
                sell_sum:'',    
                sell_describe:'',
                sell_num:'',

                // 富文本
                content:'',
                editorOption:{
                    modules:{
                    toolbar:[
                        ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                        // ['blockquote', 'code-block'], //引用，代码块
                        [{ 'header': 1 }, { 'header': 2 }], // 标题，键值对的形式；1、2表示字体大小
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }], //列表
                        [{ 'script': 'sub'}, { 'script': 'super' }], // 上下标
                        [{ 'indent': '-1'}, { 'indent': '+1' }], // 缩进
                        [{ 'direction': 'rtl' }], // 文本方向
                        [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //几级标题
                        [{ 'color': [] }, { 'background': [] }], // 字体颜色，字体背景颜色
                        [{ 'font': [] }], //字体
                        [{ 'align': [] }], //对齐方式
                        ['clean'], //清除字体样式
                        // ['image','video'] //上传图片、上传视频
                        ]
                    },
                },
            
                }
            },
        methods: {
            // 销售信息的图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },  
            // 描述图
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.a = file;
                this.b = fileList;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 主图
            handleAvatarSuccess(res, file) {
                // console.log(file.url);
                this.imageUrl = URL.createObjectURL(file.raw);
                this.Pphoto_name = file.raw.name;
                this.Pphoto_uid = file.raw.uid;
                // console.log(file.raw);
                // console.log(file.raw.name);
                // console.log(file.raw.uid);
                // console.log(this.imageUrl);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 提交信息
            onSubmit() {
                console.log('submit!');
                console.log(this.form.name);
                console.log(this.form.region);

                console.log('主图有点蒙的地址'+this.imageUrl);
                console.log('主图图片名字'+this.Pphoto_name);
                console.log('主图uid'+this.Pphoto_uid);
                console.log(''+this.dialogImageUrl);
                console.log(this.a);
                console.log(this.b);
                // 富文本框内容
                console.log(this.content);
                // // 销售信息
                console.log(this.tableData);

                console.log(this.radio);
                // // 3：立即上架
                // // 6：定时上架
                // // 9：放入仓库

                // // 定时上架时间
                console.log(this.value1);
                // // 促销设置

                console.log('使用积分抵现'+this.integral);
                console.log('抵现比例'+this.integral_proportion);

                console.log('使用积分抵现'+this.discount);
                console.log('抵现比例'+this.discount_proportion);

                // // 配送方式
                console.log('配送方式：'+this.expressage);
                // // 2:电子发票
                // // 4：快递

                console.log('发货地：'+this.address_);
                console.log('发货地：'+this.freight);
            },

            // 富文本
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },

            // 销售信息  添加 
            add(){  
                this.isShow = true;
            },
            sure(){  
                // console.log(this.tableData.findIndex(item => item.photo == 'mmm' ));//找数组中的指定元素
                if(!(this.tableData.findIndex(item => item.photo == 'mmm') )){
                    var a = this.tableData.findIndex(item => item.photo == 'mmm' )
                    // console.log('0存在');
                    this.tableData.splice(a,1)
                }
                this.tableData.push({name:this.sell_name,pirce:this.sell_pirce,sum:this.sell_sum,describe:this.sell_describe,num:this.sell_num});
                this.sell_name = '';
                this.sell_pirce = '';
                this.sell_sum = '';
                this.sell_describe = '';
                this.sell_num = '';
                this.isShow = false;
                //  console.log(this.tableData);
            },
           
            handleDelete(index, row) {
                // console.log(index, row);
                this.tableData.splice(index,1);
            }
        }
    }
</script>

<style scoped>
    .NName{
        width: 500px;
    }
    .integral{
        width: 200px;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }

  /* 商品图样式 */
  /* 封面图 */
  .avatar-uploader-icon[data-v-54e769af]{
    width: 148px;
    height: 148px;  
    line-height: 148px;

  }
  /* 封面图片 */
  .avatar[data-v-54e769af]{
   width: 148px;
   height: 148px;   
  }
  .ql-blank{
    height: 800px;
  }

  .Input{
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  /* hid_input */
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>