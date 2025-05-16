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
  recetaSeparada1: string = '';
  recetaSeparada2: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  buscarReceta() {
    const nombrePlato = this.ingredientes?.trim();

    if (!nombrePlato) {
      this.recetaSeparada1 = 'Por favor, ingresá ingredientes válidos.';
      this.recetaSeparada2 = '';
      this.receta = '';
      return;
    }

    this.loading = true;
    this.receta = '';
    this.recetaSeparada1 = '';
    this.recetaSeparada2 = '';

    // 👇 Endpoint de producción
    this.http.post<any>('http://recetasback-env.eba-zjb2dfi3.us-east-1.elasticbeanstalk.com/generar-receta', { nombrePlato })
      .subscribe({
        next: (response) => {
          console.log('Respuesta de la API:', response);
          const textoLimpio = response.receta.replace(/\*/g, '').trim();
          this.receta = textoLimpio;

          const partes = textoLimpio.split(/Receta\s*2\s*[:\-]/i);
          if (partes.length === 2) {
            this.recetaSeparada1 = partes[0].trim();
            this.recetaSeparada2 = 'Receta 2: ' + partes[1].trim();
          } else {
            this.recetaSeparada1 = textoLimpio;
            this.recetaSeparada2 = '';
          }

          this.loading = false;
        },
        error: (error) => {
          console.error('Error al buscar la receta:', error);
          this.recetaSeparada1 = 'Error al generar receta.';
          this.recetaSeparada2 = '';
          this.receta = '';
          this.loading = false;
        }
      });
  }
}

// import { Component } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-buscador',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './buscador.component.html',
//   styleUrls: ['./buscador.component.css']
// })
// export class BuscadorComponent {
//   ingredientes: string = '';
//   receta: string = '';
//   recetaSeparada1: string = '';
//   recetaSeparada2: string = '';
//   loading: boolean = false;

//   constructor(private http: HttpClient) {}

//   buscarReceta() {
//     const nombrePlato = this.ingredientes?.trim();

//     if (!nombrePlato) {
//       this.recetaSeparada1 = 'Por favor, ingresá ingredientes válidos.';
//       this.recetaSeparada2 = '';
//       this.receta = '';
//       return;
//     }

//     this.loading = true;
//     this.receta = '';
//     this.recetaSeparada1 = '';
//     this.recetaSeparada2 = '';

//     this.http.post<any>('http://localhost:3000/generar-receta', { nombrePlato })
//       .subscribe({
//         next: (response) => {
//           console.log('Respuesta de la API:', response); // 👈 Depuración
//           const textoLimpio = response.receta.replace(/\*/g, '').trim();
//           this.receta = textoLimpio;
//           this.loading = false;

//           const partes = textoLimpio.split(/Receta\s*2\s*[:\-]/i);
//           if (partes.length === 2) {
//             this.recetaSeparada1 = partes[0].trim();
//             this.recetaSeparada2 = 'Receta 2: ' + partes[1].trim();
//           } else {
//             this.recetaSeparada1 = textoLimpio;
//             this.recetaSeparada2 = '';
//           }
//         },
//         error: (error) => {
//           console.error('Error al buscar la receta:', error);
//           this.recetaSeparada1 = 'Error al generar receta.';
//           this.recetaSeparada2 = '';
//           this.receta = '';
//           this.loading = false;
//         }
//       });
//   }
// }
