<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="text-right">
                    <router-link class="btn btn-success btn mt-4" to="/atenciones/agregar">Nueva atención</router-link>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h1>Pasillo</h1>
            </div>
            <div class="col-md-12">
                <div v-for="attention in attentions" :key="attention._id" class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <h4 class="card-title">
                                            {{attention.bed.description}} - {{attention.patient_name}} ({{attention.patient_age}})
                                        </h4>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="text-right">
                                            <span class="mr-2">
                                                <a href="#">Editar</a>
                                            </span>
                                            <span>
                                                <a href="#">Listo</a>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="text-right">
                                            <span>
                                                {{attention.in_timestamp | moment('DD/MM/YYYY HH:mm')}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <ul>
                                            <li>Servicio: cirugía</li>
                                            <li>Síntomas: {{ attention.medical_condition }}</li>
                                        </ul>
                                    </div>
                                    <div class="col-md-6">
                                        <div v-if="attention.pending_jobs.length != 0">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h5>Estudios pendientes</h5>
                                                    <ul>
                                                        <li v-for="job in attention.pending_jobs" :key="job._id">
                                                            <b-icon-clock></b-icon-clock> {{job.job.description}} 
                                                            <button class="btn btn-default btn-sm">
                                                                Listo
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="text-right">
                                                        <a href="#">Agregar estudio</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
<style>
    li {
        list-style-type: none;
    }
</style>