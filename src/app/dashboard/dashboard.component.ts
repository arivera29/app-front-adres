import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdquisicionesService } from '../services/adquisiciones.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  formGroup!: FormGroup; // Formulario reactivo
  campos: string[] = ['id', 'unidad_administrativa', 'tipo_bien', 'presupuesto', 'cantidad', 'valor_total', 'proveedor', 'documentacion', 'fecha_adquisicion', 'activo'];
  labels: string[] = ['ID', 'Unidad', 'Tipo de Bien', 'Presupuesto', 'Cantidad', 'Valor Total', 'Proveedor', 'Documentación', 'Fecha de Adquisición', 'Activo'];
  items: any[] = []; // Lista completa de datos
  paginatedItems: any[] = []; // Datos paginados
  formData: any = {}; // Datos del formulario

  // Variables para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;

  searchTerm: string = ''; // Término de búsqueda

  constructor(
    private fb : FormBuilder,
    private adquisicionesService: AdquisicionesService, 
    private authService: AuthService, 
    private router: Router) {}

  ngOnInit(): void {
    this.cargar();
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      unidad_administrativa: ['', Validators.required],
      tipo_bien: ['', Validators.required],
      presupuesto: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      valor_total: ['', [Validators.required, Validators.min(0)]],
      proveedor: ['', Validators.required],
      documentacion: ['', Validators.required],
      fecha_adquisicion: ['', Validators.required],
      activo: [true, Validators.required]
    });
  }

  cargar() {
    // Llama al servicio para obtener los datos
    this.adquisicionesService.getAll().subscribe(data => {
      this.items = data;
      this.updatePaginatedItems();
    });
  }

  guardar() {
    
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      return;
    }

    const formData = this.formGroup.value;

    if (formData.id) {
      // Actualizar
      formData.activo = formData.activo === 'true' || formData.activo === true;
      this.adquisicionesService.update(formData).subscribe(() => {
        this.cargar(); // Recargar los datos después de actualizar
        this.formGroup.reset(); // Limpiar el formulario
      });
    } else {
      // Crear nuevo
      formData.activo = formData.activo === 'true' || formData.activo === true;
      this.adquisicionesService.create(formData).subscribe(() => {
        this.cargar(); // Recargar los datos después de crear
        this.formGroup.reset(); // Limpiar el formulario
      });
    }
  }

  editar(item: any) {
    const fecha = new Date(item.fecha_adquisicion);
    item.fecha_adquisicion = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
    this.formGroup.patchValue(item); // Rellena el formulario con los datos del elemento seleccionado
  }

  eliminar(id: number) {
    this.adquisicionesService.delete(id).subscribe(() => {
      this.cargar(); // Recargar los datos después de eliminar
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Métodos para la paginación
  updatePaginatedItems() {
    const filteredItems = this.getFilteredItems();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = filteredItems.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }
  
  // Método para obtener el total de páginas
  getTotalPages(): number[] {
    return Array(Math.ceil(this.items.length / this.itemsPerPage)).fill(0).map((_, i) => i + 1);
  }

  // Método para filtrar los datos
  getFilteredItems(): any[] {
    if (!this.searchTerm) {
      return this.items; // Si no hay término de búsqueda, devuelve todos los elementos
    }
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    
    // Filtra los elementos que contienen el término de búsqueda en cualquiera de sus propiedades
    return this.items.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value?.toLowerCase().includes(lowerSearchTerm)
      )
    );
  }
}
