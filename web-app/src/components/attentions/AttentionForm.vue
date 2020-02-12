<template>
    <div class="row">
        <div class="col-md-12">
            <h1>Agregar atención</h1>
            <b-form>
                <b-form-group
                    label="Nombre"
                    label-for="patient-name"
                >
                    <b-form-input
                        id="patient-name"
                        v-model="attention.patient_name"
                        type="text"
                        required
                        placeholder="Ingrese nombre del paciente"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Edad"
                    label-for="patient-age"
                >
                    <b-form-input
                        id="patient-age"
                        v-model="attention.patient_age"
                        type="number"
                        required
                        placeholder="Ingrese la edad del paciente"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Síntomas"
                    label-for="patient-condition"
                >
                    <b-form-textarea
                        id="patient-condition"
                        v-model="attention.patient_condition"
                        type="text"
                        required
                        placeholder="Ingrese una breve descripción de los síntomas que presenta el paciente"
                        >
                    </b-form-textarea>
                </b-form-group>

                <b-form-group
                    label="Servicio"
                    label-for="service"
                >
                    <b-form-input
                        id="service"
                        v-model="attention.service"
                        required
                        type="text"
                        placeholder="Ingrese el servicio que ingresó al paciente"
                        >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Sección"
                    label-for="section"
                >
                    <select
                        id="section"
                        class="custom-select"
                        v-model="attention.section"
                        required
                        >
                        <option
                            v-for="section in sections"
                            :key="section._id"
                        >   
                            {{section.description}}
                        </option>
                    </select>
                </b-form-group>

                <b-form-group v-if="attention.section"
                    label="Cama"
                    label-for="bed"
                >
                    <select
                        id="bed"
                        class="custom-select"
                        v-model="attention.bed"
                        required
                        >
                        <option
                            v-for="bed in beds"
                            :key="bed._id"
                        >   
                            {{bed.description}}
                        </option>
                    </select>
                </b-form-group>
            </b-form>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            attention: {
                patient_name: '',
                patient_age: null,
                patient_condition: null,
                pending_jobs: [],
                service: null,
                bed: null,
                section: null
            },
            sections: [],
            beds: []
        };
    },
    watch: {
        'attention.section': function(){
            if(this.attention.section){
                this.beds = this.attention.section.beds;
            }
        }
    },
    mounted: function() {
        var app = this;
        // eslint-disable-next-line no-console
        console.log("sad");
        this.$store.dispatch('getAllSections')
        .then(function(response){
            // eslint-disable-next-line no-console
            console.log(response.data.sections);
            app.sections = response.data.sections;
        })
        .catch(err => {
            err;
        });
    }
}
</script>