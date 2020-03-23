<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="text-right">
                    <router-link class="btn btn-success btn mt-4" to="/atenciones/agregar">Nueva atención</router-link>
                </div>
            </div>
        </div>
        <div v-for="section in sections" :key="section._id" class="row">
            <div class="col-md-12">
                <h1>{{section.description}}</h1>
            </div>
            <div class="col-md-12">
                <div v-for="attention in section.attentions" :key="attention._id" class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row attention-header">
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
                                                <a style="cursor:pointer;" href="#" v-on:click="dischargePatient(attention)">Listo</a>
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
                                        <div>
                                            <div v-if="attention.pending_jobs.length != 0" class="row">
                                                <div class="col-md-12">
                                                    <h5>Estudios pendientes</h5>
                                                    <ul>
                                                        <li v-for="job in attention.pending_jobs" :key="job._id">
                                                            <b-icon-clock v-if="!job.done"></b-icon-clock> 
                                                            <b-icon-check v-else></b-icon-check> 
                                                             {{job.description}} 
                                                            <button v-if="!job.done" class="btn btn-default btn-sm">
                                                                Listo
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="text-right">
                                                        <b-button v-on:click="selectedAttention = attention" v-b-modal.modal-add-job>Agregar estudio</b-button>
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
        <div>
            <b-modal @ok="addPatientJob" id="modal-add-job" :title="'Agregar estudio a ' + selectedAttention.patient_name">
                <label>Estudio</label>
                <input v-model="jobToAddDescription" class="form-control" type="text" />
            </b-modal>
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
            isMobile: true,
            sections: [],
            selectedAttention: {},
            jobToAddDescription: ""
        }
    },
    mounted: function(){
        var app = this;
        this.$store.dispatch('getPendingAttentions')
        .then(function(response){
            app.sections = response.data.attentions;
            console.log(app.sections);
        })
        .catch(err => {
            console.log(err);
        });

        
    },
    methods: {
        dischargePatient: function(attention){
            var app = this;
            this.$store.dispatch('dischargePatient', attention._id)
            // eslint-disable-next-line no-unused-vars
            .then(function(response){
                if(response.status == 200){

                    // TODO: abstraer la attention en un nuevo componente
                    var section_found = app.sections.find(section => {
                        if (section._id == attention.section._id) {
                            return true;
                        }
                        return false;
                    });

                    if (section_found) {
                        var attention_found = section_found.attentions.find(attention_it => {
                            if (attention_it._id == attention._id) {
                                return true;
                            }
                            return false;
                        });

                        if (attention_found) {
                            var index = section_found.attentions.indexOf(attention_found);
                        }
                    
                        if (index > -1) {
                            section_found.attentions.splice(index, 1);
                        }

                    }
                    
                }
            })
            .catch(err => {err;})
        },
        addPatientJob: function(){
            var app = this;
            if(this.selectedAttention && this.jobToAddDescription.trim() != "") {
                this.$store.dispatch(
                    'addPatientJob', 
                    {
                        'attention_id': this.selectedAttention._id,
                        'job_description': this.jobToAddDescription
                    }
                ).then(response => {
                    if(response){
                        var section_found = app.sections.find(section => {
                            if (section._id == app.selectedAttention.section._id) {
                                return true;
                            }
                            return false;
                        });

                        if (section_found) {
                            var attention_found = section_found.attentions.find(attention => {
                                if (attention._id == app.selectedAttention._id) {
                                    return true;
                                }
                                return false;
                            });

                            if (attention_found) {
                                attention_found.pending_jobs.push(response.data.pending_jobs.slice(-1)[0]);
                            }

                        }
                    }
                })
                
                ;
            }
        }
    }
}
</script>
<style>
    li {
        list-style-type: none;
    }

    .attention-header {
        border-bottom: 1px solid #dfdfdf;
        margin-bottom: 10px;
    }

</style>