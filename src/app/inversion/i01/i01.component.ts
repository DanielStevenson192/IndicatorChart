import { Component, OnInit, NgZone } from '@angular/core';
import { HttpService } from 'src/app/servicios/http.service';
import { Chart } from 'node_modules/chart.js/dist/Chart.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { valueToRelative } from '@amcharts/amcharts4/.internal/core/utils/Utils';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-i01',
  templateUrl: './i01.component.html',
  styleUrls: ['./i01.component.scss']
})
export class I01Component implements OnInit {

  private chart: am4charts.XYChart;
  constructor(private zone: NgZone, private serviceHttp: HttpService) { }
  LineChart = [];
  vectorAux = [];
  vector = [];
  vector2 = [];
  ngOnInit() {
    this.serviceHttp.get("calification/all/estudiantecalificacion/5").subscribe(
      res => {

        console.log(res);
      },
      err => {
      }
    );
  }



  createChart() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0;
      // ... chart code goes here ...

      //chart.data = [{anio: "2014",valor: 43},{anio: "2015",valor: 28}];
      chart.data = this.vectorAux;

      chart.innerRadius = am4core.percent(40);
      chart.depth = 120;



      function createSeries(info1, info2) {
        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = info2;
        series.dataFields.depthValue = info2;
        series.dataFields.category = info1;
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        return series;
      }



      for (var j of this.vector) {

        createSeries("Anio", j[2]);
      }


    });
  }


  createChart2() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.data = this.vectorAux;
      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "Anio";
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;

      function createSeries(info1, info2, info3) {
      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = info1;
      series.dataFields.valueX = info2;
      series.name = info2;
      series.columns.template.fillOpacity = 0.5;
      series.columns.template.strokeOpacity = 0;
      series.tooltipText = "Resultados {categoryY}: {valueX.value}";
      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryY = info1;
      lineSeries.dataFields.valueX = info2;
      lineSeries.name = info2;
      lineSeries.strokeWidth = 3;
      lineSeries.tooltipText = "Datos {categoryY}: {valueX.value}";
      let circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      circleBullet.circle.fill = am4core.color("#fff");
      circleBullet.circle.strokeWidth = 2;
      return series;
    }

    for (var j of this.vector) {
      createSeries("Anio", j[2],j[3]);
    }

      //add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";

      //add legend
      chart.legend = new am4charts.Legend();
    });
  }

  createChart3(dataIndicator) {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.data = [{ "año": 2015, "contrapartida": 43, "sinfinaciacion": 23, "capitalsemilla": 110 }];

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "año";
      categoryAxis.renderer.grid.template.location = 0;


      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;
      function createSeries(field, name) {

        // Set up series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "año";
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

        // Add label
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.locationY = 0.5;

        return series;
      }
      createSeries("contrapartida", "Contrapartida");
      createSeries("sinfinaciacion", "Sinfinaciacion");
      createSeries("capitalsemilla", "Capitalsemilla");

      chart.legend = new am4charts.Legend();
    });
  }

  createChart4() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.data = this.vectorAux;

      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "Anio";
      categoryAxis.numberFormatter.numberFormat = "#";
      categoryAxis.renderer.inversed = true;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

      // Create series
      function createSeries(info1, info2) {
        let series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueX = info2;
        series.dataFields.categoryY = info1;
        series.name = info2;
        series.columns.template.propertyFields.fill = "color";
        series.columns.template.tooltipText = "{valueX}";
        series.columns.template.column3D.stroke = am4core.color("#fff");
        series.columns.template.column3D.strokeOpacity = 0.2;
        return series;
      }
      for (var j of this.vector) {
        createSeries("Anio", j[2]);
      }
    });
  }

  createTable() {
    // console.log(this.vectorAux);

  }
  elements: any = this.vectorAux;

  headElements = ['ID', 'First', 'Last', 'Handle'];

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
