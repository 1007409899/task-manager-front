import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskStateService } from './services/task.service';
import { Task } from './interfaces/task-interface';
import { ModalService } from './services/modal.service';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { DetailsTaskComponent } from './components/details-task/details-task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,RouterModule, AddTaskComponent,DetailsTaskComponent
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

  updateTaskStatus(task: Task): void {
    !task.completed
    this.taskService.updateTask({...task, completed: !task.completed});
  }
  VerTask(task:any){
    this.modalService.open(task)
  }
  removeTask(id: number): void {
    this.taskService.removeTask(id);
  }
 // Método que se ejecuta cuando el usuario selecciona un estado en el select
 onStatusChange(event: any) {
  const value = event.target.value;

  if (value === 'completed') {
    // Filtrar tareas completadas
    this.taskService.filterTasksByStatus(true);
  } else if (value === 'pending') {
    // Filtrar tareas pendientes
    this.taskService.filterTasksByStatus(false);
  } else {
    // Mostrar todas las tareas
    this.taskService.getAllTasks();
  }
}
  openAddTaskModal() {
    console.log("njfen")
    this.modalService.open();
  }
}
