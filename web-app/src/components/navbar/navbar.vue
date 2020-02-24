/* eslint-disable vue/comment-directive */
<template>
    <div>
        <b-navbar toggleable="sm" type="light" variant="light">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

            <b-navbar-brand>{{title}}</b-navbar-brand>

            <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
                <router-link to="/atenciones">
                    <b-nav-text>Atenciones</b-nav-text>
                </router-link>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
export default {
    name: 'Navigation',
    data: function() {
        var data =  {
            title: 'Guardia',
        };
        return data;
    }
}
</script>
