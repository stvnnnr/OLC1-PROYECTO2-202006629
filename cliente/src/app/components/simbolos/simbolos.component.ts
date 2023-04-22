import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-simbolos',
  templateUrl: './simbolos.component.html',
  styleUrls: ['./simbolos.component.css']
})
export class SimbolosComponent implements OnInit {


  constructor(private servidor: BackendService) {
    this.verSimbolos();
   }

  simbols: any = [];

  ngOnInit(): void {
  }

  verSimbolos() {
    this.servidor.Simbolos().subscribe(
      res => {
        var js = JSON.stringify(res);
        var data = JSON.parse(js).Simbolos
        console.log(res)
        let longitud = data.length;
        for (let i = 0; i < longitud; i++) {
          this.simbols.push(data[i]);
        }
      },
      err => { }
    )
  }

}
