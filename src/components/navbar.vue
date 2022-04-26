<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="onDropMenu">
      <span class="el-dropdown-link">
        <el-avatar
          shape="circle"
          :size="40"
          :src="portrait||'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="info">{{ userName }}</el-dropdown-item>
        <el-dropdown-item divided command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'
import store from '@/store'

export default Vue.extend({
  name: 'NavBar',
  data () {
    return {
      portrait: '',
      userName: ''
    }
  },
  created () {
    this.loadUserInfo('1');
    /* this.loadUserInfo('2');
    this.loadUserInfo('3');
    this.loadUserInfo('34');
    this.loadUserInfo('5');
    this.loadUserInfo('6');
    this.loadUserInfo('7'); */
  },
  methods: {
    async loadUserInfo(tag:string){
      const { data } = await getUserInfo(tag)
      // console.log({ data })
      if (data.state === 1) {
        const {
          portrait,
          userName
        } = data.content
        this.portrait = portrait
        this.userName = userName
      } else {
        this.$message.error(data.message)
      }
    },
    onDropMenu (command:string) {
      if (command === 'exit') {
        this.logout()
      } else if (command === 'info') {
        // show user info
      }
    },
    logout () {
      this.$confirm('此操作将删除登录状态, 是否继续?', '确定退出么', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.commit('setUser',null)
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '成功注销用户!'
        });
      }).catch(()=>{
        // do nothing
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: auto;
  display: flex;
  align-items: center;
  background: #fff;
  padding: .5rem .8rem;
  justify-content: space-between;

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
