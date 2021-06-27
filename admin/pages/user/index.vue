<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <loader></loader>
            <status-messages></status-messages>
            <UserFilter v-on:Filtering="handleFiltering"></UserFilter>
          </div>
          <div class="col-md-12">
            <!-- DATA TABLE-->
            <div class="table-responsive m-b-40">
              <table class="table table-borderless table-data3">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Create Date</th>
                  <th>Count Products</th>
                  <th>Count Order</th>
                  <th>Options</th>
                </tr>
                </thead>
                <tbody>
                  <!--
                  <UserRow v-if="userList.data" v-for="user of userList.data" v-bind:user="user" v-bind:key="user.id" v-on:removeUser="removeUser"></UserRow>
                  -->
                  <UserRow v-for="user of userList.data" v-bind:user="user" v-bind:key="user.id" v-on:removeUser="removeUser">
                    <template v-if="userList.data" ></template>
                  </UserRow>
                </tbody>
              </table>
            </div>
            <Pagination :data="userList" v-if="userList.data" v-on:handlePagination="handlePagination"></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loader from "../../components/helpers/loader";
  import statusMessages from "../../components/helpers/statusMessages";
  import UserRow from "../../components/user-components/UserRow";
  import Pagination from "../../components/helpers/Pagination";
  import UserFilter from "../../components/user-components/UserFilter";
  export default {
    name: "index",
    middleware: "auth",
    components: {
      UserFilter,
      Pagination,
      UserRow,
      Loader,
      statusMessages
    },
    fetch() {
      this.$store.dispatch('user/list');
    },
    computed: {
      userList() {
        return this.$store.state.user.userList;
      }
    },
    methods: {
      handlePagination(page_number) {
        this.$store.commit('user/setPage', page_number);
        this.$store.dispatch('user/list', this.getPayload());
      },
      handleFiltering(field, value) {
        this.$store.commit('user/setFilterData', {key: field, val: value});
        this.$store.commit('user/setPage', 1);
        this.$store.dispatch('user/list', this.getPayload());
      },
      getPayload() {
        let payload = {};
        for(let field in this.$store.state.user.filterData) {
          if(this.$store.state.user.filterData.hasOwnProperty(field) && this.$store.state.user.filterData[field] !== '')
            payload[field] = this.$store.state.user.filterData[field];
        }
        payload.page = this.$store.state.user.page;
        return payload;
      },
      removeUser(id) {
        if(confirm("Are you sure?")) {
          this.$store.dispatch('user/delete', id);
        }
      }
    }
  }
</script>
<style scoped>
</style>