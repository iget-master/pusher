import {Component, OnInit} from '@angular/core';
import {IgetPusherService} from '../../projects/iget-pusher/src/lib/iget-pusher.service';
import {Channel} from '../../projects/iget-pusher/src/lib/channel';
import {Bind} from '../../projects/iget-pusher/src/lib/bind';
import {ApiKeyService} from './api-key.service';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages: Array<string> = [];
  apiKey: string = 'c49604de260bbb80a477';
  channelName = 'my-channel';
  eventName = 'my-event';

  private subscription: Subscription;

  constructor(
    private pusher: IgetPusherService,
    public apiKeyService: ApiKeyService,
  ) {
  }

  ngOnInit(): void {

  }

  subscribe(channelName, eventName) {
    this.unsubscribe();

    this.subscription = this.pusher.subscribe(channelName).pipe(
      switchMap((channel: Channel) => {
        console.log('channel', channel);
        return channel.bind(eventName);
      })
    ).subscribe((event: any) => {
      this.messages.push(JSON.stringify(event));
    });
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
