import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Importa tu componente

const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta predeterminada
  { path: '**', redirectTo: '' } // Redirige rutas no válidas a la vista inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
