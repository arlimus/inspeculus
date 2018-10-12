import { LitElement, html } from '@polymer/lit-element';
import { hljsTheme } from './hljs.theme.js';

// Workaround for NPM packaging of HLJS languages:
import './hljs.ruby.es6module.js';

function impactClass(impact) {
  if(impact >= 0.7) return 'critical';
  if(impact >= 0.4) return 'major';
  if(impact > 0.0) return 'minor';
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

    let refs = ''
    if(control.refs != null && control.refs.length > 0) {
      if(control.refs.length === 1) {
        const ref = control.refs[0]
        refs = html`
        <div class="refs">
          See: <a target="_blank" href="${ref.url}">${ref.ref}</a>
        </div>
        `
      } else {
        refs = html`
        <div class="refs">
          See: <ul>
          ${contro.refs.map((ref) => html`
            <li><a target="_blank" href="${ref.url}">${ref.ref}</a></li>
          `)}
          </ul>
        </div>
        `
      }
    }

    let tags = ''
    if(control.tags != null && Object.keys(control.tags).length > 0) {
      tags = html`
      <div class="tags">
      ${Object.keys(control.tags).map((k) => {
        let v = control.tags[k];
        if(v == null) return html`<div class="tag">${k}</div>`
        return html`<div class="tag">${k}:${v}</div>`
      })}
      </div>
      `
    }
  
    return html`
${hljsTheme}
<style>
:host {
  --color-red: #fc81ad;
  --color-orange: #926BE7;
  --color-yellow: #8db5e6;
  --color-info: #666666;
  --color-main: #14a9ac;
}

a {
  color: var(--color-main);
  text-decoration: none;
}

.summary .id {
  color: inherit;
}
.summary:hover {
  color: white;
}

.isOpen-true.control {
  border: 2px solid white;
  border-radius: 3px;
  margin: -1px;
  margin-bottom: 15px;
}
.isOpen-true .summary {
  color: white;
}

.critical.control .impact { color: var(--color-red); }
.critical .summary:hover { background-color: var(--color-red); }
.critical .summary:hover .impact { color: white; }
.isOpen-true.critical.control .summary { background-color: var(--color-red); }
.isOpen-true.critical .summary .impact { color: white; }
.isOpen-true.critical.control { border-color: var(--color-red); }

.major.control .impact { color: var(--color-orange); }
.major .summary:hover { background-color: var(--color-orange); }
.major .summary:hover .impact { color: white; }
.isOpen-true.major.control .summary { background-color: var(--color-orange); }
.isOpen-true.major .summary .impact { color: white; }
.isOpen-true.major.control { border-color: var(--color-orange); }

.minor.control .impact { color: var(--color-yellow); }
.minor .summary:hover { background-color: var(--color-yellow); }
.minor .summary:hover .impact { color: white; }
.isOpen-true.minor.control .summary { background-color: var(--color-yellow); }
.isOpen-true.minor .summary .impact { color: white; }
.isOpen-true.minor.control { border-color: var(--color-yellow); }

.info.control .impact { color: var(--color-info); }
.info .summary:hover { background-color: var(--color-info); }
.info .summary:hover .impact { color: white; }
.isOpen-true.info.control .summary { background-color: var(--color-info); }
.isOpen-true.info .summary .impact { color: white; }
.isOpen-true.info.control { border-color: var(--color-info); }

.control {
  border: 1px solid #eee;
  border-bottom: none;
  background: white;
}
pre {
  white-space: pre-wrap;
}
.code {
  background: #444;
  color: white;
  padding: 1em;
  margin: 1em 0 8px 0;
  border: none;
  font-family: monospace;
}

ul {
  margin: 0 0 1em 0;
}
.refs, .tags {
  margin: 1.5em 0;
}
.tag {
  display: inline-block;
  background: #444;
  color: white;
  font-size: 0.7em;
  padding: 2px 10px 3px 10px;
  border-radius: 1em;
}
.tag:before {
  content: '#';
}

.id {
  margin-top: -0.2em;
  font-size: 0.7em;
  color: #999;
}
.summary {
  padding: 10px 15px;
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 6em;
}

.body {
  padding: 10px 15px;
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
    <div class="id">${control.id}</div>
  </div>
  <div class="body">
    <div class="description">${control.desc}</div>
    ${refs} ${tags}
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
