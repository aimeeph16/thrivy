<template>
  <section id="cart_items">
    <div class="container">
      <div class="alert alert-success">
        Order added successfully and will be delivered to the specified shipping address
      </div>
    </div>
  </section>
</template>
<script>
    export default {
        name: "checkout-thanks",
        mounted() {
          setTimeout(() => {
              this.$router.push("/orders");
          }, 3000);
        }
    }
</script>