<template>
  <div class="chart-content">
    <el-card class="top-card">
      <ul>
        <li>
          <div class="circle primary">{{titleData.increment_users}}</div>
          <span>今日新增用户</span>
        </li>
        <li>
          <div class="circle primary">{{titleData.personal_questions}}</div>
          <span>总用户量</span>
        </li>
        <li>
          <div class="circle warning">{{titleData.increment_questions}}</div>
          <span>新增试题</span>
        </li>
        <li>
          <div class="circle warning">{{titleData.total_questions}}</div>
          <span>总试题量</span>
        </li>
        <li>
          <div class="circle success">{{titleData.total_done_questions}}</div>
          <span>总刷题量</span>
        </li>
        <li>
          <div class="circle success">{{titleData.personal_questions}}</div>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="content-card" ref="bottomCard">
      <div id="main"></div>
    </el-card>
  </div>
</template>

<script>
import echarts  from 'echarts';
export default {
  name: "chart",
  data() {
    return {
      titleData: {}
    };
  },
  created() {
    this.$getAPI("dataTitle").then(res => {
      this.titleData = res.data;
    });
  },
  mounted() {
    this.$getAPI('dataStatistics').then(res => {
      window.console.log(res);
      let arrTitle = res.data.map(v => {
        return v.name;
      })
      this.getContentData(arrTitle, res.data);
    })
  },
  methods: {
    getContentData(arrTitle,arrData) {
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          // data: ["黑马", "阿里", "京东"]
          data: arrTitle
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // data: [
            //   { value: 335, name: "黑马" },
            //   { value: 310, name: "阿里" },
            //   { value: 234, name: "京东" }
            // ]
            data: arrData
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="less">
.chart-content {
  .top-card {
    height: 149px;
    margin-bottom: 20px;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      li {
        list-style: none;
        text-align: center;
        span {
          display: inline-block;
          color: #737373;
          position: relative;
          top: 4px;
          font-size: 16px;
        }
        .circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          position: relative;
          top: -15px;
          line-height: 100px;
          text-align: center;
          font-size: 35px;
          &.primary {
            border: 2px solid #0086fa;
            color: #0086fa;
          }
          &.warning {
            border: 2px solid #f76137;
            color: #f76137;
          }
          &.success {
            border: 2px solid #55cd78;
            color: #55cd78;
          }
        }
      }
    }
  }
  .content-card {
    height: 571px;
    #main{
      width: 100%;
      height: 571px;
    }
  }
}
</style>