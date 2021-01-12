import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { HomeServiceService } from "src/app/home-service.service";

@Component({
  selector: "app-car-details",
  templateUrl: "./car-details.page.html",
  styleUrls: ["./car-details.page.scss"],
})
export class CarDetailsPage implements OnInit {
  carID: any;
  carDataImages: any;
  carName: any;
  carFuelType: any;
  carModel: any;
  carMinPrice: any;
  carMaxprice: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private homeServiceObj: HomeServiceService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.carID = param.get("id");
      console.log(this.carID);
      this.homeServiceObj.fetchSingleCar(this.carID).subscribe((data) => {
        this.carDataImages = data.Item.images;
        this.carName = data.Item.car.make;
        this.carFuelType = data.Item.car.fueltype;
        this.carModel = data.Item.car.model;
        this.carMinPrice = data.Item.pricing.startingFee;
        this.carMaxprice = data.Item.pricing.price;
        console.log(
          this.carName,
          this.carFuelType,
          this.carModel,
          this.carMinPrice,
          this.carMaxprice
        );
      });
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }
  onSlideWillChange() {
    console.log("slide will change");
  }

  onSlideDidChange() {
    console.log("slide did change");
  }
}
