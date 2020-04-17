<script>
    import {Line} from 'vue-chartjs';

    export default {
        extends: Line,
        name: "CPUChart",
        props: {
            chartData: {
                type: Object,
                default: null
            },
        },
        data() {
            return {
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [ {
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }
            }
        },
        async mounted() {
            console.log(this.chartData)
            this.renderChart(this.chartData, this.options)
        }
    }
</script>

<style scoped>
    canvas {
        height: 200px;
    }
</style>