import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertMessage: WritableSignal<string> = signal('');
  alertType: WritableSignal<string> = signal('');
  alertStatus: WritableSignal<boolean> = signal(false);

  constructor() {
  }

  showAlert(type: string, message: string): void {
    this.alertStatus.set(true)
    this.alertMessage.set(message);
    this.alertType.set(type)

    setTimeout(() => {
      this.alertStatus.set(false)
    }, 5000)
  }
}
