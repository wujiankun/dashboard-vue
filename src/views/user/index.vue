<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item prop="phone" label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="startCreateTime" label="开始时间">
          <el-date-picker
            v-model="form.startCreateTime"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endCreateTime" label="结束时间">
          <el-date-picker
            v-model="form.endCreateTime"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="isLoading"
          >搜索
          </el-button>
          <el-button
            @click="onReset"
            :disabled="isLoading"
          >重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="userList"
      style="width: 100%;margin-bottom: 20px">
      <el-table-column
        prop="id"
        label="编号"
      />
      <el-table-column
        prop="name"
        label="用户名"
      />
      <el-table-column
        prop="phone"
        label="phone"
      />
      <el-table-column
        prop="status"
        label="状态"
      />
      <el-table-column
        prop="createTime"
        label="添加时间"
        :formatter="(row, column,value)=>{
          let date = new Date(value)
          return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        }"
      />
      <el-table-column
        label="操作"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">
          <div>
            <el-switch
              :value="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="ENABLE"
              @change="handleStateChange(scope.row)"
              inactive-value="DISABLE">
            </el-switch>
            <el-button
              type="text"
              @click="handleAlloc(scope.row)"
            >分配角色
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.currentPage"
      :page-sizes="[6,10,20]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="form.total">
    </el-pagination>
    <el-dialog title="分配角色"
               :visible.sync="dialogFormVisible">
      <el-select v-model="selectedRoles" multiple placeholder="请选择">
        <el-option
          v-for="item in allRoles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { DatePicker, Form } from 'element-ui'
import Vue from 'vue'
import { allocateUserRoles, enableUser, forbidUser, getAllUser, getRolesByUserId } from '@/services/user'
import { getAllOfRoles } from '@/services/role'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      userList: [],
      form: {
        phone: '',
        pageSize: 10, // 页面大小
        total: 0, // 总条数,
        currentPage: 1,
        endCreateTime: '',
        startCreateTime: ''
      },
      pickerOptions: {
        disabledDate (time: Date) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker: DatePicker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker: DatePicker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker: DatePicker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      isLoading: true,
      dialogFormVisible: false,
      currUserId: null,
      selectedRoles: [],
      allRoles: []
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    async loadResources () {
      this.isLoading = true
      const { data } = await getAllUser(this.form)
      if (!!data && data.code === '000000') {
        const {
          records,
          total
        } = data.data
        this.userList = records
        this.form.total = total
      }
      this.isLoading = false
    },

    onSubmit () {
      console.log('submit!')
      this.form.currentPage = 1
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.loadResources()
    },
    onSuccess () {
      this.dialogFormVisible = false
      this.$message.success('操作成功')
      this.form.currentPage = 1
      this.loadResources()
    },

    handleStateChange (user: any) {
      if (user.state === 'ENABLE') {
        this.handleEnable(user)
      } else {
        this.handleForbidden(user)
      }
    },

    async handleForbidden (item: any) {
      // 请求删除操作
      const { data } = await forbidUser(item.id)
      if (!!data && data.code === '000000') {
        item.status = 'DISABLE'
        this.$message.success('操作成功')
      } else if (data) {
        this.$message.error(data.mesg)
      } else {
        this.$message.error('未知错误')
      }
    },
    async handleEnable (item: any) {
      // 请求删除操作
      const { data } = await enableUser(item.id)
      if (!!data && data.code === '000000') {
        item.status = 'ENABLE'
        this.$message.success('操作成功')
      } else if (data) {
        this.$message.error(data.mesg)
      } else {
        this.$message.error('未知错误')
      }
    },
    handleCurrentChange (current: number) {
      this.form.currentPage = current
      this.loadResources()
    },
    handleSizeChange (size: number) {
      this.form.pageSize = size
      this.form.currentPage = 1
      this.loadResources()
    },
    async handleAlloc (user: any) {
      const { data } = await getAllOfRoles()
      this.allRoles = data.data
      const userRoles = await getRolesByUserId(user.id)
      this.selectedRoles = userRoles.data.data.map((item:any)=>item.id)
      this.dialogFormVisible = true
      this.currUserId = user.id
    },
    async allocRole () {
      const { data } = await allocateUserRoles({
        userId: this.currUserId,
        roleIdList: this.selectedRoles
      })
      if (!!data && data.code === '000000') {
        this.dialogFormVisible = false
      }
      this.$message.success(data.mesg)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-button--text {
  padding: 0;
}
</style>
