import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FirestoreService } from '../../services/firestore.service';
import { KitchenPipe } from '../pipes/kitchen.pipe';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  orders: any [] =[];

  runningTime:any = 0;
  timeInterval:any;
  startTime:any;
  
  orderStatusChange:string = "Nuevo";

  _id:string = '';
  name:string = '';

 // today = new Date(2019, 1,1);
 today: any = new Date()

  constructor(
   
    private firestoreService: FirestoreService 
  ) { }

  ngOnInit(): void {
    this.getOrder();
    setTimeout(() => {this.showTime()}, 1);
 
  }

  showTime (){

  }

  getOrder(){
    this.firestoreService.getOrder().subscribe(data => {
      this.orders = [];
      data.forEach((item) => {
        this.orders.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        });
      });
      console.log(this.orders)
      
    })
  }
 
}
