import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ErroresComponent implements OnInit {

  constructor(private servidor: BackendService) {
    this.verErrores();
  }

  errors: any = []

  ngOnInit(): void {
  }

  verErrores() {
    this.servidor.Errores().subscribe(
      res => {
        var js = JSON.stringify(res)
        var data = JSON.parse(js).Errores
        console.log(data)
        let longitud = data.length
        for (let i = 0; i < longitud; i++) {
          this.errors.push(data[i])
        }
      },
      err => { }
    )


  }
}
