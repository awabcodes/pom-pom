import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { TimerPage } from '../timer/timer.page';
import { TasksPage } from '../tasks/tasks.page';
import { StatsPage } from '../stats/stats.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(timer:timer)',
        pathMatch: 'full',
      },
      {
        path: 'timer',
        outlet: 'timer',
        component: TimerPage
      },
      {
        path: 'tasks',
        outlet: 'tasks',
        component: TasksPage
      },
      {
        path: 'stats',
        outlet: 'stats',
        component: StatsPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(timer:timer)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
