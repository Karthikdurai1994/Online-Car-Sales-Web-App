import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HomeServiceService } from "./home-service.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  priceMin1 = 0;
  priceMax1 = 1000;
  priceMin2: any;
  priceMax2: any;
  price = { lower: 300, upper: 600 };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private homeServiceObj: HomeServiceService
  ) {
    this.initializeApp();
    this.priceMin2 = this.priceMin1;
    this.priceMax2 = this.priceMax1;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //setting up prices
  setPrice(p) {
    this.priceMin2 = p.lower;
    this.priceMax2 = p.upper;
    this.homeServiceObj
      .fetchByPrice(this.priceMin2, this.priceMax2)
      .subscribe((data) => {
        console.log(data);
      });
  }

  //when user clicks sort button
  onSort(value) {
    console.log(value);
    if (value === "lowest") {
      this.homeServiceObj.sortByLowestPrice();
    } else if (value === "highest") {
      this.homeServiceObj.sortByHighestPrice();
    } else if (value === "clear") {
      this.homeServiceObj.sortByDefault();
    }
  }
}
