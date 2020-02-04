<template>
    <div>
        <label>Usuario</label>
        <input type="text" v-model="username" />
        <label>Contraseña</label>
        <input type="password" v-model="password" />
        <input type="button" v-on:click="login" value="Iniciar sesión" />
        {{ test }}
    </div>
</template>

<script>

export default {
    name: 'Login',
    data(){
        return {
            username: '',
            password: ''
        }
    },
    computed:{
        test: function() {
            return this.$store.state.test;
        }
    },  
    methods: {
        login: function() {

        }
    }
}
</script>