import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  URL: string = 'http://127.0.0.1:4000';

  Escaneo(cuerpo:any){
    return this.http.post(`${this.URL}/escaneo`,cuerpo)
  }
  
  Errores(){
    return this.http.get(`${this.URL}/errores`)
  }

  AST(){
    return this.http.get(`${this.URL}/ast`)
  }

  Simbolos(){
    return this.http.get(`${this.URL}/simbolos`)
  }

}
