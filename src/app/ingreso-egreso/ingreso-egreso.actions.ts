import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.models';

export const setItems = createAction(
    '[Ingreso Egreso] Set Item',
    props<{items: IngresoEgreso[]}>()
);

export const unSetItems = createAction('[Ingreso Egreso] Un Set Item');