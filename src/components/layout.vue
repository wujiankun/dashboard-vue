<template>
  <el-container class="wrapper">
    <app-sidebar />
    <el-container direction="vertical">
      <app-navbar />
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import AppNavbar from './navbar.vue'
import AppSidebar from './sidebar.vue'

@Component({
  components:{
    AppSidebar,AppNavbar
  }
})
export default class LayoutIndex extends Vue{}
</script>
<style lang="scss">
.wrapper{
  min-height: 100vh;
}
</style>
