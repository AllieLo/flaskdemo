
const chart = echarts.init(document.querySelector('#main'));
const chart1 = echarts.init(document.querySelector('#six'));

const pm25HighSite = document.querySelector("#pm25_high_site");
const pm25HighValue = document.querySelector("#pm25_high_value");
const pm25LowSite = document.querySelector("#pm25_low_site");
const pm25LowValue = document.querySelector("#pm25_low_value");

console.log(pm25HighSite, pm25HighValue, pm25LowSite, pm25LowValue);

$(document).ready(() => {
    drawPM25();
    drawSixPM25();
});

window.onresize = function () {
    chart.resize();
    chart1.resize();
}


function drawSixPM25() {
    $.ajax(
        {
            url: "/pm25-six-data",
            type: "GET",
            dataType: "json",
            success: (data) => {
                console.log(data);
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    legend: {
                        textStyle: {
                            color: 'rgba(200, 205, 255, 0.3)'
                        },
                        data: ['PM2.5'],
                    },
                    xAxis: {
                        data: data['county']
                    },
                    yAxis: {},
                    series: [
                        {
                            itemStyle: {
                                color: '#8b008b'
                            },
                            name: '數值',
                            type: 'bar',
                            data: data['pm25']
                        }
                    ]
                };
                chart1.setOption(option);
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
                pm25HighSite.innerText = data['highest'][0];
                pm25HighValue.innerText = data['highest'][1];
                pm25LowSite.innerText = data['lowest'][0];
                pm25LowValue.innerText = data['lowest'][1];
                $('#date').text(data['date']);
            },
            error: () => {
                alert("取得資料失敗");
            }
        }
    );

}



