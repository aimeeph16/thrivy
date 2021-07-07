<template>
  <ul role="menu" :class="{ 'sub-menu': !isNestedMenu, 'nested-menu': isNestedMenu === '1' }">
    <li v-for="item in this.dataTree" :key="item.id" :class="{ 'has-nested-menu': item.children.length > 0 }">
      <a href="#" v-if="item.children.length > 0">{{ item.title }}</a>
      <i class="fa fa-angle-right" v-if="item.children.length > 0"></i>
      <nuxt-link :to="'/category' + item.path" v-if="item.children.length === 0">{{ item.title }}</nuxt-link>
      <CategoryTree v-if="item.children.length > 0" :dataTree="item.children" is-nested-menu="1"></CategoryTree>
    </li>
  </ul>
</template>
<script>
    export default {
        name: "CategoryTree",
        props: ["dataTree", "isNestedMenu"]
    }
</script>
<style scoped>
</style>