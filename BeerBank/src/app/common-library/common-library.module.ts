import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollSurfaceComponent } from './components/scroll-surface/scroll-surface.component';

@NgModule({
  declarations: [HeaderComponent, ScrollSurfaceComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [HeaderComponent, ScrollSurfaceComponent]
})
export class CommonLibraryModule { }
