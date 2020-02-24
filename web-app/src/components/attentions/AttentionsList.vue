<template>
    <div>
        <table v-if="!isMobile" class="table">
            <thead>
                <tr>
                    <th>Cama</th>
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
                        {{attention.bed.description}}
                    </td>
                    <td>
                        {{attention.patient_name}}
                    </td>
                    <td>
                        {{attention.patient_age}}
                    </td>
                    <td>
                        {{attention.in_timestamp | moment('DD/MM/YYYY HH:mm')}}
                    </td>
                    <td>
                        {{attention.medical_condition}}
                    </td>
                    <td>
                        <b-list-group>
                            <b-list-group-item v-for="job in attention.pending_jobs" :key="job._id">
                                <span>{{job.job.description}}</span> 
                                <button class="btn btn-primary btn-sm">Listo</button>
                            </b-list-group-item>
                        </b-list-group>
                    </td>
                    <td>
                        {{attention.service}}
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" v-if="!attention.out_timestamp" v-on:click="addJob(attention._id)">Agregar estudio</button>
                        <button class="btn btn-success btn-sm" v-if="!attention.out_timestamp" v-on:click="dischargePatient(attention._id)">Listo</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="isMobile">
            <ul class="list-group">
                <li v-for="attention in attentions" :key="attention._id" class="list-group-item">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{{attention.section.description}} - {{attention.bed.description}} </h4>
                            <h6 class="card-subtitle">{{attention.patient_name}} - {{attention.patient_age}} años </h6>
                            <div>{{ attention.medical_condition }}</div>
                            <span>Ingreso: {{attention.in_timestamp | moment('DD/MM/YYYY HH:mm')}}</span>
                            <template v-if="attention.pending_jobs.length != 0">
                                <div div data-toggle="collapse" :href="'#attention-pending-jobs-' + attention._id" >{{ attention.pending_jobs.length }} estudio(s) pendiente(s)</div>
                                <div :id="'#attention-pending-jobs-' + attention._id" >
                                    <ul>
                                        <li v-for="job in attention.pending_jobs" :key="job._id" >
                                            {{job.job.description}} <button class="btn btn-success btn-sm"><b-icon-check></b-icon-check></button>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <router-link class="btn btn-primary btn-sm" to="/atenciones/agregar">Agregar</router-link>
    </div>
</template>

<script>
// import { isMobile } from 'mobile-device-detect';
/* eslint-disable no-console */
/* eslint-disable no-console */
export default {
    name: 'AttentionsList',
    data(){
        return {
            attentions: [],
            isMobile: true
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