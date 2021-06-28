<template>
      <ul :id="'category-' + parentId" :class="collapseFirstLevel === true ? '' : 'collapse'">
        <li v-for="item in this.categoriesTree" :key="'shop-category-' + item.id">
          <a href="#" class="leaf-node" v-if="item.children.length === 0" @click.prevent="searchByCategory(item.id)">{{ item.title }}</a>
          <a data-toggle="collapse" :href="'#category-' + item.id" v-if="item.children.length > 0">
            <span class="badge"><i class="fa fa-plus"></i></span> {{ item.title }}
          </a>
          <ShopCategoryTreeNested v-if="item.children.length > 0" :categoriesTree="item.children" :parentId="item.id" @clickCategory="searchByCategory"></ShopCategoryTreeNested>
        </li>
      </ul>
</template>
<script>
    export default {
        name: "ShopCategoryTreeNested",
        props: ["categoriesTree", "parentId", "collapseFirstLevel"],
        data() {
          return {
            show_nested: false
          }
        },
        methods: {
          searchByCategory(itemId) {
            this.$emit('clickCategory', itemId);
          }
        }
    }
</script>
<style scoped>
  .leaf-node {
    font-weight: bold;
    font-size: 11px;
  }
</style>