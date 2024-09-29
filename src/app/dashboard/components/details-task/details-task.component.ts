import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Person, Task } from '../../interfaces/task-interface';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { FormBuilder } from '@angular/forms';
import { TaskStateService } from '../../services/task.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-details-task',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css'],
})
export class DetailsTaskComponent implements OnInit {
  task!: Task;  // Detalles de la tarea
  people$!: Observable<Person[]>; // Personas asociadas a la tarea

  constructor(private modalService: ModalService, private fb: FormBuilder, private taskStateService:TaskStateService,  ) {}

  ngOnInit(): void {
    const modalElement = document.getElementById('modalDetailsTask');
    if (modalElement) {
      this.modalService.setModal(new Modal(modalElement)); //
    }
  }

}
