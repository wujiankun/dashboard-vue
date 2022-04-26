<template>
  <el-aside class="sidebar" width="200px">
    <router-link :to="{name:'home'}" class="logo" title="back to home">
      <el-avatar
        shape="square"
        :src="logoUrl"
      ></el-avatar>
      <h1 style="margin-left: .5rem">Edu Boss</h1>
    </router-link>
    <!-- 如果菜单已收起，则给 el-submenu 作⽤ collapse 属性 -->
    <el-menu router @open="handleOpen"
             :default-active="activeItem"
             active-text-color="#ff6b6b"
             @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span >权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-lock"></i>
          <span>角⾊列表</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-lock"></i>
          <span>菜单列表</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-lock"></i>
          <span>资源列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-film"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">⽤户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>⼴告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-menu"></i>
          <span>⼴告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-menu"></i>
          <span>⼴告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import logoImg from '../assets/logo.png'

@Component({ name:'SideBar' })
export default class Sidebar extends Vue {
  logoUrl = logoImg
  activeItem=''
  handleOpen (key: string, keyPath: string): void {
    console.log(key, keyPath)
  }

  created(){
    this.activeItem = this.$route.path
  }

  handleClose (key: string, keyPath: string): void {
    console.log(key, keyPath)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.logo{
  display: flex;align-items: center;justify-content: center;
  border: solid 1px #e6e6e6;padding: .5rem 0;
}
.sidebar{
  background: #fff;
}
</style>
