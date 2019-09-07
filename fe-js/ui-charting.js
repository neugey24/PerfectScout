function groomLabelData(dataIn) {
  var output = new Array();
  var firstValue = dataIn[0].card_overall + 'OVR ' + dataIn[0].last_name;
  output.push(firstValue);
  for (var rv=1; rv < 3; rv++) {
    var checkValue = dataIn[rv].last_name;
    if (checkValue != null) {
      output.push(dataIn[rv].card_overall + 'OVR ' + dataIn[rv].last_name);
    }
  }
  return output;
}

function groomRatingData(dataIn, ratingItem) {
  var output = new Array();
  var firstValue = eval("dataIn[0]." + ratingItem + ";");
  output.push(firstValue);
  for (var rv=1; rv < 3; rv++) {
    var checkValue = eval("dataIn[" + rv + "]." + ratingItem + ";");
    if (checkValue != null) {
      output.push(checkValue);
    }
  }
  return output;
}

function producePSBarCharts(dataIn) {
  var namesData = groomLabelData(dataIn);
  makePSBarChart(groomRatingData(dataIn, 'contact'), namesData, 'chart_contact', 'Contact');
  makePSBarChart(groomRatingData(dataIn, 'gap'), namesData, 'chart_gap', 'Gap Power');
  makePSBarChart(groomRatingData(dataIn, 'power'), namesData, 'chart_power', 'Power');
  makePSBarChart(groomRatingData(dataIn, 'eye'), namesData, 'chart_eye', 'Eye');
  makePSBarChart(groomRatingData(dataIn, 'avoid_k'), namesData, 'chart_avoid_k', 'Avoid K');

  makePSBarChart(groomRatingData(dataIn, 'contact_vs_r'), namesData, 'chart_contact_vs_r', 'Contact vs R');
  makePSBarChart(groomRatingData(dataIn, 'gap_vs_r'), namesData, 'chart_gap_vs_r', 'Gap vs R');
  makePSBarChart(groomRatingData(dataIn, 'power_vs_r'), namesData, 'chart_power_vs_r', 'Power vs R');
  makePSBarChart(groomRatingData(dataIn, 'eye_vs_r'), namesData, 'chart_eye_vs_r', 'Eye vs R');
  makePSBarChart(groomRatingData(dataIn, 'avoid_k_vs_r'), namesData, 'chart_avoid_k_vs_r', 'Avoid K vs R');

  makePSBarChart(groomRatingData(dataIn, 'contact_vs_l'), namesData, 'chart_contact_vs_l', 'Contact vs L');
  makePSBarChart(groomRatingData(dataIn, 'gap_vs_l'), namesData, 'chart_gap_vs_l', 'Gap vs L');
  makePSBarChart(groomRatingData(dataIn, 'power_vs_l'), namesData, 'chart_power_vs_l', 'Power vs L');
  makePSBarChart(groomRatingData(dataIn, 'eye_vs_l'), namesData, 'chart_eye_vs_l', 'Eye vs L');
  makePSBarChart(groomRatingData(dataIn, 'avoid_k_vs_l'), namesData, 'chart_avoid_k_vs_l', 'Avoid K vs L');

  makePSBarChart(groomRatingData(dataIn, 'speed'), namesData, 'chart_speed', 'Speed');
  makePSBarChart(groomRatingData(dataIn, 'steal'), namesData, 'chart_steal', 'Stealing');
  makePSBarChart(groomRatingData(dataIn, 'baserunning'), namesData, 'chart_baserunning', 'Baserunning');
  makePSBarChart(groomRatingData(dataIn, 'sac_bunt'), namesData, 'chart_sac_bunt', 'Sac Bunt');
  makePSBarChart(groomRatingData(dataIn, 'bunt_for_hit'), namesData, 'chart_bunt_for_hit', 'Bunt for Hit');

  makePSBarChart(groomRatingData(dataIn, 'inf_range'), namesData, 'chart_inf_range', 'Infield Range');
  makePSBarChart(groomRatingData(dataIn, 'inf_error'), namesData, 'chart_inf_error', 'Infield Error');
  makePSBarChart(groomRatingData(dataIn, 'inf_arm'), namesData, 'chart_inf_arm', 'Infield Arm');
  makePSBarChart(groomRatingData(dataIn, 'inf_turn'), namesData, 'chart_inf_turn', 'Turn DP');
  makePSBarChart(groomRatingData(dataIn, 'catcher_ability'), namesData, 'chart_catcher_ability', 'Catcher Ability');
  makePSBarChart(groomRatingData(dataIn, 'catcher_arm'), namesData, 'chart_catcher_arm', 'Catcher Arm');

  makePSBarChart(groomRatingData(dataIn, 'of_range'), namesData, 'chart_of_range', 'Outfield Range');
  makePSBarChart(groomRatingData(dataIn, 'of_error'), namesData, 'chart_of_error', 'Outfield Error');
  makePSBarChart(groomRatingData(dataIn, 'of_arm'), namesData, 'chart_of_arm', 'Outfield Arm');
}

function makePSBarChart(dataIn, namesIn, displayIdIn, ratingName) {
  var options = {
            chart: {
                height: 90,
                type: 'bar',
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    barHeight: '100%',
                    distributed: true,
                    horizontal: true
                }
            },
            colors: ['#bb0000', '#008800', '#0000dd'],
            series: [{
                name: ratingName,
                data: dataIn
            }],
            stroke: {
                width: 1,
              colors: ['#fff']
            },
            tooltip: {
                theme: 'light',
                x: {
                    show: true
                },
                y: {
                    show: false
                }
            }, xaxis: {
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
                categories: namesIn
              },
              yaxis: {
                labels: { show: false },
                min: 0, max: 128
              }
        }

var chart = new ApexCharts(document.querySelector(`#${displayIdIn}`), options);
chart.render();
//var display = chart.render();
//document.write(display);
}
