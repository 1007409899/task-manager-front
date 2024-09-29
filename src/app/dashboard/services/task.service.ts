import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'; // Para manejar el estado después de la respuesta
import { Task } from '../interfaces/task-interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private apiUrl = environment.apiUrl; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener todas las tareas desde la API
  getAllTasks(){
     this.http.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      tap(tasks => {
        this.tasksSubject.next(tasks); // Actualiza el estado local con las tareas obtenidas
      })
    ).subscribe();
  }

  // Método para añadir una tarea y notificar a la API
  addTask(task: Task) {
    this.http.post<Task>(`${this.apiUrl}/tasks`, task).pipe(
      tap(newTask => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, newTask]);
          // Mostrar notificación
    Swal.fire({
      title: '¡Éxito!',
      text: 'Tarea agregada exitosamente',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

      })
    ).subscribe();
  }

  // Método para actualizar una tarea en la API y luego en el estado local
  updateTask(updatedTask: Task) {
    this.http.patch(`${this.apiUrl}/tasks/${updatedTask._id}`, updatedTask).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.value.map(task =>
          task._id === updatedTask._id ? updatedTask : task
        );
        this.tasksSubject.next(currentTasks); // Actualizamos el estado local tras la actualización en la API
      })
    ).subscribe();
  }

  // Método para eliminar una tarea en la API y luego en el estado local
  removeTask(taskId: number) {
    this.http.delete(`${this.apiUrl}/tasks/${taskId}`).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.value.filter(task => task._id !== taskId);
        this.tasksSubject.next(currentTasks);

    // Mostrar notificación
    Swal.fire({
      title: 'Eliminada',
      text: 'Tarea eliminada exitosamente',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
      })
    ).subscribe();
  }
   // Método para filtrar tareas por estado
   filterTasksByStatus(completed: boolean) {
    this.http.get<Task[]>(`${this.apiUrl}/tasks/filter?completed=${completed}`).pipe(
      tap(filteredTasks => {
        this.tasksSubject.next(filteredTasks); // Actualiza el estado local con las tareas filtradas
      })
    ).subscribe();
  }



}
