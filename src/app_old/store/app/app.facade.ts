import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AppActions from './app.actions';
import { getShowMobileView } from '.';
import { state } from './app.state';

@Injectable()
export class AppFacade {

  showAppView$ = this.store.pipe(select(getShowMobileView));

 setShowMobileView(showMobileView: boolean): void {
    this.store.dispatch(AppActions.showMobileView({ showMobileView }));
  }

  constructor(private store: Store<state>) { }

}
