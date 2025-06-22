import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatButton } from "@angular/material/button";

const MATERIAL = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatButton
];

@NgModule({
  imports:  MATERIAL,
  exports:  MATERIAL,
})
export class MaterialModule {}