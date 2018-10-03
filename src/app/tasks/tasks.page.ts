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
  isAdd = false;
  isEdit = false;
  isDelete = false;

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
            this.taskName = data.taskName;
            this.isAdd = true;
          }
        }
      ]
    });

    alert.onDidDismiss().then(() => {
      if (this.taskName !== '' && this.isAdd) {
        this.createTask();
      }
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
            this.isEdit = true;
          }
        }
      ]
    });

    alert.onDidDismiss().then(() => {
      if (this.taskName !== '' && this.isEdit) {
        this.editTaskName(task);
      }
    });

    await alert.present();
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
            this.isDelete = true;
          }
        }
      ]
    });

    alert.onDidDismiss().then(() => {
      if (this.isDelete) {
        this.deleteTask(task);
      }
    });

    await alert.present();
  }

  createTask() {
    const task = new TaskModel(this.taskName);
    this.tasksService.addTask(task);
    this.taskName = '';
    this.isAdd = false;
  }

  async editTaskName(task: TaskModel) {
    this.tasksService.editTask(task, this.taskName);
    this.isEdit = false;
    this.taskName = '';
    await this.slidingList.closeSlidingItems();
  }

  async deleteTask(task: TaskModel) {
    this.tasksService.removeTask(task);
    this.isDelete = false;
    await this.slidingList.closeSlidingItems();
  }

}
