<template>
  <v-progress-circular
    v-if="loading"
    indeterminate
    color="green"
  ></v-progress-circular>
  <CreateFeedstock v-else />
</template>

<script>
import CreateFeedstock from '@/components/CreateFeedstock'

export default {
  components: {
    CreateFeedstock
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped></style>
