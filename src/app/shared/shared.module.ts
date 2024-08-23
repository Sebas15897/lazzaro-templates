import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsModule } from './terms-conditions/terms-conditions.module';
import { TransparencyModule } from './transparency/transparency.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TermsConditionsModule,
    TransparencyModule,
  ],
})

export class SharedModule {}
