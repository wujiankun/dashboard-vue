<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="form.name"></el-input>
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
    <el-button type="primary"
               @click="handleAdd"
    >添加角色
    </el-button>
    <el-table
      :data="roleList"
      style="width: 100%;margin-bottom: 20px">
      <el-table-column
        prop="id"
        label="编号"
      />
      <el-table-column
        prop="name"
        label="角色名称"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        prop="createdTime"
        label="添加时间"
      />
      <el-table-column
        label="操作"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">
          <div>
            <el-button
              type="text"
              @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
            >分配菜单
            </el-button>
            <el-button
              type="text"
              @click="$router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })"
            >分配资源
            </el-button>
          </div>
          <div>
            <el-button
              type="text"
              @click="handleEdit(scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.current"
      :page-sizes="[6,10,20]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="form.total">
    </el-pagination>
    <el-dialog :title="isEdit ? '编辑角色' : '添加角色'"
               :visible.sync="dialogFormVisible">
      <CreateOrEdit :is-edit="isEdit" :role-id="currRoleId"
                    @success="onSuccess"
                    v-if="dialogFormVisible"
                    @cancel="dialogFormVisible = false"/>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { deleteRoleById, getAllRoles } from '@/services/role'
import { Form } from 'element-ui'
import Vue from 'vue'
import CreateOrEdit from './components/create-or-edit.vue'

export default Vue.extend({
  name: 'ResourceIndex',
  components: { CreateOrEdit },
  data () {
    return {
      roleList: [],
      form: {
        name: '',
        size: 10, // 页面大小
        total: 0, // 总条数,
        current: 1
      },
      isLoading: true,
      isEdit: false,
      dialogFormVisible: false,
      currRoleId: null
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    async loadResources () {
      this.isLoading = true
      const { data } = await getAllRoles(this.form)
      if (!!data && data.code === '000000') {
        const {
          records,
          total
        } = data.data
        this.roleList = records
        this.form.total = total
      }
      this.isLoading = false
    },

    onSubmit () {
      console.log('submit!')
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.loadResources()
    },
    handleEdit (item: any) {
      console.log('handleEdit', item)
      this.currRoleId = item.id
      this.isEdit = true
      this.dialogFormVisible = true
    },
    handleAdd () {
      this.currRoleId = null
      this.isEdit = false
      this.dialogFormVisible = true
    },
    onSuccess () {
      this.dialogFormVisible = false
      this.$message.success('操作成功')
      this.form.current = 1
      this.loadResources()
    },

    async handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => { // 确认执行这里
          // 请求删除操作
          const { data } = await deleteRoleById(item.id)
          if (!!data && data.code === '000000') {
            this.$message.success('操作成功')
            await this.loadResources() // 更新数据列表
          } else if (data) {
            this.$message.error(data.mesg)
          } else {
            this.$message.error('未知错误')
          }
        })
        .catch(err => { // 取消执行这里
          console.log(err)
        })
    },
    handleCurrentChange (current: number) {
      this.form.current = current
      this.loadResources()
    },
    handleSizeChange (size: number) {
      this.form.size = size
      this.form.current = 1
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-button--text {
  padding: 0;
}
</style>
