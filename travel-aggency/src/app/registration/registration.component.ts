import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from '../model/app-models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../_service/autentication.service';
import {AlertService} from '../_service/alert.service';
import {UserService} from '../_service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  loginForm: FormGroup;
  loadingLogin = false;
  submittedLogin = false;

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['./tour-list']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  get r() {
    return this.registerForm.controls;
  }

  onSubmitLogin() {
    this.submittedLogin = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.login(this.f.email.value, this.f.password.value);

  }

  login(email: string, password: string) {
    this.authenticationService.login(email, password)
      .then(data => {
        this.alertService.success('Login successful', true);
        this.router.navigate(['./tour-list']);

      })
      .catch(e => {
        this.alertService.error(e);
        this.loadingLogin = false;
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const user: AppUser = new AppUser();
    user.firstName = this.r.firstName.value;
    user.lastName = this.r.lastName.value;
    user.email = this.r.email.value;
    user.password = this.r.password.value;
    user.role = 'user';
    this.loading = true;

    this.authenticationService.register(user).then(data => {
      this.userService.register(user, data.user.uid)
        .subscribe(e => {
          this.alertService.success('Registration successful', true);
          this.login(user.email, user.password);
        });
    })
      .catch(e => {
        this.alertService.error(e);
        this.loading = false;
      });
  }
}

