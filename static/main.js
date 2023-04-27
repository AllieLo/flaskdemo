
const chart = echarts.init(document.querySelector('#main'));
const pm25HighSite = document.querySelector("#pm25_high_site");
const pm25HighValue = document.querySelector("#pm25_high_value");
const pm25LowSite = document.querySelector("#pm25_low_site");
const pm25LowValue = document.querySelector("#pm25_low_value");

console.log(pm25HighSite, pm25HighValue, pm25LowSite, pm25LowValue);

$(document).ready(() => {
    drawPM25();
});


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



