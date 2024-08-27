import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactModernRoutingModule } from './contact-modern-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactModernComponent } from './contact-modern.component';

@NgModule({
  declarations: [ContactModernComponent],
  imports: [CommonModule, ContactModernRoutingModule, ReactiveFormsModule],
})

export class ContactModernModule {}
