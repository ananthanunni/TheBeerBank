import { NgModule } from '@angular/core';
import {MatCardModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule} from "@angular/material";

const components:any[] = [MatCardModule, MatIconModule,MatProgressSpinnerModule, MatRippleModule];

@NgModule({
  declarations: [],
  imports: components,
  exports:components
})
export class AppMaterialModule { }
