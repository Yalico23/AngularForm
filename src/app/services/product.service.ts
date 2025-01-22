import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/productos/all`);
  }

  findById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/productos/one/${id}`);
  }

  save(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.url}/productos/create`, product);
  }

  update(product: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/productos/update/${product.id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/productos/delete/${id}`);
  }
}
