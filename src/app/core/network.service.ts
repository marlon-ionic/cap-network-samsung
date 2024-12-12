import { inject, Injectable, NgZone } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private readonly zone = inject(NgZone);
  private readonly connectionStatusSubject = new ReplaySubject<ConnectionStatus>(1);
  public readonly connectionStatus$ = this.connectionStatusSubject.asObservable();

  public async initalize() {
    console.log('NetworkService initializing');
    await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.zone.run(() => this.connectionStatusSubject.next(status));
    });
  }


}
