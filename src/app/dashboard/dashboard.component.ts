import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresoEgresoSub: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(user => {
        // otra forma es con desectructurando el observable user => {user}
        this.ingresoEgresoSub = this.ingresoEgresoService.initIngresosEgresosListener(user.user.uid).subscribe((data: IngresoEgreso[]) => {
          this.store.dispatch(setItems({ items: data }))
        });
      });
  }

  ngOnDestroy() {
    this.ingresoEgresoSub.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
