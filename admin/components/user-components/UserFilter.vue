<template>
  <form method="get" action="#" style="margin-bottom: 10px">
    <h4>Filter</h4>
    <div class="row">
      <div class="col-1">
        <input type="text" class="form-control" placeholder="Id" name="id" @change="handleFiltering($event)" :value="this.$store.state.user.filterData.id">
      </div>
      <div class="col-3">
        <input type="text" class="form-control" placeholder="Name" name="name" @change="handleFiltering($event)" :value="this.$store.state.user.filterData.name">
      </div>
      <div class="col-3">
        <input type="text" class="form-control" placeholder="Email" name="email" @change="handleFiltering($event)" :value="this.$store.state.user.filterData.email">
      </div>
      <div class="col-5">
        <nuxt-link to="/user/create" class="btn btn-success pull-right"><i class="fa fa-plus-square"></i> Create</nuxt-link>
      </div>
    </div>
  </form>
</template>
<script>
  export default {
    name: "UserFilter",
    methods: {
      handleFiltering(event) {
        this.$emit('Filtering', event.target.name, event.target.value);
      }
    }
  }
</script>
<style scoped>
</style>
