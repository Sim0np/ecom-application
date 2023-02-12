import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {
  billDetails:any;
  billId!:number;
  constructor(private http:HttpClient, private router:Router, private route: ActivatedRoute) {
    this.billId=route.snapshot.params['billId'];
  }
  ngOnInit(): void {
    this.http.get("http://localhost:8888/BILLING-SERVICE/fullBill/"+this.billId).subscribe({
      next : (data)=>{
        this.billDetails = data;
      },
      error : (err)=>{}
    });
  }
}
