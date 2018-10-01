import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { StatsPageModule } from '../stats/stats.module';
import { TasksPageModule } from '../tasks/tasks.module';
import { TimerPageModule } from '../timer/timer.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TimerPageModule,
    TasksPageModule,
    StatsPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
