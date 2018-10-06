import { LitElement, html } from '@polymer/lit-element';
import "@material/mwc-icon";

class PasteIcon extends LitElement {
  render() {
    const { isSelected } = this;
    const selectInput = (e) => {
      this.isSelected = true;
      this.children[0].focus();
    }

    const unblur = (e) => {
      this.isSelected = false;
    }

    return html`
<style>
.clickable { cursor: pointer; }
.input {
  display: flex;
  width: 100px;
  height: 100px;
}
mwc-icon {
  width: 100px;
  height: 100px;
  font-size: 24px;
  display: inline-block;
  margin: 0;
  padding: 0;
  color: white;
  text-align: center;
  line-height: 98px;
  position: absolute;
}
.selected-true mwc-icon {
  display: none;
}
.ctrl-v {
  display: none;
  width: 100px;
  height: 100px;
  text-align: center;
  position: absolute;
  line-height: 100px;
  font-size: 0.7em;
  /* letter-spacing: 1px; */
  font-weight: bold;
  color: white;
}
.selected-true .ctrl-v {
  display: block;
}
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;
  background: #444;
  padding: 0;
  margin: 0;
  position: absolute;
  animation: scaleIn 2s infinite cubic-bezier(.36, .11, .89, .32);
}
.selected-true .circle {
  background: #14a9ac;
  animation: scaleInBig 2s infinite cubic-bezier(.36, .11, .89, .32);
}
@keyframes scaleIn {
  from {
    transform: scale(.4, .4);
    opacity: .5;
  }
  to {
    transform: scale(0.5, 0.5);
    opacity: 0;
  }
}
@keyframes scaleInBig {
  from {
    transform: scale(.5, .5);
    opacity: .5;
  }
  to {
    transform: scale(1.1, 1.1);
    opacity: 0;
  }
}
</style>

<div class="input clickable selected-${isSelected}"
  @click="${selectInput}"
  @focusout="${unblur}"
>
  <slot></slot>
  <div class="circle" style="animation-delay: -0.6s"></div>
  <div class="circle" style="animation-delay: -0.3s"></div>
  <div class="circle" style="animation-delay: 0s"></div>
  <mwc-icon>create</mwc-icon>
  <div class="ctrl-v">CTRL + V</div>
</div>
`
  }

  static get properties() {
    return {
      isSelected: { type: Boolean },
    }
  }

  constructor () {
    super()
    this.isSelected = false;
  }
}
window.customElements.define('paste-icon', PasteIcon);
