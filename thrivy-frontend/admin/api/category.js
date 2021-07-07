const CategoryApi = {
    getCategoriesHtmlTree: (axios, exceptId = null) => {
      const except = exceptId?'?except_id=' + exceptId:'';
      return axios.$get('/api/category/htmltree' + except);
    },
    create: (axios, payload) => {
      return axios.$post('/api/category', payload);
    },
    list: (axios, payload = null) => {
      let payload_arr = [];
      if(payload) {
        for(let key in payload) {
          payload_arr.push(key +"=" + payload[key]);
        }
      }
      return axios.$get('/api/category?' + payload_arr.join("&"));
    },
    delete: (axios, id) => {
      return axios.$delete('/api/category/' + id);
    },
    show: (axios, id) => {
      return axios.$get('/api/category/' + id);
    },
    update(axios, payload, id) {
      return axios.$put('/api/category/' + id, payload);
    }
  };
  export {CategoryApi};
  