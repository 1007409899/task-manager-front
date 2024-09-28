import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-details-task',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsTaskComponent implements OnInit {

  ngOnInit(): void { }

}
