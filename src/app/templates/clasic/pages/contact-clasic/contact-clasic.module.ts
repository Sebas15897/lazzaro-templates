import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { ContactClasicRoutingModule } from './contact-clasic-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactClasicRoutingModule, ReactiveFormsModule],
})

export class ContactClasicModule {}
