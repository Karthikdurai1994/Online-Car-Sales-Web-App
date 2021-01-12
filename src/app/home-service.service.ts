import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class HomeServiceService {
  resultData: any;
  sidebarVisibilityChange: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) {}

  //Fetch All Data from API
  start() {
    return this.http
      .get("http://ec2-34-237-52-245.compute-1.amazonaws.com:8000/offers")
      .pipe(
        map((data) => {
          this.resultData = this.process(data);
          return this.resultData;
        })
      );
  }

  //Fetch Single Car from API by its ID
  fetchSingleCar(carID) {
    console.log("came", carID);
    let carDetails;
    return this.http
      .get(
        "http://ec2-34-237-52-245.compute-1.amazonaws.com:8000/offers/" + carID
      )
      .pipe(
        map((data) => {
          carDetails = data;
          return carDetails;
        })
      );
  }

  //Sorting Car Data by lowest to highest price
  sortByLowestPrice() {
    let tempData = [...this.resultData].sort((a, b) => {
      if (a.pricing.price > b.pricing.price) {
        return 1;
      } else {
        return -1;
      }
    });

    this.sidebarVisibilityChange.next(tempData);
  }

  //Sort Car Data by highest to lowest price
  sortByHighestPrice() {
    let tempData = [...this.resultData].sort((a, b) => {
      if (a.pricing.price < b.pricing.price) {
        return 1;
      } else {
        return -1;
      }
    });

    this.sidebarVisibilityChange.next(tempData);
  }

  //Fetch Car Data within Min and Max Price
  fetchByPrice(low, high) {
    let fetchedPriceData;
    return this.http
      .get(
        "http://ec2-34-237-52-245.compute-1.amazonaws.com:8000/offers?pricemin=" +
          low +
          "&pricemax=" +
          high
      )
      .pipe(
        map((data) => {
          this.resultData = this.process(data);
          this.sidebarVisibilityChange.next(this.resultData);
          return this.resultData;
        })
      );
  }

  //Ordering Car Data in its original format which comes from backend API
  sortByDefault() {
    this.sidebarVisibilityChange.next(this.resultData);
  }

  //Transorming Car Data coming from backend API
  process(data) {
    let tranformedResult = data.Items;
    return tranformedResult;
  }
}
