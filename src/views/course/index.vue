<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item prop="courseName" label="课程名称">
          <el-input v-model="form.courseName"></el-input>
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
    >添加课程
    </el-button>
    <el-table
      :data="courses"
      style="width: 100%;margin-bottom: 20px">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="sortNum"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="status"
        label="上架状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :disabled="scope.row.isStatusLoading"
            @change="onStateChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="$router.push({
                name: 'course-edit',
                params: {
                  courseId: scope.row.id
                }
              })"
          >编辑
          </el-button>
          <el-button
            @click="$router.push({
                name: 'course-section',
                params: {
                  courseId: scope.row.id
                }
              })"
          >内容管理
          </el-button>
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
  </el-card>
</template>

<script lang="ts">
import { changeCourseState, getQueryCourses } from '@/services/course'
import { Form } from 'element-ui'
import Vue from 'vue'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      courses: [],
      form: {
        courseName: '',
        pageSize: 10, // 页面大小
        total: 0, // 总条数,
        currentPage: 1
      },
      isLoading: true,
      isEdit: false,
      currRoleId: null
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    async loadResources () {
      this.isLoading = true
      const { data } = await getQueryCourses(this.form)
      if (!!data && data.code === '000000') {
        const {
          records,
          total
        } = data.data
        this.courses = records.map((item: any) => {
          item.isStatusLoading = false
          return item
        })
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
    },
    handleAdd () {
      this.$router.push({
        name: 'course-create'
      })
    },
    async onStateChange (course: any) {
      course.isStatusLoading = true
      try {
        await changeCourseState({
          courseId: course.id,
          status: course.status
        })
        this.$message.success('操作成功')
      } catch (e: any) {
        this.$message.error(e.message)
      } finally {
        course.isStatusLoading = false
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
    }
  }
})
</script>

<style lang="scss" scoped>
.el-button--text {
  padding: 0;
}
</style>
