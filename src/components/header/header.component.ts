import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header',
  imports: [
    MaterialModule,
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  logoUrl: string = 'assets/logo/logo.png';

  loading = true;
  loadedSrc: string | null = null;

  ngOnInit(): void {
    console.log(this.logoUrl);
    const img = new Image();
    img.src = this.logoUrl;
    img.onload = () => {
      this.loadedSrc = this.logoUrl;
      this.loading = false;
    };
    img.onerror = () => {
      this.loadedSrc = null;
      this.loading = false;
    };
  }
}
