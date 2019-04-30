import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  statuses: string[] = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  forbiddenProjectNames = ['Test'];

  ngOnInit(){
    this.projectForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)],this.asyncInvaolidNames.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Critical')
    })
  }

  onSubmit(){
    console.log(this.projectForm);
    this.projectForm.reset();
  }

  forbiddenNames(control: FormControl):{[s:string]:boolean}{
    if(this.forbiddenProjectNames.indexOf(control.value)!== -1){
      return{'nameIsForbidden':true};
    }
    return null;
  }
  asyncInvaolidNames(control: FormControl): Promise<any>|Observable<any>{
    const promise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='TestProject'){
          resolve({'invalidProjectName':true});
        }else{
          resolve(null);
        }
      },2000);
    })
    return promise;
  }
}
