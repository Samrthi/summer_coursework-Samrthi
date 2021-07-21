import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public error$: Subject<string> = new Subject<string>();

  constructor() {}
}