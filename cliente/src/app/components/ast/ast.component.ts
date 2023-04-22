import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent implements OnInit {
  public bandera: boolean | undefined;

  constructor(private servidor: BackendService) {
    this.servidor.AST().subscribe(
      res => {
        let js = JSON.parse(JSON.stringify(res))
        if (js.ast) {
          this.bandera = true;
        } else {
          this.bandera = false;
        }
      },
      err => {
        this.bandera = false;
      }
    );
  }

  ngOnInit(): void {
  }

}
