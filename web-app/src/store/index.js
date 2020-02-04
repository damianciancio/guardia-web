/* eslint-disable no-console */
import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        test: 'hola',
        apiRoot: '/api'
    },
    mutations: {
        accessToken(state, token){
            state.token = token;
            localStorage.access_token = token;
        }
    },
    getters: {
        rootApiAddress: state => {
            return state.apiRoot;
        }
    },
    actions: {
        login: function(context, credentials) {
            return new Promise((resolve, reject) => {
                axios
                .post(context.state.apiRoot + '/users/login', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(function(response){
                    context.commit('accessToken', response.data.token); 
                    resolve(response);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                }); 
            });
        }
    }
});

export default store;