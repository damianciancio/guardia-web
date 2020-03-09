<template>
    <div class="row">
        <div class="col-md-12">
            <div>
                <h1>Agregar sección</h1>
                <b-form>
                    <b-form-group
                        label="Descrición"
                        label-for="description"
                    >
                        <b-form-input
                            id="description"
                            v-model="section.description"
                            type="text"
                            required
                            placeholder="Ingrese descripción de la sección"
                            >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Camas"
                    >
                        <ul>
                            <li v-for="bed in section.beds" :key="bed.description">
                                {{bed.description}}
                                <a v-on:click="deleteBed(bed)">Eliminar</a></li>
                        </ul>
                        <b-form-group
                        label="Agregar">
                            <b-input-group>
                            <b-form-input
                                    id="bed_description"
                                    v-model="bed.description"
                                    type="text"
                                    required
                                    placeholder="Ingrese descripción de la cama"
                                    >
                                </b-form-input>
                                <b-button v-on:click="addBed" variant="info">Agregar</b-button>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                </b-form>
                <b-form-group class="text-right">
                    <button v-on:click="saveSection" class="btn btn-primary">Agregar</button>
                </b-form-group>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SectionForm',
    data() {
        return {
            section: {
                description: '',
                beds:[]
            },
            bed: {
                description: ''
            },
            mode: 'new'
        };
    },
    methods: {
        saveSection: function() {
            this.$store.dispatch('saveSection',this.section).
            then((response) =>{
                if(response.status == 200){
                    alert("asd");
                }
            });
        },
        addBed: function(){
            if(this.bed.description.trim() != ''){
                this.section.beds.push(Object.assign({}, this.bed));
                this.bed.description = '';
            }
        },
        deleteBed: function(bed){
            this.section.beds.splice(this.section.beds.indexOf(bed), 1);
        }
    }
}
</script>