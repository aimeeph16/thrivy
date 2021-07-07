<template>
  <div class="features_items">
    <h2 class="title text-center">Latest Items</h2>
    <div class="col-sm-3" v-for="(item, index) in this.latestProducts" :key="index">
      <ProductTemplateNormal  :item="item"></ProductTemplateNormal>
    </div>
  </div>
</template>
<script>
    import ProductTemplateNormal from "../product-templates/ProductTemplateNormal";
    export default {
        name: "LatestItems",
        components: {ProductTemplateNormal},
        props: ["latestProducts"]
    }
</script>
<style scoped>
</style>