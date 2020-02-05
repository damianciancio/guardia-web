<template>
    <div>
        <label>Usuario</label>
        <input type="text" v-model="username" />
        <label>Contraseña</label>
        <input type="password" v-model="password" />
        <input type="button" v-on:click="login" value="Iniciar sesión" />
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

    },  
    methods: {
        login: function() {
            this.$store.dispatch('login', {username: this.username, password: this.password})
            .then(res => {
                res;
                this.$router.replace({path:'atenciones'});
            })
            .catch(err => {
                err ;
            });
        }
    }
}
</script>