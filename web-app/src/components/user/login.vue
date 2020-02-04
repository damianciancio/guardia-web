<template>
    <div>
        <label>Usuario</label>
        <input type="text" v-model="username" />
        <label>Contraseña</label>
        <input type="password" v-model="password" />
        <input type="button" v-on:click="login" value="Iniciar sesión" />
        {{ response }}
    </div>
</template>

<script>
import axios from 'axios';
import data from '../data-retrieve/Data';

export default {
    name: 'Login',
    mixins: [data],
    data(){
        return {
            username: '',
            password: '',
            response: ''
        }
    },
    methods: {
        login: function() {
            var app = this;
            axios.
                post(this.getApiRoot() + '/users/login', {
                    username: app.username,
                    password: app.password
                })
                .then(function(response){
                   localStorage.access_token = response.data.token; 
                });
        }
    }
}
</script>