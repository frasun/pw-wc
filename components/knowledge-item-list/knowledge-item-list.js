/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, css} from 'lit-element';

import itemList from './constants.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class knowledgeItemList extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      mwc-list-item {
        padding-left: 30px;
      }
    `;
  }

  static get properties() {
    return {
      list: {type: Array},
    };
  }

  constructor() {
    super();

    this.list = itemList
  }

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener('addNewItem', e => {
      this.list = [e.detail, ...this.list]
    })
  }

  gotoItem(index) {
    window.history.pushState(null, '', `items/${index}`)
  }

  render() {
    return html`
      <mwc-list>
        ${this.list.map((item, index) => html`
          <mwc-list-item graphic="avatar" twoline hasMeta @click="${e => this.gotoItem(index)}">
            <span>${item.name}</span>
            <span slot="secondary" class="mwc-caption">${item.sources.length} linked source(s)</span>
            <mwc-icon slot="graphic">link</mwc-icon>
          </mwc-list-item>
        `)}
      </mwc-list>
    `;
  }
}

window.customElements.define('knowledge-item-list', knowledgeItemList);
