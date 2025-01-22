import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html'
})

export class ProductsComponent {
  @Input() products:Producto[] = [];
  
  title:string = 'Products';

  @Output() onUpdateProductEvent = new EventEmitter<Producto>();

  @Output() onRemoveProductEvent = new EventEmitter<Producto>();

  onUpdateProduct(product:Producto):void {
    this.onUpdateProductEvent.emit(product);
  }

  onRemoveProduct(product:Producto):void {
    this.onRemoveProductEvent.emit(product);
  }
  
}
