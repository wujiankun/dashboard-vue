<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      :value="value"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onChange="onChange"
      @onCreated="onCreated"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  beforeDestroy() {
    const editor = this.editor as any
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor:any) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange(editor: any){
      console.log(editor.getHtml())
      this.$emit('input', editor.getHtml())
    }
  }
})
</script>

<style lang="scss" scoped></style>
