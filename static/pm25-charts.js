
const chart = echarts.init(document.querySelector('#main'));

$.ajax(
    {
        url: "/pm25-data",
        type: "POST",
        dataType: "json",
        success: (data) => {
            console.log(data);
        },
        error: () => {
            alert("取得資料失敗");
        }
    }
);





// 指定图表的配置项和数据
let option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ['X', 'Y', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'bar',
            data: [55, 20, 36, 10, 10, 20]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
chart.setOption(option);
