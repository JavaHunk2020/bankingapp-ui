import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/environments/environment';
import { CrediCardType } from '../model/credit.cardtype.model';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {
  imageData:any[]=[];
  name:string='';
  email:string='';
  showCardDetail:boolean=false;
  creditCardDetails:CrediCardType={} as CrediCardType;  
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

  public showDetails(cardName : string){
    //METHOD = GET
    let crediCardUrl=`${Constant.BASE_URI}/creditcards/cdetails/${cardName}`;
    this.http.get<CrediCardType>(crediCardUrl).subscribe((cardDetail:CrediCardType)=>{
      this.creditCardDetails=cardDetail;
      this.showCardDetail=true;
    });
  }

}
