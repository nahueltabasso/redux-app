import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.models';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresoSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoSubs = this.store.select('ingresosEgresos').subscribe(ingresosEgresos => {
      this.ingresosEgresos = ingresosEgresos.items;
      console.log(this.ingresosEgresos)
    }); 
  }

  ngOnDestroy() {
    this.ingresoSubs.unsubscribe();
  }

  public borrar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then(() => Swal.fire('Borrado', 'Item Borrado', 'success'))
        .catch(err => Swal.fire('Error', err.message, 'error'));
  }

}
