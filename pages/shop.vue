<template>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <ShopSidebar pageType="shop" :categoriesTree="categoriesTree"></ShopSidebar>
          </div>
          <div class="col-sm-9 padding-right" v-if="this.products.data && this.products.data.length">
            <div class="features_items">
              <h2 class="title text-center">Latest Items</h2>
              <div class="col-sm-4" v-for="(item, index) in this.products.data" :key="index">
                <ProductTemplateNormal :item="item"></ProductTemplateNormal>
              </div>
              <FrontPagination :data="this.products" v-on:handlePagination="paginate"></FrontPagination>
            </div>
          </div>
          <div class="col-sm-9 padding-right" v-else>
            <p class="text-center no-products"><i class="fa fa-exclamation-triangle"></i> No products found that match your search criteria!</p>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
    import ShopSidebar from "../components/shop-components/ShopSidebar";
    import ProductTemplateNormal from "../components/product-templates/ProductTemplateNormal";
    import FrontPagination from "../components/helpers/FrontPagination";
    import {paginate} from "../helpers/functions";
    export default {
      name: "Shop",
      components: {
        FrontPagination,
        ProductTemplateNormal,
        ShopSidebar
      },
      computed: {
        categoriesTree() {
          return this.$store.state.general.categoriesTree;
        },
        products() {
          return this.$store.state.general.shop.products;
        },
        page() {
          return this.$store.state.general.shop.page;
        }
      },
      head() {
        return {
          title: 'Online Shop | Shop',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'Shop Page'
            }
          ]
        }
      },
      methods: {
        paginate(page_number) {
            paginate(this, page_number);
        }
      },
      mounted() {
        // reset shop filter
        this.$store.dispatch('general/resetShopFilter');
        if(this.$route.query.page) {
          this.$store.commit('general/setPage', this.$route.query.page);
        }
        if(this.$route.query.category_id) {
          this.$store.commit('general/setCategoryId', this.$route.query.category_id);
          // load brands by this category
          this.$store.dispatch('general/fetchBrandsByCategory', this.$route.query.category_id);
        }
        if(this.$route.query.brand_id) {
          this.$store.commit('general/setBrand', this.$route.query.brand_id);
        }
        if(this.$route.query.from_price) {
          this.$store.commit('general/setFromPrice', this.$route.query.from_price);
        }
        if(this.$route.query.to_price) {
          this.$store.commit('general/setToPrice', this.$route.query.to_price);
        }
        this.$nextTick(() => {
          this.$nuxt.$loading.start();
          this.$store.dispatch('general/fetchShopProducts').then(() => {
            this.$nuxt.$loading.finish();
          });
        });
      }
    }
</script>
<style scoped>
   .col-sm-4 {
     height: 437px !important;
     margin-bottom: 30px !important;
   }
  .no-products {
    color: #FDD935;
    font-family: "Museo-sans-rounded", sans-serif;
    font-size: 15px;
    font-weight: 300;
  }
</style>

<!-- <template>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div class="left-sidebar">
              <h2>Category</h2>
              <div class="panel-group category-products" id="accordian"><!~~category-productsr~~>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                        <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                        Sportswear
                      </a>
                    </h4>
                  </div>
                  <div id="sportswear" class="panel-collapse collapse">
                    <div class="panel-body">
                      <ul>
                        <li><a href="">Nike </a></li>
                        <li><a href="">Under Armour </a></li>
                        <li><a href="">Adidas </a></li>
                        <li><a href="">Puma</a></li>
                        <li><a href="">ASICS </a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                        <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                        Mens
                      </a>
                    </h4>
                  </div>
                  <div id="mens" class="panel-collapse collapse">
                    <div class="panel-body">
                      <ul>
                        <li><a href="">Fendi</a></li>
                        <li><a href="">Guess</a></li>
                        <li><a href="">Valentino</a></li>
                        <li><a href="">Dior</a></li>
                        <li><a href="">Versace</a></li>
                        <li><a href="">Armani</a></li>
                        <li><a href="">Prada</a></li>
                        <li><a href="">Dolce and Gabbana</a></li>
                        <li><a href="">Chanel</a></li>
                        <li><a href="">Gucci</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordian" href="#womens">
                        <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                        Womens
                      </a>
                    </h4>
                  </div>
                  <div id="womens" class="panel-collapse collapse">
                    <div class="panel-body">
                      <ul>
                        <li><a href="">Fendi</a></li>
                        <li><a href="">Guess</a></li>
                        <li><a href="">Valentino</a></li>
                        <li><a href="">Dior</a></li>
                        <li><a href="">Versace</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">Kids</a></h4>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">Fashion</a></h4>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">Households</a></h4>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">Interiors</a></h4>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">Clothing</a></h4>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">Bags</a></h4>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">Shoes</a></h4>
                  </div>
                </div>
              </div><!~~/category-productsr~~>
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
        name: "Shop",
      head() {
        return {
          title: 'Online Shop | Shop',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'Shop Page'
            }
          ]
        }
      }
    }
</script>
<style scoped>
</style>
 -->