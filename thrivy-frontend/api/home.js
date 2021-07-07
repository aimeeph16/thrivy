export const HomeApis = {
    getCategoryMenuTree: (axios) => {
      return axios.$get('/api/category');
    },
    getSliderProducts: (axios) => {
      return axios.$get('/api/product/slider-products');
    },
    getLatestProducts: (axios) => {
      return axios.$get('/api/product/latest-products');
    },
    getFeaturedProducts: (axios) => {
      return axios.$get('/api/product/featured-products');
    }
  }