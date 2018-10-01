import { Component, ViewChild, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {
  @ViewChild('canvas') canvas;
  pie = 'pie';
  bar = 'horizontalBar';

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
    if (this.tasksService.finishedTasks.length !== 0) {
      this.tasksService.drawChart(this.canvas, this.pie);
    }
  }

  showPieChart() {
    if (this.tasksService.finishedTasks.length !== 0) {
      this.tasksService.drawChart(this.canvas, this.pie);
    }
  }

  showBarChart() {
    if (this.tasksService.finishedTasks.length !== 0) {
      this.tasksService.drawChart(this.canvas, this.bar);
    }
  }

}
