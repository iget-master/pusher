import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  private subject: ReplaySubject<string> = new ReplaySubject<string>();

  constructor() { }

  get() {
    return this.subject.asObservable();
  }

  set(apiKey: string) {
    this.subject.next(apiKey);
  }
}
