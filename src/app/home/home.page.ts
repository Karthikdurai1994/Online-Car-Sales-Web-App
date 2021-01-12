import { Component } from "@angular/core";
import { HomeServiceService } from "../home-service.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  carData;
  constructor(private homeServiceObj: HomeServiceService) {}
  ngOnInit() {
    this.homeServiceObj.start().subscribe((data) => {
      this.carData = data;
    });
  }
  ionViewDidEnter() {
    this.carData = this.homeServiceObj.resultData;
    this.homeServiceObj.sidebarVisibilityChange.subscribe((data) => {
      this.carData = data;
    });
  }
}
