import { CategoryApi } from '../api/category';
export const state = () => ({
  category: {
    title: '',
    parent_id: '',
    description: '',
    featured: 0
  },
  categoryHtmlTree: '',
  features: [
  ]
});
export const mutations = {
  setTitle(state, title) {
    state.category.title = title;
  },
  setParentId(state, parent_id) {
    state.category.parent_id = parent_id;
  },
  setDescription(state, description) {
    state.category.description = description;
  },
  setFeatured(state, featured) {
    state.category.featured = featured;
  },
  setCategoryHtmlTree(state, tree) {
    state.categoryHtmlTree = tree;
  },
  resetCategory(state) {
    state.category = {
        title: '',
        parent_id: '',
        description: '',
        featured: 0
    };
    state.features = [];
  },
  setFeatures(state, value) {
    state.features = value;
  },
  addToFeatures(state, row) {
    state.features.push(row);
  },
  removeFromFeature(state, id) {
    state.features = [...state.features.filter(item => item.id !== id)];
  },
  updateFeatureTitle(state, payload) {
    let features = [...state.features];
    features.map(feature => {
      if(feature.id == payload.id) {
        feature.field_title = payload.value;
      }
    });
    state.features = features;
  },
  updateFeatureType(state, payload) {
    let features = [...state.features];
    features.map(feature => {
      if(feature.id == payload.id) {
        feature.field_type = payload.value;
      }
    });
    state.features = features;
  }
};
export const actions = {
    getCategoryHtmlTree({commit}, exceptId = null) {
        CategoryApi.getCategoriesHtmlTree(this.$axios, exceptId).then(response => {
          let html = '<option value="">none</option>';
          html += response;
          commit('setCategoryHtmlTree', html);
        });
      },
      create({commit}, payload) {
        commit('shared/resetStatusMessagesParameters', null, {root: true});
        commit('shared/setStatusMessageParameter', {key: 'showLoading', val: true}, {root: true});
        const dataToSend = payload.data;
        dataToSend.features = payload.features;
        CategoryApi.create(this.$axios, dataToSend).then(response => {
          commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
          if(response.success) {
            commit('shared/setStatusMessageParameter', {key: 'success_message', val: response.message}, {root: true});
          }
          setTimeout(() => {
            payload.router.push('/category');
          }, 2000);
        }).catch(err => {
          commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
          if(err.response.data) {
            commit('shared/setStatusMessageParameter', {key: 'error_message', val: err.response.data.message}, {root: true});
            if(err.response.data.errors) {
              let errors = [];
              for(let key in err.response.data.errors) {
                errors.push(err.response.data.errors[key][0]);
              }
              commit('shared/setStatusMessageParameter', {key: 'validation_errors', val: errors}, {root: true});
            }
          }
        }).finally(() => {
          setTimeout(() => {
            commit('shared/resetStatusMessagesParameters', null, {root: true});
            commit('resetCategory');
          }, 3000);
        });
      },

      showCategory({commit}, id) {
        commit('shared/resetStatusMessagesParameters', null, {root: true});
        commit('shared/setStatusMessageParameter', {key: 'showLoading', val: true}, {root: true});
        CategoryApi.show(this.$axios, id).then(response => {
          commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
          if(response.category) {
            commit('setTitle', response.category.title);
            commit('setDescription', response.category.description);
            commit('setParentId', response.category.parent_id);
            commit('setFeatured', response.category.featured);
            // set features
            if(response.category.features) {
               commit('setFeatures', response.category.features);
            }
          }
        }).catch(err => {
          console.log(err);
        });

        dispatch('category/showCategory', state.product.category_id, {root: true});
        commit('resetFeatures');
        setTimeout(() => {
          if (rootState.category.features.length > 0) {
            const features = [...rootState.category.features];
            features.map(feature => {
              let productFeatureValue = "";
              if(response.product.features && response.product.features.find(f => f.field_id == feature.id) !== undefined) {
                productFeatureValue = (response.product.features.find(f => f.field_id == feature.id)).field_value;
              } else {
                productFeatureValue = "";
              }
              commit('appendToFeatures', {
                field_id: feature.id,
                field_title: feature.field_title,
                field_type: feature.field_type,
                field_value: productFeatureValue
              });
            });
          }
        }, 200);
      },
      updateCategory({commit, router}, payload) {
        commit('shared/resetStatusMessagesParameters', null, {root: true});
        commit('shared/setStatusMessageParameter', {key: 'showLoading', val: true}, {root: true});
        CategoryApi.update(this.$axios, payload.data, payload.id).then(response => {
          commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
          if(response.success) {
            commit('shared/setStatusMessageParameter', {key: 'success_message', val: response.message}, {root: true});
          }
          setTimeout(() => {
            payload.router.push('/category');
          }, 2000);
        }).catch(err => {
          commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
          if(err.response.data) {
            commit('shared/setStatusMessageParameter', {key: 'error_message', val: err.response.data.message}, {root: true});
            if(err.response.data.errors) {
              let errors = [];
              for(let key in err.response.data.errors) {
                errors.push(err.response.data.errors[key][0]);
              }
              commit('shared/setStatusMessageParameter', {key: 'validation_errors', val: errors}, {root: true});
            }
          }
        }).finally(() => {
          setTimeout(() => {
            commit('shared/resetStatusMessagesParameters', null, {root: true});
            commit('resetCategory');
          }, 3000);
        });
      }
    
};