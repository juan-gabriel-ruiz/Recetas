 import { Component } from '@angular/core'; 
 import { HttpClient, HttpClientModule } from '@angular/common/http';
 import { FormsModule } from '@angular/forms';
 import { CommonModule } from '@angular/common';

 @Component({
   selector: 'app-buscador',
   standalone: true,
   imports: [CommonModule, FormsModule, HttpClientModule],
   templateUrl: './buscador.component.html',
   styleUrls: ['./buscador.component.css']
 })
 export class BuscadorComponent {
   ingredientes: string = '';
   receta: string = '';
   loading: boolean = false; // <--- Agregado para manejar "Generando receta..."

   constructor(private http: HttpClient) {}

   buscarReceta() {
     const nombrePlato = this.ingredientes?.trim(); // Eliminamos espacios vacíos

     if (!nombrePlato) {
       this.receta = 'Por favor, ingresá ingredientes validos.';
       return;
     }

     this.loading = true; // Comienza el loading

     // Cambia la URL del backend
     this.http.post<any>('https://xlv8cscyy3.execute-api.us-east-1.amazonaws.com/prod/generar-receta', { nombrePlato })

       .subscribe({
         next: (response) => {
           this.receta = response.receta;
           this.loading = false; // Finaliza el loading
         },
         error: (error) => {
           console.error('Error al buscar la receta:', error);
           this.receta = 'Error al generar receta.';
           this.loading = false; // Finaliza el loading también en caso de error
         }
       });
   }
 }


//  import { Component } from '@angular/core';
//  import { HttpClient, HttpClientModule } from '@angular/common/http';
//  import { FormsModule } from '@angular/forms';
//  import { CommonModule } from '@angular/common';

//  @Component({
//   selector: 'app-buscador',
//    standalone: true,
//    imports: [CommonModule, FormsModule, HttpClientModule],
//    templateUrl: './buscador.component.html',
//    styleUrls: ['./buscador.component.css']
//  })
//  export class BuscadorComponent {
//    ingredientes: string = '';
//    receta: string = '';
//    loading: boolean = false; // <--- Agregado para manejar "Generando receta..."

//    constructor(private http: HttpClient) {}

//    buscarReceta() {
//      const nombrePlato = this.ingredientes?.trim(); // Eliminamos espacios vacíos

//      if (!nombrePlato) {
//       this.receta = 'Por favor, ingresá ingredientes validos.';
//        return;
//      }

//      this.loading = true; // Comienza el loading

//      this.http.post<any>('http://localhost:3000/generar-receta', { nombrePlato })
//        .subscribe({
//          next: (response) => {
//            this.receta = response.receta;
//            this.loading = false; // Finaliza el loading
//          },
//          error: (error) => {
//           console.error('Error al buscar la receta:', error);
//           this.receta = 'Error al generar receta.';
//            this.loading = false; // Finaliza el loading también en caso de error
//         }
//        });
//    }
//  }