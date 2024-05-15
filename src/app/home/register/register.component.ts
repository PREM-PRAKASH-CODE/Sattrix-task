import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    city: new FormControl(''),
  });
  userId?: string;
  selectedUser: any[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    debugger;
    if (this.userId) {
      let userFromStrorage: any[] = [];
      let Storage: any = sessionStorage.getItem('registerData');
      if (Storage) userFromStrorage = JSON.parse(Storage);
      this.selectedUser = userFromStrorage.filter((el) => el.id == this.userId);
      this.registerForm = this.fb.group({
        name: [this.selectedUser[0].name, Validators.required],
        phone: [this.selectedUser[0].phone, [Validators.required]],
        email: [this.selectedUser[0].email, Validators.required],
        city: [this.selectedUser[0].city, Validators.required],
      });
    } else {
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        phone: ['', [Validators.required]],
        email: ['', Validators.required],
        city: ['', Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let userFromStrorage: any[] = [];
      let Storage: any = sessionStorage.getItem('registerData');
      if (Storage) userFromStrorage = JSON.parse(Storage);
      let formData = this.registerForm.value;
      formData.id =
        userFromStrorage[userFromStrorage.length - 1] &&
        userFromStrorage[userFromStrorage.length - 1].id
          ? userFromStrorage[userFromStrorage.length - 1].id + 1
          : 1;
      if (this.userId) {
        for (let i = 0; i < userFromStrorage.length; i++) {
          if (this.userId == userFromStrorage[i].id) {
            userFromStrorage.splice(i, 1);
          }
        }
      }
      userFromStrorage.push(formData);
      sessionStorage.setItem('registerData', JSON.stringify(userFromStrorage));
      this.registerForm.reset();
    }
  }
}
