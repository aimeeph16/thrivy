<template>
  <section>
    <div class="container">
      <h2 class="title text-left">Latest Items In {{ this.category ? this.category.title : "" }}</h2>
      <div class="row">
        <div class="col-sm-3">
          <ShopSidebar pageType="category"></ShopSidebar>
        </div>
        <div class="col-sm-9 padding-right" v-if="this.products.data && this.products.data.length">
          <div class="features_items">
            <div class="col-sm-4" v-for="(item, index) in this.products.data" :key="index">
              <ProductTemplateNormal :item="item"></ProductTemplateNormal>
            </div>
            <FrontPagination :data="this.products" v-on:handlePagination="paginate"></FrontPagination>
          </div>
        </div>
        <div class="col-sm-9 padding-right" v-else>
          <p class="text-center no-products"><i class="fa fa-exclamation-triangle"></i> No products available in this category! Check back later</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
    import ShopSidebar from "../../../../components/shop-components/ShopSidebar";
    import ProductTemplateNormal from "../../../../components/product-templates/ProductTemplateNormal";
    import FrontPagination from "../../../../components/helpers/FrontPagination";
    import {paginate} from "../../../../helpers/functions";
    export default {
        name: "Category",
        validate({params}) {
          return /^\d+$/.test(params.id);
        },
        components: {
            FrontPagination,
            ProductTemplateNormal,
            ShopSidebar
       },
      head() {
          return {
            title: 'Online Shop | ' + (this.categoryDetails ? this.categoryDetails.title : ""),
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: (this.categoryDetails ? ( this.categoryDetails.description ? this.categoryDetails.description : this.categoryDetails.title ) : "")
              }
            ]
          }
      },
      asyncData(context) {
        context.store.dispatch('general/resetShopFilter');
        context.store.commit('general/setCategoryId', context.params.id);
        return context.store.dispatch('general/fetchCategory', context.params.id).then((category) => {
          return {
            categoryDetails: category
          }
        });
      },
      computed: {
        category() {
          return this.$store.state.general.category;
        },
        products() {
          return this.$store.state.general.shop.products;
        },
        page() {
          return this.$store.state.general.shop.page;
        }
      },
      methods: {
        paginate(page_number) {
          paginate(page_number);
        }
      },
      mounted() {
        /*
         // load brands by this category
         this.$store.dispatch('general/fetchBrandsByCategory', this.$route.params.id);
         if (this.$route.query.page) {
           this.$store.commit('general/setPage', this.$route.query.page);
         }
         if (this.$route.query.brand_id) {
           this.$store.commit('general/setBrand', this.$route.query.brand_id);
         }
         if (this.$route.query.from_price) {
           this.$store.commit('general/setFromPrice', this.$route.query.from_price);
         }
         if (this.$route.query.to_price) {
           this.$store.commit('general/setToPrice', this.$route.query.to_price);
         }
         this.$nextTick(() => {
           this.$nuxt.$loading.start();
           this.$store.dispatch('general/fetchShopProducts').then(() => {
             this.$nuxt.$loading.finish();
           });
         });
        */
      }
    }
</script>
<style scoped>
  .col-sm-4 {
    height: 437px !important;
    margin-bottom: 30px !important;
  }
  .no-products {
    color: #696763;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
  }
</style>

<!-- <template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <div class="left-sidebar">
            <div class="brands_products"><!~~brands_products~~>
              <h2>Brands</h2>
              <div class="brands-name">
                <ul class="nav nav-pills nav-stacked">
                  <li><a href=""> <span class="pull-right">(50)</span>Acne</a></li>
                  <li><a href=""> <span class="pull-right">(56)</span>Grüne Erde</a></li>
                  <li><a href=""> <span class="pull-right">(27)</span>Albiro</a></li>
                  <li><a href=""> <span class="pull-right">(32)</span>Ronhill</a></li>
                  <li><a href=""> <span class="pull-right">(5)</span>Oddmolly</a></li>
                  <li><a href=""> <span class="pull-right">(9)</span>Boudestijn</a></li>
                  <li><a href=""> <span class="pull-right">(4)</span>Rösch creative culture</a></li>
                </ul>
              </div>
            </div><!~~/brands_products~~>
            <div class="price-range"><!~~price-range~~>
              <h2>Price Range</h2>
              <div class="well">
                <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="600" data-slider-step="5" data-slider-value="[250,450]" id="sl2" ><br />
                <b>$ 0</b> <b class="pull-right">$ 600</b>
              </div>
            </div><!~~/price-range~~>
            <div class="shipping text-center"><!~~shipping~~>
              <img src="images/home/shipping.jpg" alt="" />
            </div><!~~/shipping~~>
          </div>
        </div>
        <div class="col-sm-9 padding-right">
          <div class="features_items"><!~~features_items~~>
            <h2 class="title text-center">Features Items</h2>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/shop/product12.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/shop/product11.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/shop/product10.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/shop/product9.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                  <img src="images/home/new.png" class="new" alt="" />
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/shop/product8.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                  <img src="images/home/sale.png" class="new" alt="" />
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/shop/product7.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/home/product6.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/home/product5.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/home/product4.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/home/product3.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/home/product2.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img src="images/home/product1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                    <li><a href="#"><i class="fa fa-eye"></i>view item</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <ul class="pagination">
              <li class="active"><a href="">1</a></li>
              <li><a href="">2</a></li>
              <li><a href="">3</a></li>
              <li><a href="">&raquo;</a></li>
            </ul>
          </div><!~~features_items~~>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
    export default {
        name: "Category",
        head() {
          return {
            title: 'Online Shop | Category',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: 'Category Products Page'
              }
            ]
          }
        }
    }
</script>
<style scoped>
</style> -->
