import { NgModule } from '@angular/core';
import {MatCardModule, MatIconModule, MatRippleModule, MatDialogModule, MatProgressBarModule, MatButtonModule} from "@angular/material";

const components:any[] = [MatCardModule, MatIconModule,MatProgressBarModule, MatRippleModule, MatDialogModule,MatButtonModule];

@NgModule({
  declarations: [],
  imports: components,
  exports:components
})
export class AppMaterialModule { }
