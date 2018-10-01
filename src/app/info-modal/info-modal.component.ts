import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  constructor(public inAppBrowser: InAppBrowser, public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  redirect() {
    this.inAppBrowser.create("https://en.wikipedia.org/wiki/Pomodoro_Technique");
  }

  closeInfo() {
    this.modalCtrl.dismiss();
  }
}
