const UserApi = {
    create: (axios, payload) => {
      return axios.$post('/api/user', payload);
    },
    list: (axios, payload = null) => {
      let payload_arr = [];
      if(payload) {
        for(let key in payload) {
          payload_arr.push(key +"=" + payload[key]);
        }
      }
      return axios.$get('/api/user?' + payload_arr.join("&"));
    },
    getAll: (axios) => {
      return axios.$get('/api/user?all=1');
    },
    delete: (axios, id) => {
      return axios.$delete('/api/user/' + id);
    },
    show: (axios, id) => {
      return axios.$get('/api/user/' + id);
    },
    update(axios, payload, id) {
      return axios.$put('/api/user/' + id, payload);
    }
  };
  export {UserApi};