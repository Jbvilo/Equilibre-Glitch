import { Component, OnInit, NgModule, Input, ViewChild } from '@angular/core';
import { SideNavigationMenuModule, HeaderModule } from '../../shared/components';
import { AuthService, ScreenService } from '../../shared/services';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule, DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';
import { navigation } from '../../app-navigation'
import { Router, NavigationEnd } from '@angular/router';
import { DxLoadPanelModule } from 'devextreme-angular';

@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss']
})
export class SideNavOuterToolbarComponent implements OnInit {
  @ViewChild(DxScrollViewComponent, { static: true }) scrollView: DxScrollViewComponent;
  selectedRoute = '';

  menuOpened: boolean;
  temporaryMenuOpened = false;
  loadingVisible = false;

  title: String;
  menuMode = 'overlap';
  menuRevealMode = 'slide';
  minMenuSize = 0;
  shaderEnabled = true;

  constructor(private screen: ScreenService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.menuOpened = false;



    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.selectedRoute = val.urlAfterRedirects.split('?')[0];

        var nico = this.selectedRoute;
        var text;

        navigation.forEach(function (value) {


          if (nico == value.path) {



            text = value.text;
          }
        }


        )
        this.title = text;
      }
    });



    this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    //this.menuMode = isLarge ? 'shrink' : 'overlap';
    //this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    // this.minMenuSize = isXSmall ? 0 : 60;
    // this.shaderEnabled = !isLarge;
  }

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
      this.authService.logOut()
    }, 1000);
  }

  navigationChanged(event) {
    const path = event.itemData.path;
    const pointerEvent = event.event;

    if (event.itemData.text == "Se déconnecter") {
      //  this.title=event.itemData.text$
      this.loadingVisible = true;



    }
    else {


      if (path && this.menuOpened) {
        if (event.node.selected) {
          pointerEvent.preventDefault();
        } else {
          this.router.navigate([path]);
          this.scrollView.instance.scrollTo(0);
        }

        if (this.hideMenuAfterNavigation) {
          this.temporaryMenuOpened = false;
          this.menuOpened = false;
          pointerEvent.stopPropagation();
        }
      } else {
        pointerEvent.preventDefault();
      }

    }
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }
}

@NgModule({
  imports: [SideNavigationMenuModule, DxDrawerModule, HeaderModule, DxScrollViewModule, CommonModule, DxLoadPanelModule],
  exports: [SideNavOuterToolbarComponent],
  declarations: [SideNavOuterToolbarComponent]
})
export class SideNavOuterToolbarModule { }
