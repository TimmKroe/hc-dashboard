<script>
    import {Line} from 'vue-chartjs';

    export default {
        extends: Line,
        name: "CPUChart",
        props: {
            data: {
                type: Array,
                default: null,
            }
        },
        data() {
            return {
                cpuData: {
                    datasets: [
                        {
                            label: 'CPU Usage',
                            borderColor: '#f87979',
                            data: this.data,
                            steppedLine: false
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
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
            console.log("HERE FROM CHART: ")
            console.log(this.data)
            this.renderChart(this.cpuData, this.options)
        }
    }
</script>

<style scoped>
    canvas {
        height: 200px;
    }
</style>