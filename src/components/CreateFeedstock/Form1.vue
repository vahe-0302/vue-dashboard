<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="formValues.material_type"
            :rules="validations.typeRules"
            :items="feedstocksCategories"
            item-text="name"
            item-value="id"
            label="Feedstock type"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formValues.material"
            :rules="validations.materialRules"
            label="Feedstock"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formValues.source"
            :rules="validations.sourceRules"
            label="Source of info"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formValues.reference"
            label="Notes of Feedstock"
          ></v-text-field>
        </v-col>


        <v-snackbar v-model="snackbar" timeout="2000" color="red">

          {{ formValues.material }} already esists. Please use a different name.
        </v-snackbar>
      </v-row>
    </v-container>
    <v-btn color="accent" block @click="validate">
      Continue
    </v-btn>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      snackbar: false,
      valid: false,
      formValues: {
        material_type: null,
        material: '',
        source: '',
        reference: ''
      },
      validations: {
        typeRules: [v => !!v || 'Material type is required'],
        materialRules: [v => !!v || 'material is required'],
        sourceRules: [v => !!v || 'Source is required']
      }
    }
  },
  computed: {
    ...mapState('feedstocks', ['feedstocksCategories']),
    ...mapState('feedstocks', ['myFeedstocks'])
  },
  created() {
    console.log('d', this.myFeedstocks)
  },
  methods: {
    validate() {
      // let exist_material = false
      let i
      if (this.$refs.form.validate()) {
        for (i = 0; i < this.myFeedstocks.length; i += 1) {
          if (
            this.myFeedstocks[i].material.toLowerCase() ===
            this.formValues.material.toLowerCase()
          ) {
            this.snackbar = true
            return
          }
        }
        this.$emit('formValid', this.formValues)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
