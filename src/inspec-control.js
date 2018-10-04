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
    const { control, isOpen } = this;
    let imapctCls = impactClass(control.impact);
    let impactNum = (control.impact*10).toFixed(1); 
    let toggleBody = () => this.isOpen = !this.isOpen;
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
  padding: 10px 15px;
  border: 1px solid #eee;
  border-bottom: none;
  background: white;
}
.isOpen-false.control:hover {
  color: white;
}

.isOpen-true.control {
  border: 2px solid var(--color-red);
  border-radius: 3px;
  margin-bottom: 15px;
}

.critical.control .impact { color: var(--color-red); }
.isOpen-false.critical.control:hover { background-color: var(--color-red); }
.isOpen-false.critical.control:hover .impact { color: white; }

.major.control .impact { color: var(--color-orange); }
.isOpen-false.major.control:hover { background-color: var(--color-orange); }
.isOpen-false.major.control:hover .impact { color: white; }

.minor.control .impact { color: var(--color-yellow); }
.isOpen-false.minor.control:hover { background-color: var(--color-yellow); }
.isOpen-false.minor.control:hover .impact { color: white; }

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

.isOpen-false .body {
  display: none;
}
</style>
<div class="control ${imapctCls} isOpen-${isOpen}">
  <div class="summary"
    @click="${(e) => toggleBody()}"
  >
    <div class="title">${control.title}</div>
    <div class="impact">${imapctCls} (${impactNum})</div>
  </div>
  <div class="body">
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
      isOpen: { type: Boolean },
    }
  }

  constructor() {
    super()
    this.isOpen = false;
  }
}
window.customElements.define('inspec-control', InspecControl);
