import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/environments/environment';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {
  imageData:any[]=[];
  name:string='';
  email:string='';
  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.email=data['email'];
      this.name=data['name'];
      let crediCardUrl=`${Constant.BASE_URI}/creditcards/all/${this.email}`;
      this.http.get<any[]>(crediCardUrl).subscribe((imageData:any[])=>{
          this.imageData=imageData;
      });
    });  
    let crediCardUrl=`${Constant.BASE_URI}/creditcards/all`;

    
  }

}
