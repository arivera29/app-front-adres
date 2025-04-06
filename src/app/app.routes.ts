import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Importa tu componente
import { DashboardComponent } from './dashboard/dashboard.component';
export const routes: Routes = [
    {path: '', component: LoginComponent}, // Ruta predeterminada
    {path: 'login', component: LoginComponent}, // Ruta para el login
    {path: 'dashboard', component: DashboardComponent}, // Ruta para el dashboard
    {path: '**', redirectTo: ''} // Redirige rutas no válidas a la vista inicial

];
