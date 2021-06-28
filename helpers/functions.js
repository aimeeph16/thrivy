export const updateRouteQueryString = (key, value, $route, $router) => {
    let query = {...$route.query};
    query[key] = value;
    $router.push({ path: $route.path, query});
  };
  export const paginate = ({$store, $route, $router}, page_number) => {
    $store.commit('general/setPage', page_number);
    updateRouteQueryString('page', page_number, $route, $router);
    $store.dispatch('general/fetchShopProducts');
  };