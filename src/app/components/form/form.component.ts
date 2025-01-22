import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Producto } from '../../models/producto';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent {

  @Input() product : Producto = {
    id: 0,
    name: '',
    price: 0,
    description: ''
  }

  @Output() addProductEvent = new EventEmitter<Producto>(); // Evento para agregar un producto a la lista de productos en app.component.ts hacia el padre app.component.ts

  onSubmit(productForm: NgForm) {
    if(productForm.valid){
      this.addProductEvent.emit(this.product); // Emitir el evento para agregar un producto a la lista de productos en app.component.ts
      this.clean();
      productForm.reset();
      productForm.resetForm();
    }
    
  }

  clean() : void {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      description: ''
    }
  }

}
