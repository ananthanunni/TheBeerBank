import { NgModule } from '@angular/core';
import {MatCardModule, MatIconModule, MatRippleModule, MatDialogModule, MatProgressBarModule} from "@angular/material";

const components:any[] = [MatCardModule, MatIconModule,MatProgressBarModule, MatRippleModule, MatDialogModule];

@NgModule({
  declarations: [],
  imports: components,
  exports:components
})
export class AppMaterialModule { }
