<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="table"v-loading="loading"
        element-loading-text="添加数据中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
  <div id="main" style="width: 600px;height: 400px;"></div>
</div>
</template>
<script>
  import echarts from 'echarts'
    export default {
        name: '',
        data () {
            return {
                loading: false,
                charts: '',
                opinion:['进口食品','生鲜食品','休闲食品','酒类','粮油','调味品','饼干蛋糕','奶制品','干活','其他'],
                opinionData:[
                    {value:335, name:'进口食品'},
                    {value:310, name:'生鲜食品'},
                    {value:234, name:'休闲食品'},
                    {value:135, name:'酒类'},
                    {value:1048, name:'粮油'},
                    {value:251, name:'调味品'},
                    {value:147, name:'饼干蛋糕'},
                    {value:102, name:'其他'}
                ]
            }
        },
        methods:{
            drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:this.opinion
                },
                series: [
                    {
                        name:'销售来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],

                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'生活', selected:true},
                            {value:679, name:'零食'},
                            {value:1548, name:'饮料'}
                        ]
                    },
                    {
                        name:'销售来源',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                            normal: {
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                // shadowBlur:3,
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 2,
                                // shadowColor: '#999',
                                // padding: [0, 7],
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    // abg: {
                                    //     backgroundColor: '#333',
                                    //     width: '100%',
                                    //     align: 'right',
                                    //     height: 22,
                                    //     borderRadius: [4, 4, 0, 0]
                                    // },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                     data:this.opinionData
                   }
                 ]
               })
            }
        },
      //调用
        mounted(){
            this.$nextTick(function() {
                this.drawPie('main')
            })
        }
    }
</script>
<style >
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .table{
        margin-left: 200px;
    }
</style>