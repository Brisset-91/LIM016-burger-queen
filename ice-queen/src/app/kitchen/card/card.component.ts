import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  time:any= "00:00";

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
    // private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
  }


  orderStatus($event:any){
      
    console.log($event.target.value);
    console.log($event.target.name);

    if($event.target.value == 'acepted'){
      console.log('acepted')
      this.startTime = Date.now();
      this.start()
      //this.firestoreService.updateStatus($event.target.value, this.startTime)
      this.orderStatusChange = "Acepted"
      //* Guardar startTime en FS
    } else if ($event.target.value == 'ready'){
      console.log('se pausa el cronómetro');
      this.pause()
      //this.firestoreService.updateStatus($event.target.value, this.startTime)
      this.orderStatusChange = "Ready to delivere."
      //? Guardar date en documento de la colección
    } 
  }

  start(){
    const btn = document.querySelectorAll('select');
    console.log(btn)
    console.log(this.startTime);
    this.timeInterval = setInterval(() => {
      this.runningTime = Date.now() - this.startTime;
      this.time = this.calculateTime(this.runningTime);
    }, 1000)
  }

  calculateTime(x:any){
    const totalSeconds = Math.floor(x / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);

    const displaySeconds = (totalSeconds % 60).toString().padStart(2, "0");
    const displayMinutes = totalMinutes.toString().padStart(2, "0")

    return `${displayMinutes}:${displaySeconds}`
  }

  pause(){
    clearInterval(this.timeInterval)
  }


}
