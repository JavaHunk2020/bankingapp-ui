import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { Constant } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  selectFile:any;
  cphoto:any;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl(''),
    file: new FormControl('', [Validators.required])
   
  });


  ngOnInit(): void {
    let loggedUser=localStorage.getItem("loggedUser") || '';
    let email = JSON.parse(loggedUser).email;
    const uri=`${Constant.BASE_URI}/signups/${email}`;
     this.http.get(uri)
      .subscribe((signup:any) => {
        this.myForm.controls['name'].setValue(signup.name);
        this.myForm.controls['gender'].setValue(signup.gender);
        this.cphoto= 'data:image/png;base64,' + signup.pphoto;
        //pphoto
      });
  }



  constructor(private http:HttpClient,private router:Router,private sanitizer: DomSanitizer) { }

  onFileChange(event:any) :void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectFile=file;

      const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
        // You'll get the base64 string here
        console.log("base64 :", fileReader.result)
        this.cphoto = this.sanitizer.bypassSecurityTrustUrl(fileReader.result+'');
    }

    fileReader.onerror = (error) => {
        console.log("Error reading file :", error)
    }
      
    }
  }

  
  get formControls(){
    return this.myForm.controls;
  }

  updateProfile(){
    //FormData is java script class which is used to send file
    const formData = new FormData();
    formData.append('file', this.selectFile);
    formData.append('name',  this.myForm.get('name')?.value);
    formData.append('gender',  this.myForm.get('gender')?.value);
    //Email I am fetching from local
    let loggedUser=localStorage.getItem("loggedUser") || '';
    formData.append('email',  JSON.parse(loggedUser).email);

    const uri=`${Constant.BASE_URI}/profile`;

    this.http.put(uri, formData)
      .subscribe(res => {
        this.router.navigate(['dashboard']);
      })
      console.log(formData);

  }
}
