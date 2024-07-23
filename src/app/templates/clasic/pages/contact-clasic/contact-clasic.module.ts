import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { ContactClasicRoutingModule } from './contact-clasic-routing.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactClasicRoutingModule],
})

export class ContactClasicModule {}
