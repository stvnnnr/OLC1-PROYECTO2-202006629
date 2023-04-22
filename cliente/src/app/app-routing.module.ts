import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AstComponent } from './components/ast/ast.component';
import { ErroresComponent } from './components/errores/errores.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SimbolosComponent } from './components/simbolos/simbolos.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'inicio',
    pathMatch:'full'
  },
  {
    path:'inicio',
    component:PrincipalComponent
  },
  {
    path:'ast',
    component:AstComponent
  },
  {
    path:'errores',
    component: ErroresComponent
  },
  {
    path:'TablaSimbolos',
    component: SimbolosComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
