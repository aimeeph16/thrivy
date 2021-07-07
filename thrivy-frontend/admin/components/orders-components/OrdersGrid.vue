<template>
  <div class="row">
    <div class="col-md-12">
      <loader></loader>
      <status-messages></status-messages>
      <OrdersFilter v-on:Filtering="handleFiltering" :page-type="this.pageType" v-on:resetFilter="resetFilter"></OrdersFilter>
    </div>
    <div class="col-md-12">
      <!-- DATA TABLE-->
      <div class="table-responsive m-b-40">
        <table class="table table-borderless table-data3">
          <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Shipping Address</th>
            <th>Total Price</th>
            <th>Paypal Indentifier</th>
            <th>Options</th>
          </tr>
          </thead>
          <tbody>
          <OrdersRow v-if="ordersList.data && ordersList.data.length > 0" v-for="order of ordersList.data" v-bind:order="order" v-bind:key="order.id" @viewOrder="showDetailModal"></OrdersRow>
          <tr v-if="!ordersList.data || (ordersList.data && ordersList.data.length == 0)">
            <td colspan="8">
              <p class="text-center">No data</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <Pagination :data="ordersList" v-if="ordersList.data" v-on:handlePagination="handlePagination"></Pagination>
    </div>
    <OrderDetailsModal @closeDetailModal="dismissModal" v-if="this.showModal"></OrderDetailsModal>
  </div>
</template>
<script>
    import Loader from "../helpers/loader";
    import StatusMessages from "../helpers/statusMessages";
    import OrdersFilter from "./OrdersFilter";
    import OrdersRow from "./OrdersRow";
    import Pagination from "../helpers/Pagination";
    import OrderDetailsModal from "./OrderDetailsModal";
    export default {
        name: "OrdersGrid",
        props: ["pageType"],
        components: {
          OrderDetailsModal,
          Pagination,
          OrdersRow,
          OrdersFilter,
          StatusMessages,
          Loader
        },
        data() {
          return {
            showModal: false
          }
        },
        computed: {
          ordersList() {
            return this.$store.state.orders.ordersList;
          }
        },
        methods: {
          showDetailModal(orderId) {
            this.showModal = true;
          },
          dismissModal() {
            this.showModal = false;
          },
          handlePagination(page_number) {
            this.$store.commit('orders/setPage', page_number);
            this.$store.dispatch('orders/listOrders', this.getPayload());
          },
          handleFiltering(field, value) {
            this.$store.commit('orders/setFilterData', {key: field, val: value});
            this.$store.commit('orders/setPage', 1);
            this.$store.dispatch('orders/listOrders', this.getPayload());
          },
          resetFilter() {
            this.$store.commit('orders/setPage', 1);
            this.$store.commit('orders/resetFilter');
            this.$store.dispatch('orders/listOrders', this.getPayload());
          },
          getPayload() {
            let payload = [];
            payload.push("page=" + this.$store.state.orders.page);
            for(let field in this.$store.state.orders.filterData) {
              if(this.$store.state.orders.filterData[field] !== '')
                payload.push(field + "=" + this.$store.state.orders.filterData[field]);
            }
            if(this.pageType == "pending") {
              payload.push("status=pending");
            }
            return payload.join("&");
          }
        }
    }
</script>
