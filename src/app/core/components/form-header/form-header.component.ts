import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
})

export class FormHeaderComponent {
  @Input() title: string = 'Titulo';
  @Output() close = new EventEmitter<boolean>();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.addMaterialSvg();
  }

  addMaterialSvg() {
    this.matIconRegistry.addSvgIcon(
      'icon-cancel',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/xmark-solid.svg'
      )
    );
  }

  closeModal() {
    this.close.emit(true);
  }
}
