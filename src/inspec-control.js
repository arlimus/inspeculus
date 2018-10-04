import { LitElement, html } from '@polymer/lit-element';
import { hljsTheme } from './hljs.theme.js';

function impactClass(impact) {
  if(impact >= 0.7) return 'critical';
  if(impact >= 0.4) return 'major';
  if(impact >= 0.0) return 'minor';
  return 'info';
}

class InspecControl extends LitElement {
  render() {
    const { control, hidden } = this;
    let imapctCls = impactClass(control.impact);
    let impactNum = (control.impact*10).toFixed(1); 
    let toggleBody = () => this.hidden = !this.hidden;
    let code = hljs.highlight("ruby", control.code).value;
    let codeEL = document.createElement("code");
    codeEL.innerHTML = code;
  
    return html`
${hljsTheme}
<style>
:host {
  --color-red: #ff3391;
  --color-orange: #ff8d00;
  --color-yellow: #ffb100;
}

.control {
  padding: 7px 15px;
}
.control:hover {
  color: white;
}

.critical.control .impact { color: var(--color-red); }
.critical.control:hover { background-color: var(--color-red); }
.critical.control:hover .impact { color: white; }

.major.control .impact { color: var(--color-orange); }
.major.control:hover { background-color: var(--color-orange); }
.major.control:hover .impact { color: white; }

.minor.control .impact { color: var(--color-yellow); }
.minor.control:hover { background-color: var(--color-yellow); }
.minor.control:hover .impact { color: white; }

.info.control:hover .impact { color: white; }
.info.control .impact { color: grey; }

.code {
  background-color: #444;
  color: white;
  padding: 1em;
  margin: 1em 0 8px 0;
}
pre {
  white-space: pre-wrap;
}

.control .summary {
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 6em;
}

.body {
  padding: 10px 0 0 0;
}

.hidden-true {
  display: none;
}
</style>
<div class="control ${imapctCls}">
  <div class="summary"
    @click="${(e) => toggleBody()}"
  >
    <div class="title">${control.title}</div>
    <div class="impact">${imapctCls} (${impactNum})</div>
  </div>
  <div class="body hidden-${hidden}">
    <div class="description">${control.desc}</div>
    <div class="code">
<pre>${codeEL}</pre>
    </div>
  </div>
</div>
`
  }

  static get properties() {
    return {
      control: { type: Object },
      hidden: { type: Boolean },
    }
  }

  constructor() {
    super()
    this.hidden = true;
  }
}
window.customElements.define('inspec-control', InspecControl);
