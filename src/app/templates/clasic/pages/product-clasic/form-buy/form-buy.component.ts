import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormHeaderComponent } from '../../../../../core/components/form-header/form-header.component';

@Component({
  selector: 'app-form-buy',
  templateUrl: './form-buy.component.html',
  styleUrls: ['./form-buy.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent]
})

export class FormBuyComponent {

}
