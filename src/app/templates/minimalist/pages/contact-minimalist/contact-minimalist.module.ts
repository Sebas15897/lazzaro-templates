import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { ContactMinimalistRoutingModule } from './contact-minimalist-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactMinimalistRoutingModule, ReactiveFormsModule],
})

export class ContactMinimalistModule {}
