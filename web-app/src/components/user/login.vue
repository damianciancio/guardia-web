<template>
    <div class="row">
        <div class="col-md-6 col-xs-12">
            <b-form>
                <b-form-group
                    label="Usuario"
                    label-for="username"
                >
                    <b-form-input
                        id="username"
                        v-model="username"
                        type="text"
                        required
                        placeholder="Ingrese nombre de usuario"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Contraseña"
                    label-for="password"
                >
                    <b-form-input
                        id="password"
                        v-model="password"
                        type="password"
                        required
                        >
                    </b-form-input>
                </b-form-group>
                <div class="row">
                    <div class="col-md-12">
                        <b-button type="button" v-on:click="login" variant="primary">Iniciar sesión</b-button>
                    </div>
                </div>
            </b-form>
        </div>
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