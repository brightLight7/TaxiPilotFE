import { Component, OnInit } from '@angular/core';
import { AppFacade } from 'src/app/store/app.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showSideMenu = false;
  showUserLoginMenu = false;
  userFullname = "Get started by logging in!";
  disableGlobal = false;

  //whenever a menu item is clicked - side menu will collapse
  userButton_Clicked(register: boolean, userIconDisbale: boolean) {
    const sideMenu = document.getElementById('side-menu');
    const menuBars = document.getElementById('menu-bars');
    const sideMenuBg = document.getElementById('side-menu-bg');
    const idUserLogin = document.getElementById('id-user-login');
    this.showSideMenu = !this.showSideMenu;
    if (sideMenu && menuBars && sideMenuBg && idUserLogin) {
      sideMenu.classList.add('side-menu');
      sideMenu.classList.remove('show-side-menu');
      menuBars.classList.remove('menu-bars-hover');
      sideMenuBg.classList.remove('showMe');
      sideMenuBg.classList.add('hideMe');
      if(userIconDisbale == false) {
        idUserLogin.classList.remove('disableMe');
      }
    }

    if(register == true){
      this.appFacade.setShowRegisterLogin(true);
    }
  }
  openSideMenu(userMenu_or_sideMenu: string) {
    this.showUserLoginMenu = false;
    if(userMenu_or_sideMenu == 'sideMenu') {
      this.showUserLoginMenu = true;
    }

    const sideMenu = document.getElementById('side-menu');
    const menuBars = document.getElementById('menu-bars');
    const sideMenuBg = document.getElementById('side-menu-bg');
    const idUserLogin = document.getElementById('id-user-login');
    this.showSideMenu = !this.showSideMenu;
    if (sideMenu && menuBars && sideMenuBg && idUserLogin) {
      if (this.showSideMenu == true && userMenu_or_sideMenu.toLowerCase() !== 'login') {
        menuBars.classList.add('menu-bars-hover');
        sideMenu.classList.remove('side-menu');
        sideMenu.classList.add('show-side-menu');
        sideMenuBg.classList.remove('hideMe');
        sideMenuBg.classList.add('showMe');
        idUserLogin.classList.add('disableMe');
      } else {
        menuBars.classList.remove('menu-bars-hover');
        sideMenu.classList.add('side-menu');
        sideMenu.classList.remove('show-side-menu');
        sideMenuBg.classList.remove('showMe');
        sideMenuBg.classList.add('hideMe');
        idUserLogin.classList.remove('disableMe');
      }

      if (this.showSideMenu) {
        //menuBars.classList.add('menu-bars-hover');
        sideMenu.classList.remove('side-menu');
        sideMenu.classList.add('show-side-menu');
      } else {
        //menuBars.classList.remove('menu-bars-hover');
        sideMenu.classList.add('side-menu');
        sideMenu.classList.remove('show-side-menu');
      }
    }
  }

  constructor(private appFacade: AppFacade) {}
  ngOnInit(): void {
    this.appFacade.disableGlobal$.subscribe((x) => {
        this.disableGlobal = x;
    })
  }
}
