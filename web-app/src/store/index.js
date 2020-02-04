import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        test: 'hola'
    },
    mutations: {
        setAccessToken(state, token){
            state.token = token;
        }
    },
    actions: {
        login: function(username, password) {
            return new Promise((resolve, reject) => {
                axios
                .post(this.getApiRoot() + '/users/login', {
                    username: username,
                    password: password
                })
                .then(function(response){
                    localStorage.access_token = response.data.token; 
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                }); 
            });
        }
    }
});

export default store;