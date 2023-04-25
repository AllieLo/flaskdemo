
const chart = echarts.init(document.querySelector('#main'));

$(document).ready(() => {
    drawPM25_1();
});

function drawPM25_1() {
    $.ajax(
        {
            url: "/pm25-data",
            type: "POST",
            dataType: "json",
            success: (data2) => {
                console.log(data2);
                let dataAxis = data2['site'];
                // prettier-ignore
                let data = data2['pm25'];
                let yMax = 500;
                let dataShadow = [];
                for (let i = 0; i < data.length; i++) {
                    dataShadow.push(yMax);
                }
                option = {
                    title: {
                        text: '特性示例：渐变色 阴影 点击缩放',
                        subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
                    },
                    xAxis: {
                        data: dataAxis,
                        axisLabel: {
                            inside: true,
                            color: '#fff'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#999'
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            showBackground: true,
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: '#83bff6' },
                                    { offset: 0.5, color: '#188df0' },
                                    { offset: 1, color: '#188df0' }
                                ])
                            },
                            emphasis: {
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#2378f7' },
                                        { offset: 0.7, color: '#2378f7' },
                                        { offset: 1, color: '#83bff6' }
                                    ])
                                }
                            },
                            data: data
                        }
                    ]
                };
                // Enable data zoom when user click bar.
                const zoomSize = 6;
                chart.on('click', function (params) {
                    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                    chart.dispatchAction({
                        type: 'dataZoom',
                        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                        endValue:
                            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                    });
                });

                chart.setOption(option);

            },
            error: () => {
                alert("取得資料失敗");
            }
        }
    );
}


function drawPM25() {
    $.ajax(
        {
            url: "/pm25-data",
            type: "POST",
            dataType: "json",
            success: (data) => {
                console.log(data);
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    legend: {
                        data: ['數值']
                    },
                    xAxis: {
                        data: data['site']
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '數值',
                            type: 'bar',
                            data: data['pm25']
                        }
                    ]
                };

                chart.setOption(option);
            },
            error: () => {
                alert("取得資料失敗");
            }
        }
    );

}



