<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formValues.bulk_density_yd"
            :rules="validations.bulkDensityRules"
            type="number"
            label="Bulk Density (lb/cy)"
            min="0"
            max="100"
            oninput="if(this.value < 0) this.value = 0;"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="new_moisture"
            :rules="validations.moistureContentRules"
            type="number"
            label="Moisture (%)"
            placeholder="00.0"
            min="0"
            max="100"
            oninput="if(this.value < 0||this.value>100) this.value = '';"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="new_carbon"
            :rules="validations.carbonRules"
            type="number"
            label="Carbon (Total, % dry weight)"
            placeholder="00.00"
            min="0"
            max="100"
            oninput="if(this.value < 0||this.value>100) this.value = '';"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="new_nitrogen"
            :rules="validations.nitrogenRules"
            type="number"
            label="Nitrogen (% dry weight)"
            placeholder="00.00"
            min="0"
            max="100"
            oninput="if(this.value < 0||this.value>100) this.value = '';"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formValues.cn_ratio"
            :rules="validations.cnRatioRules"
            type="number"
            label="C:N ratio"
            disabled
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <div style="width: 100%, font-size: 80%" class="pa-6">
        <p style="font-size: 0.8em">
          C:N autopopulates. If you have the values for C:N and N, then to
          calculate C, you need to multiply C:N by N. If you have the values for
          C and C:N, you need to divide C by C:N.
        </p>
      </div>
    </v-container>
    <v-btn color="accent" block @click="validate"> Create feedstock </v-btn>
  </v-form>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  data() {
    return {
      new_moisture: null,
      new_carbon: null,
      new_nitrogen: null,
      valid: false,
      formMasks: {
        twoDigitsTwoDecimals: '##.##',
        twoDigitsOneDecimal: '##.#'
      },
      formValues: {
        nitrogen: null,
        carbon: null,
        cn_ratio: null,
        moisture_content: null,
        bulk_density_yd: null
      },
      validations: {
        nitrogenRules: [v => !!v || 'Max value is 100%'],
        carbonRules: [v => !!v || 'Max value is 100%'],
        cnRatioRules: [],
        moistureContentRules: [v => !!v || 'Max value is 100%'],
        bulkDensityRules: [
          v => !!v || 'Bulk density is required',
          v =>
            /^-?\d*(\.\d+)?$/.test(v) || 'Bulk density must be a valid number',
          v => (v && v.length <= 100) || 'Name must be less than 10 characters'
        ]
      }
    }
  },
  watch: {
    new_moisture(newValue) {
      this.formValues.moisture_content = newValue
    },
    new_nitrogen(newValue) {
      this.formValues.nitrogen = newValue

      if (newValue !== null && newValue !== 0)
        this.formValues.cn_ratio = this.new_carbon / newValue
      this.formValues.cn_ratio =
        Math.round(this.formValues.cn_ratio * 100) / 100
    },
    new_carbon(newValue) {
      this.formValues.carbon = newValue
      this.formValues.cn_ratio = newValue / this.new_nitrogen

      this.formValues.cn_ratio =
        Math.round(this.formValues.cn_ratio * 100) / 100
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('formValid', this.formValues)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
