import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() openSidebarForMe: EventEmitter<any> = new EventEmitter()
  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  openSidebar() {
    this.openSidebarForMe.emit();
    setTimeout(()=>{
      window.dispatchEvent(
          new Event('resize')
      );
  }, 300)
  }

  signOut() {
    this.sharedService.setLoggedIn(false);
    this.router.navigate(["/dominik"]);
  }

}
