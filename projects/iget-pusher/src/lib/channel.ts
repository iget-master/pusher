import {Pusher, Channel as _Channel} from 'pusher-js';
import {Observable} from 'rxjs';

export class Channel {
  private channel: _Channel;

  constructor(
    private client: Pusher,
    private name: string
  ) {
    this.channel = client.subscribe(name);
  }

  /**
   * Bind to events with given eventName on this channel
   * @param eventName Name of events to bind for
   */
  bind<T>(eventName: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      const handler = (event) => {
        subscriber.next(event);
      };
      this.channel.bind(eventName, handler);

      return () => {
        this.channel.unbind(eventName, handler);
      };
    });
  }

  /**
   * Bind to all events on this channel
   */
  bindGlobal<T>(): Observable<T> {
    return new Observable<T>((subscriber) => {
      const handler = (event) => {
        subscriber.next(event);
      };
      this.channel.bind_global(handler);

      return () => {
        this.channel.unbind_global(handler);
      };
    });
  }
}
