<template>
  <div>
    <div style="width: 100%" class="pa-4">
      <p>
        Developed by Jorge Montezuma and Misky Trade. Jorge is an environmental
        engineer and has been composting and teaching how to compost since 2008.
      </p>
      <p>For questions, please email compostcalc@gmail.com.</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
    this.setCustomAppBarTitle('About')
  },
  beforeDestroy() {
    this.clearCustomAppBarTitle(null)
  },
  methods: {
    ...mapMutations('app', ['setCustomAppBarTitle', 'clearCustomAppBarTitle'])
  }
}
</script>

<style lang="scss" scoped></style>
