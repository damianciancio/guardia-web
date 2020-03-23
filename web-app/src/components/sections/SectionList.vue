<template>
    <div class="row">
        <div class="col-md-12">
            <h1>Secciones</h1>
        </div>
        <div class="col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Camas</th>
                        <th>Editar</th>
                        <th>Deshabilitar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="section in sections" :key="section._id">
                        <td>
                            {{ section.description }}
                        </td>
                        <td>
                            {{ section.beds.map((bed) => {return bed.description}).join(", ") }}
                        </td>
                        <td>
                            <router-link class="btn btn-success btn mt-4" :to="'/secciones/editar/' + section._id">
                                Editar
                            </router-link>
                        </td>
                        <td>
                            <button class="btn btn-danger">Deshabilitar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-12">
            <router-link class="btn btn-success btn mt-4" to="/secciones/agregar">
                Nueva sección
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        var data = {};

        data.sections = [];

        return data;
    },
    mounted: function() {
        var app = this;
        this.$store.dispatch('getAllSections')
        .then((response) => {
            // eslint-disable-next-line no-console
            app.sections = response.data.sections;
        })

    }
}
</script>