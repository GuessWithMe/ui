import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class MaterialImportsModule {}
