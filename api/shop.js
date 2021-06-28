const ShopApi = {
    search: (axios, search_params = '') => {
      return axios.$get('/api/product/search-products' + (search_params ? "?" + search_params : ""));
    },
    getBrandsByCategory: (axios, categoryId) => {
      return axios.$get('/api/brand/brands-by-category?category_id=' + categoryId);
    }
  }
  export {ShopApi};