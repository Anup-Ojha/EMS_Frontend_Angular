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
  showFiller = false;
  onCalanderButtonClick(){
    this.show=!this.show;
  }

  notifications = [
    {
      title: 'Meeting Reminder',
      description: 'Don\'t forget about the team meeting at 3 PM today.'
    },
    {
      title: 'New Message',
      description: 'You have received a new message from John Doe.'
    },
    {
      title: 'System Update',
      description: 'A new system update is available. Please update your software.'
    },
    {
      title: 'Task Deadline',
      description: 'The deadline for the project submission is tomorrow.'
    }
  ];


}
