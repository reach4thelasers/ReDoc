'use strict';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent, SpecManager } from '../base';
import { MenuService } from '../../services/index';

@Component({
  selector: 'data-model-list',
  templateUrl: './data-model-list.html',
  styleUrls: ['./data-model-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataModelList extends BaseComponent implements OnInit {
  @Input() pointer:string;

  tags:Array<any> = [];

  modelDefinitions:Array<any> = [];

  constructor(specMgr:SpecManager, private menu: MenuService) {
    super(specMgr);
  }

  init() {
    let flatMenuItems = this.menu.flatItems;
    this.tags = [];
    let emptyTag = {
      name: '',
      items: []
    };
    flatMenuItems.forEach(menuItem => {
      // skip items that are not bound to swagger tags/operations
      if (!menuItem.metadata) {
        return;
      }

      if (menuItem.metadata.type === 'model') {
        this.tags.push({
          ...menuItem,
          anchor: this.buildAnchor(menuItem.id),
          pointer: menuItem.metadata.pointer
        });
      }
    });
    if (emptyTag.items.length) this.tags.push(emptyTag);

    var firstDefinition = this.specMgr.schema.definitions.Dog;


    console.log(firstDefinition);

  }

  buildAnchor(tagId):string {
    return this.menu.hashFor(tagId,
      { type: 'tag'});
  }

  trackByTagName(_, el) {
    return el.name;
  }

  ngOnInit() {
    this.preinit();
  }
}
