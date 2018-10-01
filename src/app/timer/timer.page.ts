import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AlertController, ModalController } from '@ionic/angular';
import { InfoModalComponent } from '../info-modal/info-modal.component';
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: 'timer.page.html',
  styleUrls: ['timer.page.scss']
})
export class TimerPage implements OnInit {

  constructor(
    public tasksService: TasksService,
    public alertController: AlertController,
    public modalController: ModalController,
    public timerService: TimerService,
    // public backgroundMode: BackgroundMode
    ) {}

  ngOnInit() {
    // this.backgroundMode.enable();
    this.tasksService.load();
    this.timerService.initTimer();
  }

  // ngDoCheck() {
  //   this.taskSelected = this.tasksService.isTaskSelected;
  // }

  startTimer() {
    if (this.tasksService.isTaskSelected) {
      this.timerService.startTimer();
    } else {
      this.presentAlert('You have to select a task first');
    }
 }

  async taskFinished() {
    if (this.tasksService.isTaskSelected) {
      const alert = await this.alertController.create({
        header: 'Finish Task',
        message: 'Are you sure',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Confirm Okay');
              this.tasksService.addFinishedTask();
            }
          }
        ]
      });

      await alert.present();
    } else {
      this.presentAlert('You have to select a task first');
    }

  }

  async showInfo() {
    const modal = await this.modalController.create({
      component: InfoModalComponent,
    });
    return await modal.present();
  }

  // async showToast(messageStr) {
  //     const toast = await this.toastController.create({
  //       message: messageStr,
  //       duration: 2000
  //     });
  //     toast.present();
  // }

  async presentAlert(messageStr) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      message: messageStr,
      buttons: ['OK']
    });

    await alert.present();
  }

}
