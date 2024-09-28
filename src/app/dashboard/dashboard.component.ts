import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskStateService } from './services/task.service';
import { Task } from './interfaces/task-interface';
import { ModalService } from './services/modal.service';
import { AddTaskComponent } from './components/add-task/add-task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,RouterModule, AddTaskComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {


  tasks: Task[] = [];

  constructor(private taskService: TaskStateService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks(); // Llama al método sin suscripción
    this.taskService.tasks$.subscribe((tasks) => {

      this.tasks = tasks; // Actualiza la propiedad tasks cuando se recibe un nuevo valor
    });
  }

  updateTask(task: Task): void {
    // Implementa la lógica para actualizar la tarea
  }
  removeTask(id: number): void {

  }

  openAddTaskModal() {
    console.log("njfen")
    this.modalService.open();
  }
}
