'use strict';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent, SpecManager } from '../base';
import { MenuService } from '../../services/index';

@Component({
  selector: 'model-list',
  templateUrl: './model-list.html',
  styleUrls: ['./model-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelList extends BaseComponent implements OnInit {
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
          anchor: this.buildAnchor(menuItem.id)
        });
      }
    });
    if (emptyTag.items.length) this.tags.push(emptyTag);

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
