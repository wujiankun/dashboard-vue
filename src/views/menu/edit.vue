<template>
  <CreateOrEdit :is-edit="true"></CreateOrEdit>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/create-or-edit.vue'
export default Vue.extend({
  name: 'MenuEdit',
  components:{
    CreateOrEdit
  },
  data(){
    return {

    }
  }
})
</script>

<style lang="scss" scoped></style>
