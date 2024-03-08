import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/servicios/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;

  constructor(private fb:FormBuilder,
    private validadoresService:ValidadoresService) {
    this.crearFormulario();
    this.cargarDatosFormulario();
    this.cargarListeners();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma=this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(5)]],
      apellido:['',[Validators.required,Validators.minLength(5),this.validadoresService.noHerrera]],
      usuario:['', ,this.validadoresService.existeUsuario], //aquí es asíncrona la validación
      pass1:['',Validators.required],
      pass2:['',Validators.required],
      direccion:this.fb.group({
        distrito:['',Validators.required],
        ciudad:['',Validators.required],

      }),
      pasatiempos:this.fb.array([])
    },{
      //lo hacemos aquí porque dependemos de otro campo (pass2 depende de pass1)
      validators:this.validadoresService.passwordsIguales('pass1','pass2'),
    })
  }

  cargarDatosFormulario(){
    this.forma.reset({
      nombre: 'Fernando',
      apellido: 'Perez',
      correo: 'fernando@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Ontario',
        ciudad: 'Ottawa'
      },
    });
  }

  cargarListeners(){
    this.forma.get('nombre')?.valueChanges.subscribe(valor=>{
      console.log(valor);
      if(valor==='Juan'){
          this.forma.get('apellido')?.setValue('');
      }
    })
  }

  agregarInput(){
    this.pasatiempos.push(this.fb.control('Nuevo elemento',Validators.required))
  }
  borrarInput(index:number){
    this.pasatiempos.removeAt(index);
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre')!.invalid && this.forma.get('nombre')!.touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido')!.invalid && this.forma.get('apellido')!.touched;
  }

  get correoNoValido(){
    return this.forma.get('correo')!.invalid && this.forma.get('correo')!.touched;
  }

  get usuarioNoValido(){
    return this.forma.get('usuario')!.invalid && this.forma.get('usuario')!.touched;
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito')!.invalid && this.forma.get('direccion.distrito')!.touched;
  }

  get ciudadNoValida(){
    return this.forma.get('direccion.ciudad')!.invalid && this.forma.get('direccion.ciudad')!.touched;
  }

  get pass1NoValido(){
    return this.forma.get('pass1')!.invalid && this.forma.get('pass1')!.touched;
  }

  get pass2NoValido(){
    const pass1=this.forma.get('pass1')?.value;
    const pass2=this.forma.get('pass2')?.value;
    return(pass1===pass2)?false:true;
  }


  guardar(){

    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control=>{
        control.markAllAsTouched();
      })
    }
    this.forma.reset({
      nombre:'Demetrio',

    });
  }



}
