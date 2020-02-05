<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Ingreso</th>
                    <th>Síntomas</th>
                    <th>Exámenes pendientes</th>
                    <th>Servicio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="attention in attentions" :key="attention._id">
                    <td>
                        {{attention.patient_name}}
                    </td>
                    <td>
                        {{attention.patient_age}}
                    </td>
                    <td>
                        {{attention.in_timestamp}}
                    </td>
                    <td>
                        {{attention.medical_condition}}
                    </td>
                    <td>
                        <ul>
                            <li v-for="job in attention.pending_jobs" :key="job._id">
                                {{job.job.description}}
                            </li>
                        </ul>
                    </td>
                    <td>
                        {{attention.service}}
                    </td>
                    <td>
                        <button v-if="!attention.out_timestamp" v-on:click="dischargePatient(attention._id)">Dar de alta</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-console */
export default {
    name: 'AttentionsList',
    data(){
        return {
            attentions: []
        }
    },
    mounted: function(){
        var app = this;
        this.$store.dispatch('getAllAttentions')
        .then(function(response){
            app.attentions = response.data.attentions;
            console.log(app.attentions);
        })
        .catch(err => {
            console.log(err);
        });
    },
    methods: {
        dischargePatient: function(attention_id){
            this.$store.dispatch('dischargePatient', attention_id)
            // eslint-disable-next-line no-unused-vars
            .then(function(response){
                //refreshScreen();
            })
            .catch(err => {err;})
        }
    }
}
</script>