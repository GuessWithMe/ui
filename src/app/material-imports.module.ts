import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    MatGridListModule,
    MatInputModule,
    MatIconModule
  ],
})
export class MaterialImportsModule {}
