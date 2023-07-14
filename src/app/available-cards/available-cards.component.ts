import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/environments/environment';
import { CrediCardType } from '../model/credit.cardtype.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-cards',
  templateUrl: './available-cards.component.html',
  styleUrls: ['./available-cards.component.scss']
})
export class AvailableCardsComponent implements OnInit {



  data:CrediCardType[]={} as Array<CrediCardType>;

   showData:boolean = false;

  constructor(private router:Router,private httpClient : HttpClient) { }

  ngOnInit(): void {
    let loggedUser=localStorage.getItem('loggedUser');
    if(loggedUser){
      let userDetails = JSON.parse(loggedUser);
      this.httpClient.get<CrediCardType[]>(`${Constant.BASE_URI}/creditcards/available/${userDetails.cid}`).subscribe((data:CrediCardType[])=>{
        console.log(data)
        this.data = data;
        this.data=this.data.map(s=>{
          s.image=`${Constant.BASE_URI}/creditcards/image?ctid=${s.id}`;
          return s;
        })
        this.showData=true;
    });
    }  
   
  }

  applyCreditCard(crediCardType: CrediCardType) {
    // this.creditCard.name=params['name'];
    // this.creditCard.email=params['email'];
    // this.creditCard.sid=params['sid'];
    let loggedUser=localStorage.getItem('loggedUser');
    if(loggedUser){
      let userDetails = JSON.parse(loggedUser);
      this.router.navigate(['applyCreditCard'],{"queryParams":{name:userDetails.name,cid:userDetails.cid,email:userDetails.email,cname:crediCardType.name,ctype:crediCardType.type}});     
    }
    
  }
}
