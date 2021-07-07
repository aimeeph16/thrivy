<template>
    <div>
      <section id="cart_items">
        <div class="container">
          <h2 class="title text-left">Shopping Cart</h2>
          <div class="alert alert-success" v-if="this.$store.state.cart.success_message != ''">{{ this.$store.state.cart.success_message }}</div>
          <div class="alert alert-danger" v-if="this.$store.state.cart.error_message != ''">{{ this.$store.state.cart.error_message }}</div>
          <div class="sufee-alert alert with-close alert-danger alert-dismissible" v-if="this.$store.state.cart.validation_errors.length">
            <ul v-for="(error, index) in this.$store.state.cart.validation_errors" :key="index">
              <li>{{ error }}</li>
            </ul>
          </div>
          <div class="table-responsive cart_info">
            <p v-if="this.cart.length == 0" class="text-left alert alert-warning">Your cart is empty! <n-link to="/shop">Add items to the cart</n-link></p>
            <table class="table table-condensed" v-if="this.cart.length > 0">
              <thead>
              <tr class="cart_menu">
                <td class="image" width="15%">Item</td>
                <td class="description" width="35%"></td>
                <td class="price" width="10%">Price</td>
                <td class="quantity" width="15%">Quantity</td>
                <td class="total" width="10%">Total</td>
                <td width="15%"></td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in this.cart" v-bind:key="item.id">
                <td class="cart_product">
                  <nuxt-link :to="'/p/' + item.product_id + '/' + item.product.slug"><img :src="item.product.gallery[0].image_url.cart_thumb" v-bind:alt="item.title"></nuxt-link>
                </td>
                <td class="cart_description" width="30%">
                  <h4><nuxt-link :to="'/p/' + item.product_id + '/' + item.product.slug"><span>{{ item.product.title_short }}</span></nuxt-link></h4>
                  <p v-if="item.product.product_code != ''">Product Code: {{item.product.product_code}}</p>
                </td>
                <td class="cart_price">
                  <p>${{ item.product.price_after_discount }}</p>
                </td>
                <td class="cart_quantity">
                  <div class="cart_quantity_button">
                    <a class="cart_quantity_up" href="#" @click.prevent="incrementQuantity(item)"> + </a>
                    <input class="cart_quantity_input" type="text" name="quantity" :value="item.amount_temp" autocomplete="off" size="2" @change="updateQuantity($event, item)">
                    <a class="cart_quantity_down" href="#" @click.prevent="decrementQuantity(item)"> - </a>
                  </div>
                </td>
                <td class="cart_total">
                  <p class="cart_total_price">${{ item.total_price_formatted }}</p>
                </td>
                <td class="cart_delete text-center">
                  <i class="fa fa-spinner fa-spin" v-if="item.spinner"></i>
                  <button type="button" class="btn btn-info" v-if="item.amount != item.amount_temp" v-on:click="saveCartAmount(item)">Save</button>
                  <a class="cart_quantity_delete" href="javascript:void(0);" @click="removeCartItem(item.id)"><i class="fa fa-times"></i></a>
                </td>
              </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6">
                    <button type="button" class="btn btn-danger pull-right" @click="clearCart()"><i class="fa fa-trash-o"></i> Clear Cart</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action" v-if="this.cart.length > 0">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6">
              <div class="total_area">
                <ul>
                  <li>Cart Sub Total <span>${{this.getCartTotal()}}</span></li>
                  <li>Shipping Cost <span>Free</span></li>
                  <li>Total <span>${{this.getCartTotal()}}</span></li>
                </ul>
                <a class="btn btn-default check_out" href="">Check Out</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
    import {updateCartItemAmount, removeFromCartByItemId, clearCart} from '../helpers/cart';
    export default {
        name: "Cart",
        middleware: "auth",
        data() {
          return {
          }
        },
      head() {
        return {
          title: 'Online Shop | My Cart',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'My Cart'
            }
          ]
        }
      },
      computed: {
        cart() {
          return this.$store.state.cart.cart;
        }
      },
      methods: {
        incrementQuantity(item) {
            if(item.product.amount >= item.amount_temp) {
              let newAmount = item.amount_temp + 1;
              this.$store.commit("cart/updateCartItemAmountTemp", {id: item.id, amount: newAmount});
            } else {
              return;
            }
        },
        decrementQuantity(item) {
           if(item.amount_temp <= 1) {
             return;
           }
          let newAmount = item.amount_temp - 1;
          this.$store.commit("cart/updateCartItemAmountTemp", {id: item.id, amount: newAmount});
        },
        updateQuantity(event, item) {
          let newAmount = parseInt(event.target.value);
          if(isNaN(newAmount)) {
            alert("Please enter an integer value");
            return;
          }
          if(newAmount == 0) {
            alert("Please enter valid value starting from 1");
            return;
          }
          this.$store.commit("cart/updateCartItemAmountTemp", {id: item.id, amount: newAmount});
        },
        saveCartAmount(item) {
          updateCartItemAmount(item.product_id, item.amount_temp, this.$store, this.$router);
        },
        getCartTotal() {
          let total = 0;
          this.$store.state.cart.cart.map(item => {
            total += item.total_price_numeric;
          });
          return total.toFixed(1);
        },
        removeCartItem(id) {
          removeFromCartByItemId(id, this.$store, this.$router);
        },
        clearCart() {
          clearCart(this.$store, this.$router);
        }
      },
      mounted() {
        if(localStorage.getItem('is_authenticated') === "1" && localStorage.getItem("auth_token") != null) {
          this.$store.dispatch('cart/getAll');
        }
      }
    }
</script>
<style scoped>
  .cart_delete a {
    background: #FE980F;
  }
</style>