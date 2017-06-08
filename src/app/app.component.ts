import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from "./services/firebase.services";
import { Business } from "./business";
import { Catagories } from "./catagories";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit {
  business: Business[];
  catagories: Catagories[];
  appState: string;
  activeKey: string;
  activecompany: string;
  activecategory: string;
  activephone: number;
  activecity: string;
  activezipcode: number;
  activedescription: string;

  items: FirebaseListObservable<any[]>;
  constructor(private _firebaseservice: FirebaseService) {
  }

  ngOnInit() {
    this._firebaseservice.getBusiness().subscribe(businesses => {
      this.business = businesses;
    })
    this._firebaseservice.getCatagories().subscribe(catagories => {
      this.catagories = catagories;
    })

  }
  changeState(state, key) {
    console.log("changing state to " + state + "-key " + key);
    if (key) {
      this.activeKey = key;
    }
    this.appState = state;
  }

  filtercatagory(catagory) {
    this._firebaseservice.getBusiness(catagory).subscribe(catagories => {
      this.business = catagories;
    })
  }

  addBusiness(company_value: string,
    category_value: string,
    phone_value: number,
    city_value: string,
    zipcode_value: number,
    description_value: string) {
    var created_at = new Date().toString();
    var newBusiness = {
      company: company_value,
      Catagory: category_value,
      phone: phone_value,
      city: city_value,
      zipcode: zipcode_value,
      description: description_value,
      created_at: created_at
    }
    console.log(newBusiness);
    this._firebaseservice.addBusinesses(newBusiness);
    this.changeState('default', 12);
  }


  showEdit(business) {
    this.changeState('edit', business.$key);
    this.activecompany = business.company;
    this.activecity = business.city;
    this.activecategory = business.Catagory;
    this.activedescription = business.description;
    this.activephone = business.phone;
    this.activezipcode = business.zipcode;
  }

  updateBusiness() {
    var updbusiness = {
      company: this.activecompany,
      city: this.activecity,
      Catagory: this.activecategory,
      description: this.activedescription,
      phone: this.activephone,
      zipcode: this.activezipcode
    }
    this._firebaseservice.updateBusiness(this.activeKey, updbusiness)
    this.changeState('default', 12);
  }

  deleteData(key) {
    this._firebaseservice.deleteBusiness(key);
    this.changeState('default', 12);

  }
}
