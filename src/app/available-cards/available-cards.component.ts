import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/environments/environment';
import { CrediCardType } from '../model/credit.cardtype.model';

@Component({
  selector: 'app-available-cards',
  templateUrl: './available-cards.component.html',
  styleUrls: ['./available-cards.component.scss']
})
export class AvailableCardsComponent implements OnInit {

  data:CrediCardType[]={} as Array<CrediCardType>;

   showData:boolean = false;

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<CrediCardType[]>(`${Constant.BASE_URI}/creditcards/available`).subscribe((data:CrediCardType[])=>{
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
