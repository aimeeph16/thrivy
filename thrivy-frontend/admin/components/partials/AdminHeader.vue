<template>
    <header class="header-desktop">
      <div class="section__content section__content--p30">
        <div class="container-fluid">
          <div class="header-wrap" style="float: right">
            <div class="header-button">
              <div class="noti-wrap">
                <div class="noti__item js-item-menu">
                  <i class="zmdi zmdi-notifications" :title="this.countNotifications > 0 ? this.countNotifications + ' pending orders' : ''"></i>
                  <span class="quantity" v-if="this.countNotifications > 0">{{ this.countNotifications }}</span>
                  <div class="notifi-dropdown js-dropdown">
                    <div class="notifi__title">
                      <p>Latest top {{ this.notifications.length }} Pending Orders</p>
                    </div>
                    <div class="notifi__item" v-for="notification in this.notifications" :key="notification.id">
                      <div class="bg-c3 img-cir img-40">
                        <i class="zmdi zmdi-shopping-cart"></i>
                      </div>
                      <div class="content">
                        <p>{{ notification.status_message }} by {{ notification.user.name  + " (" + notification.user.email + ")" }}</p>
                        <span class="date">{{ notification.created_at_formatted }}</span>
                      </div>
                    </div>
                    <div class="notifi__footer" v-if="this.countNotifications > 0">
                      <nuxt-link to="/orders">All orders</nuxt-link>
                      <nuxt-link to="/orders/pending">Pending orders</nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="account-wrap">
                <div class="account-item clearfix js-item-menu">
                  <div class="image">
                    <img src="/imgs/avatar.png?93be8c&93be8c" :alt="getUserData().name">
                  </div>
                  <div class="content">
                    <a class="js-acc-btn" href="#">{{ getUserData().name }}</a>
                  </div>
                  <div class="account-dropdown js-dropdown">
                    <div class="info clearfix">
                      <div class="image">
                        <a href="#">
                          <img src="/imgs/avatar.png?93be8c&93be8c" :alt="getUserData().name">
                        </a>
                      </div>
                      <div class="content">
                        <h5 class="name">
                          <a href="#">{{ getUserData().name }}</a>
                        </h5>
                        <span class="email">{{ getUserData().email }}</span>
                      </div>
                    </div>
                    <div class="account-dropdown__body">
                      <div class="account-dropdown__item">
                        <nuxt-link :to="'/user/' + getUserData().id">
                          <i class="zmdi zmdi-account"></i>Account
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="account-dropdown__footer">
                      <a href="#" v-on:click.prevent="logout()">
                        <i class="zmdi zmdi-power"></i>Logout</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <audio hidden id="notification_alert">
          <source src="/audio/notification_bell.mp3" type="audio/mpeg">
        </audio> -->
      </div>
    </header>
</template>
<script>
    import {OrdersApi} from "../../api/orders";
    export default {
        name: "admin-header",
        data() {
          return {
            notifications: [],
            countNotifications: 0
          }
        },
        methods: {
          getUserData() {
            return JSON.parse(localStorage.getItem("user_data"));
          },
          logout() {
            this.$axios.setHeader('Authorization', "Bearer " + localStorage.getItem('auth_token'));
            this.$axios.get('/api/logout').then(response => {
              if(response.data.success) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('is_authenticated');
                localStorage.removeItem('user_data');
                this.$router.push('/login');
              }
            }).catch(err => {
              console.log(err.response);
            });
          },
          reinitializeNotifDrop() {
            try {
              var menu = $('.js-item-menu');
              var sub_menu_is_showed = -1;
              for (var i = 0; i < menu.length; i++) {
                $(menu[i]).on('click', function (e) {
                  e.preventDefault();
                  $('.js-right-sidebar').removeClass("show-sidebar");
                  if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
                    $(this).toggleClass('show-dropdown');
                    sub_menu_is_showed = -1;
                  }
                  else {
                    for (var i = 0; i < menu.length; i++) {
                      $(menu[i]).removeClass("show-dropdown");
                    }
                    $(this).toggleClass('show-dropdown');
                    sub_menu_is_showed = jQuery.inArray(this, menu);
                  }
                });
              }
              $(".js-item-menu, .js-dropdown").click(function (event) {
                event.stopPropagation();
              });
              $("body,html").on("click", function () {
                for (var i = 0; i < menu.length; i++) {
                  menu[i].classList.remove("show-dropdown");
                }
                sub_menu_is_showed = -1;
              });
            } catch (error) {
              console.log(error);
            }
          },
          /*playNotifAlert() {
            document.getElementById("notification_alert").play();
          }*/
        },
        created() {
          var channel = this.$pusher().subscribe('notifications');
          channel.bind('orderCreated', (data) => {
            const order = data.order;
            //this.playNotifAlert();
            if(order.status === 'pending') {
              this.$toastr.i(`New pending order added by ` + order.user.name, `order Id ${order.id}`);
              //this.notifications.unshift(order);
              //this.countNotifications++;
              this.reinitializeNotifDrop();
            } else {
              if(order.status === 'success') {
                this.$toastr.s("New successful order payment by " + order.user.name, `order Id ${order.id}`);
              } else {
                this.$toastr.w("New cancelled order payment by " + order.user.name, `order Id ${order.id}`);
              }
            }
          });
        },
        mounted() {
          OrdersApi.getLatestPending(this.$axios).then(response => {
            //this.notifications = response.topOrders;
            //this.countNotifications = response.countAllPending;
          });
        }
    }
</script>
<style scoped>
  .notifi__item {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
  .notifi__item .content p {
    line-height: 1.5;
    font-size: 13px;
  }
  .mess__title, .email__title, .notifi__title {
    padding: 11px;
  }
  .mess__footer a, .email__footer a, .notifi__footer a {
    padding: 9px 0;
  }
</style>