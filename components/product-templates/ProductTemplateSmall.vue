<template>
    <div class="product-image-wrapper">
      <div class="single-products">
        <div class="productinfo text-center">
          <img v-bind:src="item.gallery[0].image_url.medium2" v-bind:alt="item.title" style="width: auto !important;" />
          <h2>${{ item.price_after_discount }}</h2>
          <del v-if="item.is_discount_active">${{ item.price }}</del>
          <p><nuxt-link :to="'/p/' + item.id + '/' + item.slug">{{ item.title_short }}</nuxt-link></p>
          <a href="javascript:void(0);" class="btn btn-default add-to-cart" @click="addToCart(item.id)"><i class="fa fa-shopping-cart"></i>Add to cart</a>
        </div>
        <div class="discount-ribbon" v-if="item.is_discount_active"><span>{{ item.discount }}%</span></div>
      </div>
    </div>
</template>
<script>
    export default {
        name: "ProductTemplateSmall",
        props: ["item"],
        methods: {
          addToCart(productId) {
          }
        }
    }
</script>
<style scoped>
</style>