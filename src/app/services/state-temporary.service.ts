import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateTemporaryService {
private _buttonStyle = new BehaviorSubject<string>('primary');
  buttonStyle$ = this._buttonStyle.asObservable();


  toggleButtonStyle(): void {
    const newStyle = this._buttonStyle.value === 'primary' ? 'danger' : 'primary';
    this._buttonStyle.next(newStyle);
  }
}