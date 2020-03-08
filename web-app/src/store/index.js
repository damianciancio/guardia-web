/* eslint-disable no-console */
import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

// const config = {
// 	headers: { 'Authorization': 'Bearer ' + localStorage.access_token }
// 	// headers: { 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM3MjQxMzk2YTBkZTE1OWI0YTQxNDMiLCJ1c2VybmFtZSI6ImZyYW5jaW5hY2F2YWxsbyIsImV4cCI6MTU4MTUzNzc3NSwiaWF0IjoxNTgwOTMyOTc1fQ.uCU7tt1e--4Jed6oTtBfzc_N1jIvOZnE0FJ_u-7wstM' }
// };

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
        },
        authenticationHeader: () => {
            var headers = { 'Authorization': 'Bearer ' + localStorage.access_token };
            return {'headers': headers};
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
        },
        getAllAttentions: function(context){
            return new Promise((resolve, reject) =>{
                axios.get(context.state.apiRoot + '/attentions', store.getters.authenticationHeader)
                .then(function(response){
                    resolve(response);
                })
                .catch(err => reject(err));
            });
        },
        getAllSections: function(context){
            return new Promise((resolve, reject) => {
                axios.get(context.state.apiRoot + '/sections', store.getters.authenticationHeader)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                })
            });
        },
        dischargePatient: function(context, attention_id){
            return new Promise((resolve, reject) => {
                axios.put(context.state.apiRoot + '/attentions/' + attention_id + '/close', store.getters.authenticationHeader)
                .then(function(response){
                    resolve(response);
                })
                .catch(err => reject(err));
            })
        },
        saveAttention: function(context, attention){
            return new Promise((resolve, reject) => {
                axios.post(context.state.apiRoot + '/attentions', attention, store.getters.authenticationHeader)
                .then(response => {
                    resolve(response);
                })
                .catch(err => reject(err));
            });
        }

    }
});

export default store;