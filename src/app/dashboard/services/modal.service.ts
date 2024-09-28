import { Injectable, signal } from '@angular/core';
import { Modal } from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: Modal | null = null; // Tipado correcto
  isOpen = signal(false); // Signal para controlar si está abierto o cerrado

  setModal(modalRef: Modal) {
    this.modalRef = modalRef;
  }

  open() {
    if (this.modalRef) {
      this.modalRef.show();
      this.isOpen.set(true); // Cambia el signal al estado de abierto
    }
  }

  close() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.isOpen.set(false); // Cambia el signal al estado de cerrado
    }
  }
}
