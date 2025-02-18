import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
 
Chart.register(...registerables);

@Component({  
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent {
  show=true;
  loading:boolean=false;

  onCalanderButtonClick(){
    this.show=!this.show;
  }

}
