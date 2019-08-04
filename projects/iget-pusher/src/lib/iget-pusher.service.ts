import {Inject, Injectable} from '@angular/core';
import {IGET_PUSHER_CONFIG, IgetPusherConfig} from './iget-pusher.config';
import * as _Pusher from 'pusher-js';
import {Pusher} from 'pusher-js';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Channel} from './channel';

@Injectable({
  providedIn: 'root'
})
export class IgetPusherService {
  private currentClient: Pusher;
  private clientSubject: ReplaySubject<Pusher> = new ReplaySubject<Pusher>(1);

  constructor(
    @Inject(IGET_PUSHER_CONFIG) private config: Observable<IgetPusherConfig>
  ) {
    this.buildClient();
  }

  private buildClient() {
    this.config.subscribe((config: IgetPusherConfig) => {
      if (this.currentClient) {
        console.log('Config updated.');
        this.currentClient.disconnect();
      }


      console.log('Building client');
      this.currentClient = new _Pusher(config.API_KEY, config.config);

      this.clientSubject.next(this.currentClient);
    });
  }

  private getClient(): Observable<Pusher> {
    return this.clientSubject.asObservable();
  }

  /**
   * Subscribe to a pusher channel
   * @param name Name of channel to subscribe
   */
  subscribe(name: string): Observable<Channel> {
    return this.getClient().pipe(
      map((client: Pusher) => {
        return new Channel(client, name);
      })
    );
  }

  /**
   * Unsubscribe to a pusher channel
   * @param name Name of channel to unsubscribe
   */
  unsubscribe(name: string): Observable<void> {
    return this.getClient().pipe(
      map((client: Pusher) => {
        client.unsubscribe(name);
      })
    );
  }
}
