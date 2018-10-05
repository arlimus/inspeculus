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
  width: 50px;
  height: 50px;
}
.input mwc-icon {
  width: 50px;
  height: 50px;
  font-size: 30px;
  display: inline-block;
  margin: 0;
  padding: 0;
  color: white;
  text-align: center;
  line-height: 48px;
  position: absolute;
}
.input .circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #444;
  padding: 0;
  margin: 0;
  position: absolute;
  animation: scaleIn 2s infinite cubic-bezier(.36, .11, .89, .32);
}
.selected-true .circle {
  background: #89e4a1;
}
@keyframes scaleIn {
  from {
    transform: scale(.5, .5);
    opacity: .5;
  }
  to {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
}
</style>

<div class="input clickable selected-${isSelected}"
  @click="${selectInput}"
  @focusout="${unblur}"
>
  <slot></slot>
  <mwc-icon>keyboard_capslock</mwc-icon>
  <div class="circle" style="animation-delay: 0s"></div>
  <div class="circle" style="animation-delay: 0.3s"></div>
  <div class="circle" style="animation-delay: 0.6s"></div>
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
