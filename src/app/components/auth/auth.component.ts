import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResData } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PlaceholderDirective } from '../../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective) modalHost: PlaceholderDirective;
  private modalSub: Subscription;
  isLoginMode = true;
  isLoading = false;
  err: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    if (this.modalSub) {
      this.modalSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    let authObs: Observable<AuthResData>;
    if (authForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.logIn({ ...authForm.value });
    } else {
      authObs = this.authService.signUp({ ...authForm.value });
    }
    authObs.subscribe(
      (res) => this.router.navigate(['/recipes']),
      (err) => {
        this.err = err;
        this.showErrorModal(err);
      }
    );
    authForm.reset();
    this.isLoading = false;
  }

  onHandleError() {
    this.err = null;
  }

  private showErrorModal(err: string) {
    const modalCompFact =
      this.componentResolver.resolveComponentFactory(ModalComponent);
    const hostRef = this.modalHost.viewContRef;
    hostRef.clear();
    const modalRef = hostRef.createComponent(modalCompFact);
    modalRef.instance.message = err;
    this.modalSub = modalRef.instance.close.subscribe(() => {
      this.modalSub.unsubscribe();
      hostRef.clear();
    });
  }
}
