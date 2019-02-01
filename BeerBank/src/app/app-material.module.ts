import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const components:any[] = [MatButtonModule];

components.splice(0, 0, BrowserAnimationsModule);

@NgModule({
  declarations: [],
  imports: components,
  exports:components
})
export class AppMaterialModule { }
