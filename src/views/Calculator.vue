<template>
  <div>
    <Calculator :pre-ingredients="ingredients" />
  </div>
</template>

<script>
import Calculator from '../components/Calculator'

export default {
  components: {
    Calculator
  },
  props: {
    ingredients: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped></style>
