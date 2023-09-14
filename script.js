d3.select("#map").append("div").attr("id", "name");

d3.select("#map").append("div").attr("id", "info");

var colors = [
  "#26ff00",
  "#30d413",
  "#35b51f",
  "#369925",
  "#368729",
  "#35702c",
  "#2f5c28",
];

const width = 960;
const height = 600;

const projection = d3
  .geoAlbers()
  .translate([width / 2, height / 2])
  .scale(1000);

const path = d3.geoPath().projection(projection);

var lineData = {
  labels: [
    "sijecanj",
    "veljaca",
    "ozujak",
    "travanj",
    "svibanj",
    "lipanj",
    "srpanj",
    "kolovoz",
    "rujan",
    "listopad",
    "studeni",
    "prosinac",
  ],
  datasets: [],
};
var lineData2 = {
  labels: [
    "sijecanj",
    "veljaca",
    "ozujak",
    "travanj",
    "svibanj",
    "lipanj",
    "srpanj",
    "kolovoz",
    "rujan",
    "listopad",
    "studeni",
    "prosinac",
  ],
  datasets: [],
};

var pieData = {
  labels: [
    "sijecanj",
    "veljaca",
    "ozujak",
    "travanj",
    "svibanj",
    "lipanj",
    "srpanj",
    "kolovoz",
    "rujan",
    "listopad",
    "studeni",
    "prosinac",
  ],
  datasets: [
    {
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
};
var pieData2 = {
  labels: [
    "sijecanj",
    "veljaca",
    "ozujak",
    "travanj",
    "svibanj",
    "lipanj",
    "srpanj",
    "kolovoz",
    "rujan",
    "listopad",
    "studeni",
    "prosinac",
  ],
  datasets: [
    {
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
};

var lineChart, lineChart2, pieChart, pieChart2;

function loadData() {
  var selectedYear = document.getElementById("year").value;
  var jsonFile = `us-states${selectedYear}.json`;

  d3.json(jsonFile).then(function (data) {
    const svg = d3.select("#map").attr("width", width).attr("height", height);
    var colorScale = d3
      .scaleLinear()
      .domain([0, 150000])
      .range(["#FFCCCC", "#FF0000"]);


      var legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", "translate(350, 570)");
  
    var legendWidth = 300;
    var legendHeight = 20;
  
    var legendScale = d3.scaleLinear().domain([0, 150000]).range([0, legendWidth]);
  
    var legendAxis = d3
      .axisBottom(legendScale)
      .tickValues([0, 150000])
      .tickFormat(d3.format(" "))
      .tickSizeOuter(0);
  
    legend
      .append("g")
      .attr("transform", "translate(0, " + legendHeight + ")")
      .call(legendAxis)
      .select(".domain")
      .remove();
  
    legend
      .append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#legend-gradient)");
  
    legend.selectAll("line").style("stroke", "red");
  
    legend.selectAll("text").style("fill", "red");
  
    var legendGradient = legend
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
  
    legendGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FFCCCC");
  
    legendGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#FF0000");

    svg
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("id", function (d) {
        return d.id;
      })
      .attr("stroke", "#a70000")
      .style("fill", function (d) {
        var zarazeni = d.properties.broj_zarazenih;
        return colorScale(zarazeni);
      })
      .style("stroke-width", 1)
      .attr("opacity", "1")
      .on("mouseover", function (d) {
        var currentColor = d3.select(this).style("fill");
        d3.select(this)
          .style("fill", "white")
          .attr("data-current-color", currentColor);
        d3.select(this).on("click", function (d) {
          onClick(d);
        });
        d3.select(this).attr("cursor", "pointer");
      })
      .on("mouseleave", function (d) {
        var currentColor = d3.select(this).attr("data-current-color");
        d3.select(this).style("fill", currentColor);
      });

    var ctx = document.getElementById("lineChartCanvas").getContext("2d");

    var lineOptions = {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Broj zaraženih",
          },
        },
      },
    };

    lineChart = new Chart(ctx, {
      type: "line",
      data: lineData,
      options: lineOptions,
    });

    var ctx2 = document.getElementById("lineChartCanvas2").getContext("2d");

    var lineOptions2 = {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Broj umrlih",
          },
        },
      },
    };

    lineChart2 = new Chart(ctx2, {
      type: "line",
      data: lineData2,
      options: lineOptions2,
    });

    var ctxPie = document.getElementById("pieChartCanvas").getContext("2d");

    var pieOptions = {
      responsive: false,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Broj zaraženih po mjesecima",
        fontSize: 20,
      },
    };

    pieChart = new Chart(ctxPie, {
      type: "pie",
      data: pieData,
      options: pieOptions,
    });

    var ctxPie2 = document.getElementById("pieChartCanvas2").getContext("2d");

    var pieOptions2 = {
      responsive: false,
      maintainAspectRatio: false, 
      title: {
        display: true,
        text: "Broj zaraženih po mjesecima",
        fontSize: 20,
      },
    };

    pieChart2 = new Chart(ctxPie2, {
      type: "pie",
      data: pieData2,
      options: pieOptions2,
    });
  });

  function onClick(d) {
    var infoDiv = d3.select(".info"); 
    infoDiv.html(`
        <p>Država: ${d.properties.name}</p>
        <p>Populacija: ${d.properties.population}</p>
        <p>Broj zaraženih: ${d.properties.broj_zarazenih}</p>
        <p>Broj umrlih: ${d.properties.broj_umrlih}</p>       
    `);

    lineData.datasets = [];
    lineData2.datasets = [];
    pieData.datasets = [];
    pieData2.datasets = [];

    var zarazeniPoMjesecima = [
      d.properties.sijecanj,
      d.properties.veljaca,
      d.properties.ozujak,
      d.properties.travanj,
      d.properties.svibanj,
      d.properties.lipanj,
      d.properties.srpanj,
      d.properties.kolovoz,
      d.properties.rujan,
      d.properties.listopad,
      d.properties.studeni,
      d.properties.prosinac,
    ];
    var umrliPoMjesecima = [
      d.properties.sijecanj1,
      d.properties.veljaca2,
      d.properties.ozujak3,
      d.properties.travanj4,
      d.properties.svibanj5,
      d.properties.lipanj6,
      d.properties.srpanj7,
      d.properties.kolovoz8,
      d.properties.rujan9,
      d.properties.listopad1,
      d.properties.studeni1,
      d.properties.prosinac2,
    ];

    var dataset = {
      label: d.properties.name,
      data: zarazeniPoMjesecima,
      borderColor: "rgb(255, 0, 0)",
      fill: false,
    };

    var dataset2 = {
      label: d.properties.name,
      data: umrliPoMjesecima,
      borderColor: "rgb(255, 0, 0)",
      fill: false,
    };

    var dataset3 = {
      label: d.properties.name,
      data: zarazeniPoMjesecima,
      backgroundColor: [
        "#FFCCCC",
        "#FF9999",
        "#FF7777",
        "#FF5555",
        "#FF3333",
        "#FF1111",
        "#CC0000",
        "#AB0000",
        "#8A0000",
        "#6E0000",
        "#4D0000",
        "#2C0000",
        "#2C0000",
      ],
      fill: false,
    };

    var dataset4 = {
      label: d.properties.name,
      data: umrliPoMjesecima,
      backgroundColor: [
        "#FFCCCC",
        "#FF9999",
        "#FF7777",
        "#FF5555",
        "#FF3333",
        "#FF1111",
        "#CC0000",
        "#AB0000",
        "#8A0000",
        "#6E0000",
        "#4D0000",
        "#2C0000",
        "#2C0000",
      ],
      fill: false,
    };

    lineData.datasets.push(dataset);
    lineData2.datasets.push(dataset2);
    pieData.datasets.push(dataset3);
    pieData2.datasets.push(dataset4);

    lineChart.update();
    lineChart2.update();
    pieChart.update();
    pieChart2.update();
  }
}

