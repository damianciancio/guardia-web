<script>
export default {
    data: function (){
        return {

            host: 'localhost',
            port: '3000',
            apiPath: '/api'
        }
    },
    methods: {
        getApiRoot: function() {
            return this.apiPath
        }
    }
}
</script>