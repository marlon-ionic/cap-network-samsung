import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/angular/standalone';
import { NetworkService } from '../core/network.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonText, IonToolbar, IonTitle, IonContent, AsyncPipe],
})
export class HomePage {
  private readonly networkService = inject(NetworkService);
  connectionStatus$ = this.networkService.connectionStatus$;
  constructor() {

  }
}