function showmap() {
  d3.select("#map").style("display", "block");
  d3.select("#lineChartCanvas").style("display", "none");
  d3.select("#lineChartCanvas2").style("display", "none");
  d3.select("#pieChartCanvas").style("display", "none");
  d3.select("#pieChartCanvas2").style("display", "none");
  d3.select(".chart-container").style("display", "none");
}

function showZarazeni() {
  d3.select("#map").style("display", "none");
  d3.select("#lineChartCanvas").style("display", "block");
  d3.select("#lineChartCanvas2").style("display", "none");
  d3.select("#pieChartCanvas").style("display", "block");
  d3.select("#pieChartCanvas2").style("display", "none");
  d3.select(".chart-container").style("display", "block");
}

function showUmrli() {
  d3.select("#map").style("display", "none");
  d3.select("#lineChartCanvas").style("display", "none");
  d3.select("#lineChartCanvas2").style("display", "block");
  d3.select("#pieChartCanvas").style("display", "none");
  d3.select("#pieChartCanvas2").style("display", "block");
  d3.select(".chart-container").style("display", "block");
}

document.getElementById("showmap").addEventListener("click", showmap);
document
  .getElementById("showZarazeni")
  .addEventListener("click", showZarazeni);
document
  .getElementById("showUmrli")
  .addEventListener("click", showUmrli);


loadData();
showmap();
