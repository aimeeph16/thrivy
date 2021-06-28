const OrdersApi = {
    setAuthToken: (axios) => {
      axios.setHeader('Authorization', "Bearer " + localStorage.getItem('auth_token'));
    },
    list: (axios, data = "") => {
      OrdersApi.setAuthToken(axios);
      return axios.$get('/api/orders' + (data ? "?" + data : ""));
    },
    show: (axios, id) => {
      OrdersApi.setAuthToken(axios);
      return axios.$get('/api/orders/' + id);
    },
    update: (axios, id, status) => {
      OrdersApi.setAuthToken(axios);
      return axios.$put('/api/orders/' + id, {status});
    },
    getLatestPending: (axios) => {
      OrdersApi.setAuthToken(axios);
      return axios.$get('/api/orders/latest-pending-orders');
    },
  }
  export {OrdersApi};
  