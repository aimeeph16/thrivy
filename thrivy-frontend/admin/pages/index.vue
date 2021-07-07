<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="overview-wrap">
              <h2 class="title-1">overview</h2>
            </div>
          </div>
        </div>
        <div class="row m-t-25">
          <div class="col-sm-6 col-lg-3">
            <div class="overview-item overview-item--c1">
              <div class="overview__inner">
                <div class="overview-box clearfix">
                  <div class="icon">
                    <i class="zmdi zmdi-account-o"></i>
                  </div>
                  <div class="text">
                    <h2>{{ this.total_members > 0 ? this.total_members : 'none' }}</h2>
                    <span>members online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="overview-item overview-item--c2">
              <div class="overview__inner">
                <div class="overview-box clearfix">
                  <div class="icon">
                    <i class="zmdi zmdi-shopping-cart"></i>
                  </div>
                  <div class="text">
                    <h2>{{ this.total_items_sold > 0 ? this.total_items_sold : 'none' }}</h2>
                    <span>items solid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="overview-item overview-item--c3">
              <div class="overview__inner">
                <div class="overview-box clearfix">
                  <div class="icon">
                    <i class="zmdi zmdi-calendar-note"></i>
                  </div>
                  <div class="text">
                    <h2>{{ this.total_items_week > 0 ? this.total_items_week : 'none' }}</h2>
                    <span>this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="overview-item overview-item--c4">
              <div class="overview__inner">
                <div class="overview-box clearfix">
                  <div class="icon">
                    <i class="zmdi zmdi-money"></i>
                  </div>
                  <div class="text">
                    <h2>{{ this.total_earnings !== 0 ? '$' + this.total_earnings : 'none' }}</h2>
                    <span>total earnings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "index",
    middleware: "auth",
    data() {
      return {
        total_members: 0,
        total_items_sold: 0,
        total_items_week: 0,
        total_earnings: 0
      }
    },
    mounted() {
      this.$axios.$get('/api/dashboard').then(response => {
        this.total_members = response.totalMembers;
        this.total_items_sold = response.totalItemsSold;
        this.total_items_week = response.totalItemsThisWeek;
        this.total_earnings = response.totalEarnings;
      });
    }
  }
</script>