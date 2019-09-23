import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExploreComponent} from './explore.component';
import {ExploreResolver} from './explore.resolver';

const exploreRoutes: Routes = [
  {
    path: '', resolve: {data: ExploreResolver}, component: ExploreComponent, children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(exploreRoutes)],
  exports: [RouterModule]
})

export class ExploreRoutingModule {
}
