<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑资源' : '添加资源' }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
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
        <el-form-item prop="description" label="资源描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button
            v-if="!isEdit"
          >重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { getResourceCategories, saveOrUpdate, getResById } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: null,
        description: ''
      },
      resourceCategories: []
    }
  },

  async created () {
    await this.loadResourceCategories()
    if (this.$route.params.id) {
      const { data } = await getResById(this.$route.params.id)
      if (!!data && data.code === '000000') {
        this.form = data.data
      }
    }
  },

  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      if (!!data && data.code === '000000') {
        this.resourceCategories = data.data
      }
    },

    async onSubmit () {
      // 1. 表单验证
      // 2. 验证通过，提交表单
      const { data } = await saveOrUpdate(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
