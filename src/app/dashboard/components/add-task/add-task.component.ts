import { TaskStateService } from './../../services/task.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Modal } from 'bootstrap';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../interfaces/task-interface';
import { CusstomValidatorService } from '../../services/custom-validator.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {

  tareaForm!: FormGroup;
  constructor(private modalService: ModalService, private fb: FormBuilder, private taskStateService: TaskStateService, private customValidatorService: CusstomValidatorService) { }

  ngOnInit(): void {


    const modalElement = document.getElementById('modalddTask');
    if (modalElement) {
      this.modalService.setModal(new Modal(modalElement)); //
    }

    this.tareaForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      people: this.fb.array([this.createPersonFormGroup()])


    });
    this.modalService.getDataTask.subscribe((res: any) => {
      this.tareaForm.patchValue(res);

    })


    this.tareaForm.valueChanges.subscribe(() => {
      console.log(this.tareaForm)
    })
  }
  createPersonFormGroup(): FormGroup {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.createSkillFormGroup()])
    }, {
      validators: [this.customValidatorService.uniqueControlNameValidator('fullName')] // Aquí llamas la función
    });
  }

  // Crea un grupo de formulario para las habilidades
  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required]
    });
  }

  // Obtener el array de personas
  get people(): FormArray {
    return this.tareaForm.get('people') as FormArray;
  }

  // Agregar una nueva persona
  addPerson(): void {
    this.people.push(this.createPersonFormGroup());
  }

  // Eliminar una persona
  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  // Obtener el array de habilidades de una persona
  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  // Agregar una habilidad a una persona
  addSkill(personIndex: number): void {
    this.getSkills(personIndex).push(this.createSkillFormGroup());
  }

  // Eliminar una habilidad de una persona
  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  // Método para enviar el formulario
  submitForm(): void {
    if (this.tareaForm.invalid) {
      return this.tareaForm.markAllAsTouched();
    }
    const formValue = this.tareaForm.value;

    // Transformar cada persona para que sus habilidades sean un array de strings
    formValue.people = formValue.people.map((person: Person) => {
      return {
        ...person,  // Mantener las otras propiedades de la persona
        skills: person.skills.map(skill => skill.skillName)  // Transformar 'skills' en un array de strings
      };
    });
    this.taskStateService.addTask(formValue);
    this.modalService.close()
  }
}
