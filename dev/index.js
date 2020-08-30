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

import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-button';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-tab-bar';
import '@material/mwc-tab-bar';
import '@material/mwc-tab';
import '@material/mwc-icon-button';
import '@material/mwc-fab';
import '@material/mwc-textfield';
import '@material/mwc-textarea';
import "@appnest/web-router";

import * as Constants from './constants.js'


export class appContainer extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      mwc-top-app-bar-fixed {
        --mdc-theme-primary: black;
        --mdc-theme-on-primary: white;
      }

      mwc-top-app-bar-fixed mwc-button {
        --mdc-theme-primary: white;
      }

      mwc-top-app-bar-fixed[data-theme="white"] {
        --mdc-theme-primary: white;
        --mdc-theme-on-primary: black;
      }

      mwc-top-app-bar-fixed[data-theme="white"] mwc-button {
        --mdc-theme-primary: black;
      }

      mwc-top-app-bar-fixed[data-theme="tomato"] {
        --mdc-theme-primary: FireBrick;
        --mdc-theme-on-primary: white;
      }

      mwc-top-app-bar-fixed[data-theme="blue"] {
        --mdc-theme-primary: MediumBlue;
        --mdc-theme-on-primary: white;
      }

      mwc-top-app-bar-fixed .h1 {
        font-size: 2rem;
        font-weight: 400;
      }

      .mwc-caption {
        font-size: 0.75rem;
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 0.05em;
      }

      mwc-list .section-header {
        padding:12px 16px 0;
        opacity: .54;
      }

      mwc-fab {
        position: fixed;
        top:96px;
        right: 56px;
        z-index: 1000;
        --mdc-theme-secondary: tomato;
      }
    `;
  }

  static get properties() {
    return {
      title: {type: String},
      router: {type: Object},
      theme: {type: Array},
      cancel: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = '';
    this.router = {};
    this.theme = '';
    this.cancel = false;
  }

  firstUpdated (props) {
    super.firstUpdated(props);

    this.router = this.shadowRoot.querySelector('#routerSlot')
    this.router.add(Constants.ROUTES);
  }

  connectedCallback() {
    super.connectedCallback()

    window.addEventListener('navigationend', this.setPageSettings.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    window.removeEventListener('navigationend', this.setPageSettings)
  }

  setPageSettings() {
    this.title = this.router.route.title
    document.title = `Pigułki wiedzy Demo - ${this.title}`

    this.theme = this.router.route.theme;
    this.cancel = this.router.route.cancel || false
  }

  _handleActionButton() {
    const action = this.router.route.action

    switch(action) {
      case Constants.ACTIONS[0]:
        this.goto('new-item');
        break;
      case Constants.ACTIONS[1]:
        this.goto('dev');
        break;
      default:
        this.goto('dev');
    }
  }

  goto(path) {
    window.history.pushState(null, '', path);
  }

  render() {
    return html`
      <mwc-top-app-bar-fixed prominent data-theme="${this.theme || ''}">
        ${this.cancel ?
          html`<mwc-button slot="actionItems" label="Cancel" @click="${this._handleActionButton}"></mwc-button>` :
          html`
            <mwc-icon-button icon="link" slot="actionItems" @click="${e => this.goto('dev')}"></mwc-icon-button>
            <mwc-icon-button icon="model_training" slot="actionItems" @click="${e => this.goto('courses')}"></mwc-icon-button>
            <mwc-icon-button icon="face" slot="actionItems" @click="${e => this.goto('users')}"></mwc-icon-button>
          `
        }
        <h1 class="h1" slot="title">${this.title}</h1>
        <mwc-fab label="add item" @click="${this._handleActionButton}">
          <mwc-icon slot="icon">add</mwc-icon>
        </mwc-fab>
        <router-slot id="routerSlot"></router-slot>
      </mwc-top-app-bar-fixed>
    `;
  }
}

window.customElements.define('pigulki-wiedzy', appContainer);
