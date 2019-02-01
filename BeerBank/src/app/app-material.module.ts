import { NgModule } from '@angular/core';
import {MatCardModule, MatIconModule, MatProgressSpinnerModule, MatRippleModule, MatDialogModule} from "@angular/material";

const components:any[] = [MatCardModule, MatIconModule,MatProgressSpinnerModule, MatRippleModule, MatDialogModule];

@NgModule({
  declarations: [],
  imports: components,
  exports:components
})
export class AppMaterialModule { }
