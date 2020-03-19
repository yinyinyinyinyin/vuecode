<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search my-icon"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="服务单号"></el-input>
          </el-form-item>
          <el-form-item label="处理状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.create_time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作人员：">
            <el-input v-model="listQuery.handle_man" class="input-width" placeholder="全部"></el-input>
          </el-form-item>
          <el-form-item label="处理时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.handle_time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets my-icon"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column label="服务单号"  align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="申请时间"  align="center">
          <template slot-scope="scope">{{scope.row.create_time | formatTime}}</template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">{{scope.row.member_username}}</template>
        </el-table-column>
        <el-table-column label="退款金额"  align="center">
          <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>
        </el-table-column>
        <el-table-column label="申请状态"  align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="处理时间"  align="center">
          <template slot-scope="scope">{{scope.row.handle_time | formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewDetail(scope.$index, scope.row)">查看详情</el-button>
			<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" >删除订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteApply} from '@/api/return';
  const defaultListQuery = {
    page_num: 1,
    page_size: 10,
    id: null,
    receiver_keyword: null,
    status: null,
    create_time: null,
    handle_man: null,
    handle_time: null
  };
  const defaultStatusOptions=[
    {label: '待处理',value: 0},
    {label: '退货中',value: 1},
    {label: '已完成',value: 2},
    {label: '已拒绝',value: 3}
  ];
  export default {
    name:'returnApplyList',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        statusOptions: Object.assign({},defaultStatusOptions),
        list:null,
        total:null,
        listLoading:false,
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(status){
        for(let i=0;i<defaultStatusOptions.length;i++){
          if(status===defaultStatusOptions[i].value){
            return defaultStatusOptions[i].label;
          }
        }
      },
      formatReturnAmount(row){
        return row.product_real_price*row.product_count;
      }
    },
    methods:{
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.page_num = 1;
        this.getList();
      },
      handleViewDetail(index,row){
        this.$router.push({path:'/oms/returnApplyDetail',query:{id:row.id}})
      },
	  //删除
      handleDelete(index, row){
          //批量删除
          this.$confirm('是否要进行删除操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteApply({"id":row.id}).then(response=>{
              this.getList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          })
        
      },
      handleSizeChange(val){
        this.listQuery.page_num = 1;
        this.listQuery.page_size = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList(){
        this.listLoading=true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.total;
        });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
  .my-icon{margin-right: 10px;}
</style>



