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

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class knowledgeItem extends LitElement {
  static get styles() {
    return css`
      :host {
        --mdc-theme-primary: black;
      }

      section {
        width: 100%;
        max-width: 600px;
        margin: 24px auto;
        display: flex;
        flex-direction: column;
      }

      .mwc-caption {
        font-size: 0.75rem;
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 0.05em;
      }
    `;
  }

  static get properties() {
    return {
      name: {type: String},
      sources: {type: Array},
      _url: {type: String},
      _urlValid: {type: Boolean}
    };
  }

  constructor() {
    super();

    this.name = ''
    this.sources = []

    this._url = ''
  }

  _addSource() {
    this.sources.push(this._url)
    this._url = ''
    this._urlValid = false
  }

  _onUrlChange(e) {
    this._url = e.target.value;
    this._urlValid = e.target.reportValidity()
  }

  render() {
    return html`
      <section>
        <mwc-textfield label="Item name" spellcheck="false" .value="${this.name}"></mwc-textfield>
        <section>
          <h3 class="mwc-caption">Sources</h3>
          <mwc-list>
            ${this.sources.map(source => html`
                <mwc-list-item graphic="icon">
                  <mwc-icon slot="graphic">link</mwc-icon>
                  <a href="${source}" target="_blank">${source}</a>
                </mwc-list-item>
              `)}
          </mwc-list>
          <mwc-textfield id="urlInput" icon="link" type="url" placeholder="Insert URL" spellcheck="false" .value="${this._url}" @input="${e => this._onUrlChange(e)}""></mwc-textfield>
          <mwc-button ?disabled="${!this._urlValid}" label="Add source" @click="${this._addSource}"></mwc-button>
        </section>
      </section>
    `;
  }
}

window.customElements.define('knowledge-item', knowledgeItem);
