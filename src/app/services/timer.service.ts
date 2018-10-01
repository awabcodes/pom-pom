import { Injectable } from '@angular/core';
import { TasksService } from './tasks.service';
import { SmartAudioService } from './smart-audio.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  pomodoroTime = 3;
  shortBreakTime = 1;
  LongBreakTime = 2;

  breakCounter = 1;
  isPom = false;

  timeInSeconds: number;
  time: number;
  remainingTime: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;

  constructor(
    public tasksService: TasksService,
    public smartAudio: SmartAudioService,
    public backgroundMode: BackgroundMode
    // public localNotifications: LocalNotifications
  ) {
    backgroundMode.enable();
  }

  initTimer() {
    this.BreakOrPom();

    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
 }

 BreakOrPom() {
   if (this.breakCounter === 2 || this.breakCounter === 4 || this.breakCounter === 6) {
     this.timeInSeconds = this.shortBreakTime;
     this.isPom = false;
   } else if (this.breakCounter === 8) {
     this.timeInSeconds = this.LongBreakTime;
     this.isPom = false;
     this.breakCounter = 0;
   } else {
     this.timeInSeconds = this.pomodoroTime;
     this.isPom = true;
   }
 }

 startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
 }

 pauseTimer() {
    this.runTimer = false;
 }

 resumeTimer() {
    this.startTimer();
 }

 timerTick() {
   setTimeout(() => {
     if (!this.runTimer) { return; }
     this.remainingTime--;
     this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
     if (this.remainingTime > 0) {
       this.timerTick();
     } else {
       if (this.isPom) {
        this.tasksService.updateTotalPomodoros();
       }

       this.smartAudio.play('ring');
       this.hasFinished = true;
       this.breakCounter++;
      //  this.showNotification();
      this.initTimer();
      this.backgroundMode.moveToForeground();
      }
   }, 1000);
 }

 getSecondsAsDigitalClock(inputSeconds: number) {
   const sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
   const hours = Math.floor(sec_num / 3600);
   const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
   const seconds = sec_num - (hours * 3600) - (minutes * 60);
   let hoursString = '';
   let minutesString = '';
   let secondsString = '';
   hoursString = (hours < 10) ? '0' + hours : hours.toString();
   minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
   secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
   return minutesString + ':' + secondsString;
 }

//  showNotification() {
//     this.localNotifications.schedule({
//       text: 'Timer Complete',
//       trigger: {at: new Date(new Date().getTime())},
//       led: 'FF0000',
//       sound: null
//     });
//   }

}
