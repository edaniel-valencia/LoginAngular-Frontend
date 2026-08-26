import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DashboardComponent implements OnInit {
  
  constructor(private router: Router){}
  
  logOut(){
    localStorage.removeItem('myToken')
    this.router.navigate(['/login'])
  }
  
  // constructor(private router: Router) {}

  ngOnInit(): void {
    // Manejar la navegación y re-inicializar Flowbite
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      initFlowbite();
    });
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }

}
