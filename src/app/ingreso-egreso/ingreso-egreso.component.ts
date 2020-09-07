import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;
  loadingSubs: Subscription;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui').subscribe(data => {
      this.loading = data.isLoading;
    });

    this.formulario = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  public guardar() {
    if (this.formulario.invalid) {
      return ;
    }

    this.store.dispatch(isLoading());
    
    const { descripcion, monto } = this.formulario.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      Swal.fire('Registro Creado', descripcion, 'success');
      this.store.dispatch(stopLoading());
      this.formulario.reset();
    }).catch( err => {
      this.store.dispatch(stopLoading());
      Swal.fire('Error', err.message, 'error');
    });
  }

}
