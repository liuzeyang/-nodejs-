<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="table">
      <div id="main" style="width: 600px;height: 400px;"></div>
  </div>  
</template>
<script>
  import echarts from 'echarts'
    export default {
        name: '',
        data () {
            return {
                charts: '',
                opinion:['最高销量','最低销量'],
                sellmax:[11, 11, 15, 13, 12, 13, 10],
                sellmin:[1, 2, 2, 5, 3, 2, 0]
            }
        },
        methods:{
            drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                title: {
                      text: '销量示意图',
                      subtext: '纯属虚构'
                  },
                 tooltip: {
                   trigger: 'axis'
                 },
                 legend: {
                    data:this.option
                 },
                 toolbox: {
                      show: true,
                      feature: {
                          dataZoom: {
                              yAxisIndex: 'none'
                          },
                          dataView: {readOnly: false},
                          magicType: {type: ['line', 'bar']},
                          restore: {},
                          saveAsImage: {}
                      }
                  },
                  xAxis:  {
                      type: 'category',
                      boundaryGap: false,
                      data: ['周一','周二','周三','周四','周五','周六','周日']
                  },
                  yAxis: {
                      type: 'value',
                      axisLabel: {
                          formatter: '{value} 件'
                      }
                  },
                 series: [
                  {
                      name:'最高销量',
                      type:'line',
                      data:this.sellmax,
                      markPoint: {
                          data: [
                              {type: 'max', name: '最大值'}
                          ]
                      },
                      markLine: {
                          data: [
                              {type: 'average', name: '平均值'}
                          ]
                      }
                  },
                  {
                      name:'最低销量',
                      type:'line',
                      data:this.sellmin,
                      markPoint: {
                          data: [
                              {name: '周最低', value: 0, xAxis: 6, yAxis: 0}
                          ]
                      },
                      markLine: {
                          data: [
                              {type: 'average', name: '平均值'},
                              [{
                                  symbol: 'none',
                                  x: '90%',
                                  yAxis: 'max'
                              }, {
                                  symbol: 'circle',
                                  label: {
                                      normal: {
                                          position: 'start',
                                          formatter: '最大值'
                                      }
                                  },
                                  type: 'max',
                                  name: '最高点'
                              }]
                          ]
                      }
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
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
     .table{
        margin-left: 200px;
    }
</style>