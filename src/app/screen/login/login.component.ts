import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,MatIconModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router:Router){}
  hide = true;
  loading = false

  onEditClick() {
    alert('Edit icon clicked!');
    // Add your custom logic here
  }

  onSubmit(){
    this.loading = true;
    setTimeout(()=>{
      this.loading =false
      this.router.navigate(['/employees']);
    },3000)
  }

}
