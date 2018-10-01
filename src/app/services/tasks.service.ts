import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TaskModel } from '../../models/task-model';
import { Chart } from 'chart.js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public tasks: TaskModel[] = [];
  public finishedTasks: TaskModel[] = [];
  public currentTask: TaskModel;
  public index: number;
  public isTaskSelected = false;

  isChartDrwan = false;
  chart: Chart;
  tasksName: string[] = [];
  tasksPomodoros: number[] = [];
  chartColors: string[] = [];

  constructor(public storage: Storage) {}

  load() {

    this.storage.get('tasks').then((tasks) => {

      if (tasks) {
        this.tasks = tasks;
      }

    });

    this.storage.get('finishedTasks').then((finishedTasks) => {

      if (finishedTasks) {
        this.finishedTasks = finishedTasks;
      }

    });

  }

  save() {
    this.storage.set('tasks', this.tasks);
    this.storage.set('finishedTasks', this.finishedTasks);
    // this.populateChartData();
  }

  addTask(task: TaskModel): void {
    this.tasks.push(task);
    this.save();
  }

  updateTotalPomodoros() {
    if (this.isTaskSelected) {
      this.currentTask.totalPomodoros += 1;
      this.save();
    }
  }

  addFinishedTask() {
    this.currentTask.isFinished = true;
    this.finishedTasks.push(this.currentTask);
    this.removeFromArray(this.index, this.tasks);
    this.save();
    this.deSelectTask(this.index);
    this.populateChartData();
  }

  selectTask(task: TaskModel) {
    this.index = this.tasks.indexOf(task);
    this.currentTask = this.tasks[this.index];
    this.isTaskSelected = true;
  }

  editTask(task: TaskModel, name: string): void {
    task.name = name;
    this.save();
  }

  removeTask(task: TaskModel): void {
    let index;
    if (!task.isFinished) {
      index = this.tasks.indexOf(task);
      this.removeFromArray(index, this.tasks);
      this.deSelectTask(index);
    } else {
      index = this.finishedTasks.indexOf(task);
      this.removeFromArray(index, this.finishedTasks);
      this.populateChartData();
    }

    this.save();
  }

  deSelectTask(index) {
    if (index === this.index) {
      this.isTaskSelected = false;
      this.currentTask = null;
    }
  }

  removeFromArray(index, array) {
    if (index > -1) {
      array.splice(index, 1);
      // this.save();
    }
  }

  drawChart(canvas, type) {
    this.chart = new Chart(canvas.nativeElement, {
      type: type,
      data: {
          labels: this.tasksName,
          datasets: [{
              label: 'Pomodoros took by task',
              data: this.tasksPomodoros,
              backgroundColor: this.chartColors,
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    this.isChartDrwan = true;
    this.populateChartData();
  }

  populateChartData() {
    if (this.finishedTasks.length !== 0) {
      if (this.tasksName.length === 0 && this.tasksPomodoros.length === 0 && this.chartColors.length === 0) {
        for (const task of this.finishedTasks) {
          this.tasksName.push(task.name);
          this.tasksPomodoros.push(task.totalPomodoros);
          this.chartColors.push('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
          if (this.isChartDrwan) {
            this.chart.update();
          }
        }
      } else {
        this.emptyChartData();
        this.populateChartData();
      }
    }
  }

  emptyChartData() {
    // for (let task of this.finishedTasks) {
    //   this.tasksName.pop();
    //   this.tasksPomodoros.pop();
    //   this.chartColors.pop();
    // }

    this.finishedTasks.forEach(() => {
      this.tasksName.pop();
      this.tasksPomodoros.pop();
      this.chartColors.pop();
    });
  }

}
