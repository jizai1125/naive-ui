<markdown>
# Inline

For example, JavaScript.
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      code: 'console.log("Hello World")'
    }
  }
})
</script>

<template>
  <div>
    JavaScript
    <n-code :code="code" language="javascript" inline />
  </div>
</template>
