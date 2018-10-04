import { LitElement, html } from '@polymer/lit-element';
import './inspec-control.js';

class InspecProfile extends LitElement {
  render() {
    const { profile } = this;
    if(profile == null) {
      return html`No profile provided. <input @blur="${e => this.parseProfile(this, e)}">`
    }

    return html`
<style>
.version {
  font-size: 1em;
  display: inline-block;
  margin-left: 1em;
}
h2 {
  display: inline-block;
  padding: 0 8px;
}
input {
  overflow: hidden;
}
</style>

<input @blur="${e => this.parseProfile(this, e)}">
<div class="top">
  <h2>${profile.title}</h2>
  <span class=version>v${profile.version}</span>
</div>
<div class="controls">
  ${profile.controls.map(x => html`<inspec-control .control="${x}"></inspec-control>`)}
</div>
`
  }

  static get properties() {
    return {
      profile: { type: Object },
    }
  }

  parseProfile(src, e) {
    let v = e.target.value;
    // e.target.value = '';
    try {
      let nu = JSON.parse(v);
      src.profile = nu
      console.log("profile changed")
    } catch(error) {
      console.error("Not a valid profile")
      console.error(v)
    }
  }
}
window.customElements.define('inspec-profile', InspecProfile);
