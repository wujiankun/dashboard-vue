<template>
  <el-form>
    <el-form-item label="角色名称">
      <el-input v-model="role.name"></el-input>
    </el-form-item>
    <el-form-item label="角色编码">
      <el-input v-model="role.code"></el-input>
    </el-form-item>
    <el-form-item label="角色描述">
      <el-input type="textarea" v-model="role.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import Vue from 'vue'
import { getRoleById ,addOrUpdate} from '@/services/role'

export default Vue.extend({
  name: 'ResourceCreateOrEdit',
  props: {
    roleId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      role: {
        code: '',
        name: '',
        description: ''
      }
    }
  },

  async created () {
    if (this.isEdit) {
      const { data } = await getRoleById(this.roleId)
      if (!!data && data.code === '000000') {
        this.role = data.data
      }
    }
  },

  methods: {
    async onSubmit () {
      // 1. 表单验证
      // 2. 验证通过，提交表单
      const { data } = await addOrUpdate(this.role)
      if (data.code === '000000') {
        this.$emit('success')
      } else {
        this.$message.error(data.mesg)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
