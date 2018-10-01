import { Component } from '@angular/core';

import { Platform, Icon } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SmartAudioService } from './services/smart-audio.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public smartAudio: SmartAudioService,
    public backgroundMode: BackgroundMode
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.statusBar.hide();
      this.splashScreen.hide();

      this.smartAudio.preload('ring', 'assets/audio/toaster-oven-ding.wav');

      this.backgroundMode.setDefaults({
        title: 'Pom Pom',
        text: 'Timer is Running',
        icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap
      });

    });
  }
}
