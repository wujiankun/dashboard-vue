<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item prop="name" label="资源名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="资源路径">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="资源分类">
          <el-select
            v-model="form.categoryId"
            placeholder="请选择资源分类"
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in resourceCategories"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="isLoading"
          >查询搜索
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
               @click="$router.push({name:'resource-create'})"
               :disabled="isLoading"
    >添加资源
    </el-button>
    <el-table
      :data="resourceList"
      style="width: 100%;margin-bottom: 20px">
      <el-table-column
        type="index"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称">
      </el-table-column>
      <el-table-column
        prop="url"
        label="资源路径">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="添加时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
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
  </el-card>
</template>

<script lang="ts">
import { deleteResById, getResourceCategories, getResourcePages } from '@/services/resource'
import { Form } from 'element-ui'
import Vue from 'vue'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      resourceList: [],
      resourceCategories: [],
      form: {
        name: '',
        url: '',
        categoryId: null,
        size: 10, // 页面大小
        total: 0, // 总条数,
        current: 1
      },
      isLoading: true
    }
  },
  created () {
    this.loadResources()
    this.loadResourceCategories()
  },
  methods: {
    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (!!data && data.code === '000000') {
        const {
          records,
          size,
          total
        } = data.data
        this.resourceList = records
        this.form.size = size
        this.form.total = total
      }
      this.isLoading = false
    },
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      if (!!data && data.code === '000000') {
        this.resourceCategories = data.data
      }
    },
    onSubmit () {
      console.log('submit!')
      this.form.current = 1
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },
    handleEdit (item: any) {
      console.log('handleEdit', item)
      this.$router.push({
        name: 'resource-edit',
        params: {
          id: item.id
        }
      })
    },

    async handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => { // 确认执行这里
          // 请求删除操作
          const { data } = await deleteResById(item.id)
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

<style lang="scss" scoped></style>
