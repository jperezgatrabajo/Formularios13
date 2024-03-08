import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../servicios/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  //[] sirve para recibir y () para emitir

  usuario={
    Nombre:"jaun",
    Apellido:"",
    Correo:"demetrio@hotmail.es",
    Capital:'',
    Genero:"M"
  }

  paises:any[]=[];

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises=>{
        this.paises=paises;
        this.paises.unshift({ //añadimos en la primera posición del array
          nombre:'[Seleccione un país]',
          capital:''
        })
      })
  }

  guardar(forma:NgForm){
    console.log(forma)

    if(forma.invalid){
      Object.values(forma.controls).forEach(control=>{
        control.markAllAsTouched();
      })
    }

  }

}
