import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { navigation } from '../../../app-navigation';
import { navigation2 } from '../../../app-navigation';
import { navigation3 } from '../../../app-navigation';
import * as events from 'devextreme/events';
import { AuthService } from '../../services';


@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<string>();

  @Output()
  openMenu = new EventEmitter<any>();

  public  _selectedItem: String;
  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  constructor(private elementRef: ElementRef, private authservice: AuthService) { }

  private _items;
  get items() {
    if (!this._items) {
 
    let itemlist;
    if ( this.authservice.getrole()== "Cavalier"  )
     {
       itemlist=navigation2;
     }
else if ( this.authservice.getrole()== "Moniteur" ) {
  itemlist=navigation3;
}
else{
  itemlist=navigation;
}

      this._items = itemlist.map((item) => {
        if(item.path && !(/^\//.test(item.path))){ 
          item.path = `/${item.path}`;
        }
         return { ...item, expanded: !this._compactMode }
        });
    }
 

  
    return this._items;
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }



  onItemClick(event) {
    this.selectedItemChanged.emit(event);


  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e) => {
      this.openMenu.next(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}

@NgModule({
  imports: [ DxTreeViewModule ],
  declarations: [ SideNavigationMenuComponent ],
  exports: [ SideNavigationMenuComponent ]
})
export class SideNavigationMenuModule { }
