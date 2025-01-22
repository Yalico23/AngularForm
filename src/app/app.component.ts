import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { FormComponent } from './components/form/form.component';
import { Producto } from './models/producto';
import Swal from 'sweetalert2';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [ProductsComponent, FormComponent],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  constructor(private service: ProductService) { }

  title = 'Hola mundo Angular';

  products: Producto[] = [];

  countId = signal(6); // no usa const ni let para declarar la variable countId 

  // * Seleccionar un producto de la lista , update
  productSelected: Producto = {
    id: 0,
    name: '',
    price: 0,
    description: ''
  }


  ngOnInit(): void {
    // this.products = [
    //   { id: 1, name: 'Producto 1', price: 100, description: 'description 1'},
    //   { id: 2, name: 'Producto 2', price: 200, description: 'description 2'},
    //   { id: 3, name: 'Producto 3', price: 300, description: 'description 3'},
    //   { id: 4, name: 'Producto 4', price: 400, description: 'description 4'},
    //   { id: 5, name: 'Producto 5', price: 500, description: 'description 5'}
    // ]
    // * desde el servicio relleno la lista de productos
    this.service.findAll().subscribe(products => {
      this.products = products;
    });
  }

  // * Llega del formulario hijo tanto para crear como para actualizar
  addProduct(product: Producto): void {
    if (product.id > 0) {
      this.service.update(product).subscribe((productUpdate: Producto) => {
        this.products = this.products.map(p => {

          if (p.id === product.id) {
            return { ...productUpdate };
          }
          return p;
        });
        Swal.fire('Producto actualizado', 'El producto se ha actualizado correctamente', 'success');
      })
    } else {
      this.service.save(product).subscribe((productCreated: Producto) => {
        //this.products = [...this.products, { ...product, id: this.countId() }]; // no usa const ni let para declarar la variable products
        this.products = [...this.products, {...productCreated}]; 
        //this.countId.update(id => id + 1);
        Swal.fire('Producto creado', 'El producto se ha creado correctamente', 'success');
      });
    }
  }

  // * Seleccionar un producto de la lista y lo rellena en el formulario
  updateProduct(product: Producto): void {
    this.productSelected = { ...product };
  }

  // * Eliminar un producto de la lista
  removeProduct(product: Producto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(product.id).subscribe(() => {
          this.products = this.products.filter(p => p.id !== product.id);
          Swal.fire(
            'Eliminado!',
            `El producto ${product.name} ha sido eliminado.`,
            'success'
          );
        });
      }
    });
  }

}
