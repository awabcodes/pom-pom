import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TasksService } from '../services/tasks.service';
import { TaskModel } from '../../models/task-model';
import {List} from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss']
})
export class TasksPage implements OnInit {
  @ViewChild('slidingList') slidingList: List;
  isCompleted = false;
  taskName: string;

  constructor(public alertController: AlertController, public tasksService: TasksService) {}

  ngOnInit() {
    // this.tasksService.load();
  }

  async showOngoingTasks() {
    this.isCompleted = false;
    if (this.tasksService.finishedTasks.length !== 0) {
      await this.slidingList.closeSlidingItems();
    }
  }

  async showCompletedTasks() {
    this.isCompleted = true;
    if (this.tasksService.tasks.length !== 0) {
      await this.slidingList.closeSlidingItems();
    }
  }

  async newTask() {
    const alert = await this.alertController.create({
      header: 'Create Task',
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          placeholder: 'Task Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            if (data.taskName !== '') {
              const task = new TaskModel(data.taskName);
              this.tasksService.addTask(task);
            }
          }
        }
      ]
    });

    alert.onWillDismiss().then(() => {
      this.tasksService.load();
    });

    await alert.present();
  }

  async editTask(task: TaskModel) {
    const alert = await this.alertController.create({
      header: 'Edit Task',
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          placeholder: 'Task Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            this.taskName = data.taskName;
            this.editTaskName(task);
          }
        }
      ]
    });

    alert.onWillDismiss().then(() => {
      this.tasksService.load();
    });

    await alert.present();
  }

  async editTaskName(task: TaskModel) {
    this.tasksService.editTask(task, this.taskName);
    await this.slidingList.closeSlidingItems();
  }

  async deleteTaskConfirm(task: TaskModel) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are You Sure',
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
            this.deleteTask(task);
          }
        }
      ]
    });

    alert.onWillDismiss().then(() => {
      this.tasksService.load();
    });

    await alert.present();
  }

  async deleteTask(task: TaskModel) {
    this.tasksService.removeTask(task);
    await this.slidingList.closeSlidingItems();
  }

}
