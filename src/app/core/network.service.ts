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

  public async initialize() {
    console.log('NetworkService initializing');

    //Get the initial network status
    const status = await Network.getStatus();
    this.connectionStatusSubject.next(status);

    //Add a listener to listen for network status changes
    await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.zone.run(() => this.connectionStatusSubject.next(status));
    });
  }


}
