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

import courses from './constants.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class courseList extends LitElement {
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

    this.courses = courses
  }

  gotoItem(index) {
    window.history.pushState(null, '', `items/${index}`)
  }

  render() {
    return html`
      <mwc-list>
        ${this.courses.map((course, index) => html`
          <mwc-list-item graphic="avatar" twoline>
            <span>${course.name}</span>
            <span slot="secondary" class="mwc-caption">${course.lessons.length} lessons</span>
            <mwc-icon slot="graphic">school</mwc-icon>
          </mwc-list-item>
        `)}
      </mwc-list>
    `;
  }
}

window.customElements.define('course-list', courseList);
