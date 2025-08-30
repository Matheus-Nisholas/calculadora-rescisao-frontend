import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { CalculadoraService } from './calculadora.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatCardModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.css']
})
export class CalculadoraComponent implements OnInit {

  public calculoRequest = {
    tipoRescisao: 'SEM_JUSTA_CAUSA',
    salarioMensal: null,
    dataAdmissao: null,
    dataDesligamento: null,
    avisoIndenizado: false,
    feriasVencidasDias: 0,
    saldoFgtsDepositado: null,
    numeroDependentes: 0,
    // NOVO: Adicionado campo para o nome do empregado
    nomeEmpregado: '' 
  };

  public resultado: any | null = null;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void { }

  public calcular(): void {
    this.calculadoraService.calcular(this.calculoRequest).subscribe({
      next: (response) => { this.resultado = response; },
      error: (err) => { console.error('Erro ao calcular rescisão:', err); }
    });
  }
}