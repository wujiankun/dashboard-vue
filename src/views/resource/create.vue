<template>
  <CreateOrEdit :is-edit="false"></CreateOrEdit>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/create-or-edit.vue'
export default Vue.extend({
  name: 'ResourceCreate',
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
