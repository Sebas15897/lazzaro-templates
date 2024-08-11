import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransparencyComponent } from './transparency.component';

@NgModule({
  declarations: [TransparencyComponent],
  imports: [
    CommonModule
  ],
  exports: [TransparencyComponent]
})

export class TransparencyModule { }
