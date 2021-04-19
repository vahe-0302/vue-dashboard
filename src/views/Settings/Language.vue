<template>
  <div>
    <p class="title">Language</p>
    <v-radio-group v-model="language">
      <v-radio label="English" value="en"></v-radio>
      <v-radio label="Spanish (Future option)" value="es" disabled></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      language: 'en'
    }
  }
}
</script>

<style lang="scss" scoped></style>
