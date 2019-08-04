import { Config } from 'pusher-js';
import {InjectionToken} from '@angular/core';
import {ReplaySubject} from 'rxjs';

export const IGET_PUSHER_CONFIG = new InjectionToken<ReplaySubject<IgetPusherConfig>>('iget.pusher.config');

export interface IgetPusherConfig {
  API_KEY: string;
  config: Config;
}
