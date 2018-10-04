import { LitElement, html } from '@polymer/lit-element';
import './inspec-control.js';

class InspecProfile extends LitElement {
  render() {
    const { profile, error } = this;

    let body = '';
    if(profile == null) {
      body = html`<div class=empty>No profile provided. Please paste a JSON.</div>`
    } else {
      body = html`
        <div class="top">
          <h2>${profile.title}</h2>
          <span class=version>v${profile.version}</span>
        </div>
        <div class="controls">
          ${profile.controls.map(x => html`<inspec-control .control="${x}"></inspec-control>`)}
        </div>
      `
    }

    let errorEl = ''
    if(error != null) {
      errorEl = html`<div class=error>${error}</div>`
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

${errorEl}
<input @keyup="${e => this.parseProfile(this, e)}">
${body}
`
  }

  static get properties() {
    return {
      profile: { type: Object },
      error: { type: String },
    }
  }

  parseProfile(src, e) {
    let v = e.target.value;
    if(v == '') return;

    try {
      let nu = JSON.parse(v);
      src.profile = nu;
      this.error = null;
      console.log("profile changed")
    } catch(error) {
      console.error("not a valid profile")
      console.error(v)
      this.error = "Failed to parse profile";
    }
    e.target.value = '';
  }
}
window.customElements.define('inspec-profile', InspecProfile);
