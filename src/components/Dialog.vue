<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on }">
      <div v-on="on" @click.stop="">
        <slot name="activator" />
      </div>
    </template>
    <v-card>
      <v-card-title class="headline">
        <slot name="title" />
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div @click.stop="dialog = false">
          <slot name="actions" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped></style>
