<markdown>
# No icon
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      createMessage() {
        message.warning('I never needed anybody\'s help in any way', {
          showIcon: false
        })
      }
    }
  }
})
</script>

<template>
  <n-button @click="createMessage">
    No icon
  </n-button>
</template>
