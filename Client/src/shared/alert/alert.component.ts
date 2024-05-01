import {Component, effect} from '@angular/core';
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  type: string = 'success';
  msg: string = '';
  isActive: boolean = false;

  constructor(as: AlertService) {
    effect(() => {
      this.isActive = as.alertStatus()
      this.type = as.alertType()
      this.msg = as.alertMessage()
    });
  }

}
