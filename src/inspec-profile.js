import { LitElement, html } from '@polymer/lit-element';
import './inspec-control.js';
import './paste-icon.js';

const nextSortState = {
  "": "desc",
  "desc": "asc",
  "asc": "",
}

// Sort helpers for controls
const byID = (a, b) => (a.id > b.id) ? -1 : (a.id < b.id) ? 1 : 0;
const byImpact = (a, b) => (a.impact > b.impact) ? 1 : (a.impact < b.impact) ? -1 : byID(a, b);

class InspecProfile extends LitElement {
  render() {
    const { profile, error, enableInput, search, sort } = this;

    let controls = (profile || {}).controls || []
    if(search != null) {
      const gSearch = search.toLocaleLowerCase()
      controls = profile.controls.filter((c) => {
        return c.code.toLocaleLowerCase().includes(gSearch)
      })
    }

    const toggleSort = () => {
      this.sort = nextSortState[sort];
    }

    let sortIcon
    if(sort === "asc") {
      controls.sort(byImpact)
      sortIcon = html`<div class="sort" @click="${toggleSort}"><mwc-icon>expand_less</mwc-icon></div>`;
    }
    if(sort === "desc") {
      controls.sort((a,b) => byImpact(b, a))
      sortIcon = html`<div class="sort" @click="${toggleSort}"><mwc-icon>expand_more</mwc-icon></div>`;
    }
    if(sort === "") {
      controls.sort((a,b) => byID(b, a))
      sortIcon = html`<div class="sort" @click="${toggleSort}"><mwc-icon>unfold_more</mwc-icon></div>`;
    }

    const searchChanged = (e) => {
      this.search = e.target.value;
    }

    let inputEl = ''
    if(enableInput) {
      inputEl = html`
        <paste-icon>
          <input class="ghost" @keyup="${e => this.parseProfile(this, e)}">
        </paste-icon>
      `
    }

    let body = '';
    if(profile == null) {
      body = html`
        <div class="top">
          <div class="header"><h2>No profile provided.</h2></div>
          ${inputEl}
        </div>
      `
    } else {
      body = html`
        <div class="top">
          <div class="header">
            <h2>${profile.title}</h2>
            <span class=version>v${profile.version}</span>
          </div>
          ${inputEl}
          <div class="search-box">
            <input class="search" placeholder="Search controls..." @keyup="${searchChanged}">
          </div>
        </div>
        <div class="controls">
          <div class="header">
            <div>NAME</div>
            <div>IMPACT ${sortIcon}</div>
          </div>
          ${controls.map(x => html`<inspec-control .control="${x}"></inspec-control>`)}
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

.top {
  position: relative;
}
.top .header {
  line-height: 100px;
  width: 100%;
}
paste-icon {
  position: absolute;
  right: 0;
  top: 0;
}

h2 {
  display: inline-block;
  padding: 0 8px;
  margin: 0;
}

.search-box {
  padding: 0 52px 0 0;
}
.search {
  padding: 10px 25px;
  margin: 5px 0 15px 0;
  border-radius: 5px;
  border: 1px solid #eee;
  width: 100%;
  background: white;
  color: black;
}
.search:focus {
  outline: none;
  border-color: #14a9ac;
}
.sort {
  display: inline-block;
  cursor: pointer;
}
.sort mwc-icon {
  font-size: 0.8em;
}

input.ghost {
  overflow: hidden;
  width: 0;
  height: 0;
  border: none;
  padding: 0;
  margin: 0;
  color: transparent;
  outline: none;
}

.controls {
  border-bottom: 1px solid #eee;
  margin-bottom: 25px;
}
.controls .header {
  background: #444;
  color: white;
  display: grid;
  grid-template-columns: auto 7em;
  padding: 8px 15px;
}
.controls .header > div {
  font-size: 0.8em;
  letter-spacing: 3px;
  font-weight: bold;
}
</style>

${errorEl}
${body}
`
  }

  static get properties() {
    return {
      profile: { type: Object },
      error: { type: String },
      enableInput: { type: Boolean },
      search: { type: String },
      sort: { type: String },
    }
  }

  constructor() {
    super()
    this.sort = "";
  }

  parseProfile(src, e) {
    let v = e.target.value;
    if(v == '') return;

    try {
      let nu = JSON.parse(v);
      src.profile = nu;
      this.error = null;
      console.log("profile changed")
      src.focus()
      src.blur()
    } catch(error) {
      console.error("not a valid profile")
      console.error(v)
      this.error = "Failed to parse profile";
    }
    e.target.value = '';
  }
}
window.customElements.define('inspec-profile', InspecProfile);
