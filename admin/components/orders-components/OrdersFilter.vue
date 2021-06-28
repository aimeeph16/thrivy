<template>
  <form method="get" action="#" style="margin-bottom: 10px">
    <div class="row">
      <div class="col-3">
        <input type="text" class="form-control" placeholder="#order Id" name="orderId" @change="handleFiltering($event)" :value="this.$store.state.orders.filterData.orderId" />
      </div>
      <div class="col-3" v-if="this.pageType == 'allOrders'">
        <select name="status" id="status" class="form-control" @change="handleFiltering($event)" :value="this.$store.state.orders.filterData.status">
          <option value="">All Orders</option>
          <option value="pending">Pending Orders</option>
          <option value="success">Completed Orders</option>
          <option value="cancelled">Cancelled Orders</option>
        </select>
      </div>
      <div class="col-3">
        <input type="text" class="form-control" placeholder="#user Id" name="userId" @change="handleFiltering($event)" :value="this.$store.state.orders.filterData.userId" />
      </div>
      <a href="#" @click.prevent="resetFilter" v-if="this.$store.state.orders.filterData.userId || this.$store.state.orders.filterData.orderId || this.$store.state.orders.filterData.status">Reset</a>
    </div>
  </form>
</template>
<script>
    export default {
        name: "OrdersFilter",
        props: ["pageType"],
        methods: {
          handleFiltering(event) {
            this.$emit('Filtering', event.target.name, event.target.value);
          },
          resetFilter() {
            this.$emit('resetFilter');
          }
        }
    }
</script>