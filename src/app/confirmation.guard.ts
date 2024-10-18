// confirmation.guard.ts

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor() {}

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    if (component.canDeactivate) {
      return component.canDeactivate();
    }
    return true;
  }
}
