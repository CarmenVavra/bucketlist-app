import { Component } from '@angular/core';
import { PRIORITY } from '../../bucketlist/models/bucket-list.model';

@Component({
  selector: 'app-priority-legend',
  imports: [],
  templateUrl: './priority-legend.component.html',
  styleUrl: './priority-legend.component.css'
})
export class PriorityLegendComponent {

  get priority() {
    return PRIORITY;
  }
}
