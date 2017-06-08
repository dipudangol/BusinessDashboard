import { Injectable } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { Business } from "../business";
import { Catagories } from "../catagories";

@Injectable()
export class FirebaseService {
    businesses: FirebaseListObservable<Business[]>;
    catagories: FirebaseListObservable<Catagories[]>;

    constructor(private _db: AngularFireDatabase) {
    }

    getBusiness(Catagory: string = null) {
        if (Catagory != null) {
            this.businesses = this._db.list('/businesses', {
                query: {
                    orderByChild: "Catagory",
                    equalTo: Catagory
                }
            }) as FirebaseListObservable<Business[]>
        }
        else {

            this.businesses = this._db.list('/businesses') as FirebaseListObservable<Business[]>
        }
        return this.businesses;
    }
    getCatagories() {
        this.catagories = this._db.list('/catagories') as FirebaseListObservable<Catagories[]>
        return this.catagories;
    }
    addBusinesses(newBusiness) {
        return this.businesses.push(newBusiness);
    }
    updateBusiness(key,updatebusines){
        return this.businesses.update(key,updatebusines);
    }
    deleteBusiness(key){
        return this.businesses.remove(key);
    }
}