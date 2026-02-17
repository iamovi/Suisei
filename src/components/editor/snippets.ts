import { autocompletion, snippetCompletion, Completion } from '@codemirror/autocomplete';
import { htmlLanguage } from '@codemirror/lang-html';
import { cssLanguage } from '@codemirror/lang-css';
import { javascriptLanguage } from '@codemirror/lang-javascript';
import { Extension } from '@codemirror/state';

// ══════════════════════════════════════════════════════════════
// JavaScript Snippets — VS Code parity
// ══════════════════════════════════════════════════════════════

const jsSnippets: Completion[] = [
  // ── Console ──
  snippetCompletion('console.log(${1});', { label: 'cl', detail: 'console.log', type: 'function', boost: 10 }),
  snippetCompletion('console.log(\'${1:label}:\', ${2});', { label: 'clv', detail: 'console.log with label', type: 'function' }),
  snippetCompletion('console.error(${1});', { label: 'ce', detail: 'console.error', type: 'function' }),
  snippetCompletion('console.warn(${1});', { label: 'cw', detail: 'console.warn', type: 'function' }),
  snippetCompletion('console.table(${1});', { label: 'ct', detail: 'console.table', type: 'function' }),
  snippetCompletion('console.dir(${1});', { label: 'cd', detail: 'console.dir', type: 'function' }),
  snippetCompletion('console.time(\'${1:label}\');\n${2}\nconsole.timeEnd(\'${1:label}\');', { label: 'ctime', detail: 'console.time/timeEnd', type: 'function' }),
  snippetCompletion('console.group(\'${1:label}\');\n${2}\nconsole.groupEnd();', { label: 'cgroup', detail: 'console.group', type: 'function' }),
  snippetCompletion('console.assert(${1:condition}, \'${2:message}\');', { label: 'cassert', detail: 'console.assert', type: 'function' }),
  snippetCompletion('console.count(\'${1:label}\');', { label: 'ccount', detail: 'console.count', type: 'function' }),
  snippetCompletion('console.clear();', { label: 'cclear', detail: 'console.clear', type: 'function' }),
  snippetCompletion('debugger;', { label: 'db', detail: 'debugger', type: 'keyword' }),

  // ── Variables ──
  snippetCompletion('const ${1:name} = ${2};', { label: 'co', detail: 'const', type: 'keyword' }),
  snippetCompletion('let ${1:name} = ${2};', { label: 'le', detail: 'let', type: 'keyword' }),
  snippetCompletion('const { ${2} } = ${1:obj};', { label: 'dest', detail: 'destructure object', type: 'keyword' }),
  snippetCompletion('const [${2}] = ${1:arr};', { label: 'desta', detail: 'destructure array', type: 'keyword' }),
  snippetCompletion('const ${1:name} = Object.freeze(${2:{}});', { label: 'freeze', detail: 'Object.freeze', type: 'function' }),
  snippetCompletion('typeof ${1:variable} === \'${2:string}\'', { label: 'typeof', detail: 'typeof check', type: 'keyword' }),
  snippetCompletion('${1:variable} instanceof ${2:Class}', { label: 'instanceof', detail: 'instanceof check', type: 'keyword' }),

  // ── Functions ──
  snippetCompletion('function ${1:name}(${2}) {\n  ${3}\n}', { label: 'fn', detail: 'function', type: 'function' }),
  snippetCompletion('const ${1:name} = (${2}) => {\n  ${3}\n};', { label: 'af', detail: 'arrow function', type: 'function' }),
  snippetCompletion('const ${1:name} = (${2}) => ${3};', { label: 'afo', detail: 'arrow fn (one-liner)', type: 'function' }),
  snippetCompletion('async function ${1:name}(${2}) {\n  ${3}\n}', { label: 'afn', detail: 'async function', type: 'function' }),
  snippetCompletion('const ${1:name} = async (${2}) => {\n  ${3}\n};', { label: 'aaf', detail: 'async arrow function', type: 'function' }),
  snippetCompletion('(${1}) => ${2}', { label: 'iaf', detail: 'inline arrow fn', type: 'function' }),
  snippetCompletion('function* ${1:name}(${2}) {\n  ${3}\n}', { label: 'gfn', detail: 'generator function', type: 'function' }),
  snippetCompletion('(function() {\n  ${1}\n})();', { label: 'iife', detail: 'IIFE', type: 'function' }),

  // ── Conditionals ──
  snippetCompletion('if (${1:condition}) {\n  ${2}\n}', { label: 'if', detail: 'if statement', type: 'keyword' }),
  snippetCompletion('if (${1:condition}) {\n  ${2}\n} else {\n  ${3}\n}', { label: 'ife', detail: 'if/else', type: 'keyword' }),
  snippetCompletion('if (${1:condition}) {\n  ${2}\n} else if (${3:condition}) {\n  ${4}\n} else {\n  ${5}\n}', { label: 'ifei', detail: 'if/else if/else', type: 'keyword' }),
  snippetCompletion('${1:condition} ? ${2:true} : ${3:false}', { label: 'ter', detail: 'ternary', type: 'keyword' }),
  snippetCompletion('${1:value} ?? ${2:default}', { label: 'nc', detail: 'nullish coalescing', type: 'keyword' }),
  snippetCompletion('${1:obj}?.${2:prop}', { label: 'oc', detail: 'optional chaining', type: 'keyword' }),
  snippetCompletion('switch (${1:key}) {\n  case \'${2:value}\':\n    ${3}\n    break;\n  default:\n    ${4}\n}', { label: 'switch', detail: 'switch statement', type: 'keyword' }),

  // ── Loops ──
  snippetCompletion('for (let ${1:i} = 0; ${1:i} < ${2:len}; ${1:i}++) {\n  ${3}\n}', { label: 'fori', detail: 'for loop', type: 'keyword' }),
  snippetCompletion('for (const ${1:item} of ${2:arr}) {\n  ${3}\n}', { label: 'forof', detail: 'for...of', type: 'keyword' }),
  snippetCompletion('for (const ${1:key} in ${2:obj}) {\n  ${3}\n}', { label: 'forin', detail: 'for...in', type: 'keyword' }),
  snippetCompletion('while (${1:condition}) {\n  ${2}\n}', { label: 'while', detail: 'while loop', type: 'keyword' }),
  snippetCompletion('do {\n  ${1}\n} while (${2:condition});', { label: 'dowhile', detail: 'do...while', type: 'keyword' }),

  // ── Array Methods ──
  snippetCompletion('${1:arr}.forEach((${2:item}) => {\n  ${3}\n});', { label: 'forEach', detail: 'forEach', type: 'function' }),
  snippetCompletion('${1:arr}.map((${2:item}) => ${3})', { label: 'map', detail: 'array map', type: 'function' }),
  snippetCompletion('${1:arr}.filter((${2:item}) => ${3})', { label: 'filter', detail: 'array filter', type: 'function' }),
  snippetCompletion('${1:arr}.reduce((${2:acc}, ${3:cur}) => {\n  ${4}\n  return ${2:acc};\n}, ${5:initial})', { label: 'reduce', detail: 'array reduce', type: 'function' }),
  snippetCompletion('${1:arr}.find((${2:item}) => ${3})', { label: 'find', detail: 'array find', type: 'function' }),
  snippetCompletion('${1:arr}.findIndex((${2:item}) => ${3})', { label: 'findex', detail: 'array findIndex', type: 'function' }),
  snippetCompletion('${1:arr}.some((${2:item}) => ${3})', { label: 'some', detail: 'array some', type: 'function' }),
  snippetCompletion('${1:arr}.every((${2:item}) => ${3})', { label: 'every', detail: 'array every', type: 'function' }),
  snippetCompletion('${1:arr}.includes(${2:item})', { label: 'includes', detail: 'array includes', type: 'function' }),
  snippetCompletion('${1:arr}.sort((a, b) => ${2:a - b})', { label: 'sort', detail: 'array sort', type: 'function' }),
  snippetCompletion('${1:arr}.flat(${2:Infinity})', { label: 'flat', detail: 'array flat', type: 'function' }),
  snippetCompletion('${1:arr}.flatMap((${2:item}) => ${3})', { label: 'flatmap', detail: 'array flatMap', type: 'function' }),
  snippetCompletion('[...${1:arr1}, ...${2:arr2}]', { label: 'spread', detail: 'spread arrays', type: 'keyword' }),
  snippetCompletion('Array.from(${1:iterable})', { label: 'arrfrom', detail: 'Array.from', type: 'function' }),
  snippetCompletion('Array.isArray(${1:value})', { label: 'isarr', detail: 'Array.isArray', type: 'function' }),
  snippetCompletion('[...new Set(${1:arr})]', { label: 'unique', detail: 'unique array', type: 'function' }),

  // ── Object Methods ──
  snippetCompletion('Object.keys(${1:obj})', { label: 'okeys', detail: 'Object.keys', type: 'function' }),
  snippetCompletion('Object.values(${1:obj})', { label: 'ovalues', detail: 'Object.values', type: 'function' }),
  snippetCompletion('Object.entries(${1:obj})', { label: 'oentries', detail: 'Object.entries', type: 'function' }),
  snippetCompletion('Object.assign(${1:{}}, ${2:src})', { label: 'oassign', detail: 'Object.assign', type: 'function' }),
  snippetCompletion('{ ...${1:obj}, ${2:key}: ${3:value} }', { label: 'ospread', detail: 'object spread', type: 'keyword' }),
  snippetCompletion('Object.fromEntries(${1:entries})', { label: 'ofrom', detail: 'Object.fromEntries', type: 'function' }),
  snippetCompletion('JSON.stringify(${1:obj}, null, 2)', { label: 'jstr', detail: 'JSON.stringify', type: 'function' }),
  snippetCompletion('JSON.parse(${1:str})', { label: 'jpar', detail: 'JSON.parse', type: 'function' }),

  // ── String Methods ──
  snippetCompletion('`${${1:expr}}`', { label: 'tl', detail: 'template literal', type: 'keyword' }),
  snippetCompletion('${1:str}.split(\'${2:,}\')', { label: 'split', detail: 'string split', type: 'function' }),
  snippetCompletion('${1:str}.replace(/${2:pattern}/g, \'${3:replacement}\')', { label: 'replace', detail: 'string replace', type: 'function' }),
  snippetCompletion('${1:str}.trim()', { label: 'trim', detail: 'string trim', type: 'function' }),
  snippetCompletion('${1:str}.startsWith(\'${2}\')', { label: 'starts', detail: 'startsWith', type: 'function' }),
  snippetCompletion('${1:str}.endsWith(\'${2}\')', { label: 'ends', detail: 'endsWith', type: 'function' }),
  snippetCompletion('${1:str}.padStart(${2:length}, \'${3: }\')', { label: 'pads', detail: 'padStart', type: 'function' }),
  snippetCompletion('${1:str}.repeat(${2:count})', { label: 'repeat', detail: 'string repeat', type: 'function' }),

  // ── Error Handling ──
  snippetCompletion('try {\n  ${1}\n} catch (${2:err}) {\n  console.error(${2:err});\n}', { label: 'tc', detail: 'try/catch', type: 'keyword' }),
  snippetCompletion('try {\n  ${1}\n} catch (${2:err}) {\n  ${3}\n} finally {\n  ${4}\n}', { label: 'tcf', detail: 'try/catch/finally', type: 'keyword' }),
  snippetCompletion('throw new Error(\'${1:message}\');', { label: 'tne', detail: 'throw new Error', type: 'keyword' }),
  snippetCompletion('class ${1:Name}Error extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \'${1:Name}Error\';\n  }\n}', { label: 'custerr', detail: 'custom Error class', type: 'class' }),

  // ── DOM ──
  snippetCompletion('document.getElementById(\'${1:id}\')', { label: 'gid', detail: 'getElementById', type: 'function' }),
  snippetCompletion('document.querySelector(\'${1:selector}\')', { label: 'qs', detail: 'querySelector', type: 'function' }),
  snippetCompletion('document.querySelectorAll(\'${1:selector}\')', { label: 'qsa', detail: 'querySelectorAll', type: 'function' }),
  snippetCompletion('document.createElement(\'${1:div}\')', { label: 'ce', detail: 'createElement', type: 'function' }),
  snippetCompletion('document.createDocumentFragment()', { label: 'frag', detail: 'createDocumentFragment', type: 'function' }),
  snippetCompletion('${1:el}.classList.add(\'${2:class}\')', { label: 'cla', detail: 'classList.add', type: 'function' }),
  snippetCompletion('${1:el}.classList.remove(\'${2:class}\')', { label: 'clr', detail: 'classList.remove', type: 'function' }),
  snippetCompletion('${1:el}.classList.toggle(\'${2:class}\')', { label: 'clt', detail: 'classList.toggle', type: 'function' }),
  snippetCompletion('${1:el}.classList.contains(\'${2:class}\')', { label: 'clc', detail: 'classList.contains', type: 'function' }),
  snippetCompletion('${1:el}.setAttribute(\'${2:attr}\', \'${3:value}\')', { label: 'setattr', detail: 'setAttribute', type: 'function' }),
  snippetCompletion('${1:el}.getAttribute(\'${2:attr}\')', { label: 'getattr', detail: 'getAttribute', type: 'function' }),
  snippetCompletion('${1:el}.removeAttribute(\'${2:attr}\')', { label: 'rmattr', detail: 'removeAttribute', type: 'function' }),
  snippetCompletion('${1:el}.textContent = \'${2}\';', { label: 'tc', detail: 'textContent', type: 'property' }),
  snippetCompletion('${1:el}.innerHTML = \'${2}\';', { label: 'ih', detail: 'innerHTML', type: 'property' }),
  snippetCompletion('${1:el}.style.${2:property} = \'${3:value}\';', { label: 'style', detail: 'el.style', type: 'property' }),
  snippetCompletion('${1:parent}.appendChild(${2:child})', { label: 'apc', detail: 'appendChild', type: 'function' }),
  snippetCompletion('${1:parent}.removeChild(${2:child})', { label: 'rmc', detail: 'removeChild', type: 'function' }),
  snippetCompletion('${1:el}.insertAdjacentHTML(\'${2:beforeend}\', \'${3:html}\')', { label: 'iah', detail: 'insertAdjacentHTML', type: 'function' }),
  snippetCompletion('${1:el}.closest(\'${2:selector}\')', { label: 'closest', detail: 'closest', type: 'function' }),
  snippetCompletion('${1:el}.matches(\'${2:selector}\')', { label: 'matches', detail: 'matches', type: 'function' }),
  snippetCompletion('${1:el}.getBoundingClientRect()', { label: 'gbcr', detail: 'getBoundingClientRect', type: 'function' }),
  snippetCompletion('${1:el}.scrollIntoView({ behavior: \'smooth\' })', { label: 'scroll', detail: 'scrollIntoView', type: 'function' }),

  // ── Events ──
  snippetCompletion('document.addEventListener(\'DOMContentLoaded\', () => {\n  ${1}\n});', { label: 'ready', detail: 'DOMContentLoaded', type: 'function' }),
  snippetCompletion('${1:el}.addEventListener(\'${2:click}\', (${3:e}) => {\n  ${4}\n});', { label: 'ael', detail: 'addEventListener', type: 'function' }),
  snippetCompletion('${1:el}.removeEventListener(\'${2:click}\', ${3:handler});', { label: 'rel', detail: 'removeEventListener', type: 'function' }),
  snippetCompletion('${1:e}.preventDefault();', { label: 'epd', detail: 'preventDefault', type: 'function' }),
  snippetCompletion('${1:e}.stopPropagation();', { label: 'esp', detail: 'stopPropagation', type: 'function' }),
  snippetCompletion('window.addEventListener(\'${1:resize}\', (${2:e}) => {\n  ${3}\n});', { label: 'wael', detail: 'window event', type: 'function' }),
  snippetCompletion('new CustomEvent(\'${1:name}\', { detail: ${2:data} })', { label: 'cevt', detail: 'CustomEvent', type: 'function' }),
  snippetCompletion('${1:el}.dispatchEvent(new CustomEvent(\'${2:name}\', { detail: ${3:data} }));', { label: 'dispatch', detail: 'dispatchEvent', type: 'function' }),

  // ── Async / Promises ──
  snippetCompletion('const ${1:name} = new Promise((resolve, reject) => {\n  ${2}\n});', { label: 'prom', detail: 'new Promise', type: 'function' }),
  snippetCompletion('Promise.all([${1}]).then((${2:results}) => {\n  ${3}\n});', { label: 'pall', detail: 'Promise.all', type: 'function' }),
  snippetCompletion('Promise.allSettled([${1}]).then((${2:results}) => {\n  ${3}\n});', { label: 'palls', detail: 'Promise.allSettled', type: 'function' }),
  snippetCompletion('Promise.race([${1}]).then((${2:result}) => {\n  ${3}\n});', { label: 'prace', detail: 'Promise.race', type: 'function' }),
  snippetCompletion('await Promise.all([${1}]);', { label: 'apall', detail: 'await Promise.all', type: 'function' }),
  snippetCompletion('${1:promise}.then((${2:result}) => {\n  ${3}\n}).catch((${4:err}) => {\n  ${5}\n});', { label: 'then', detail: '.then/.catch', type: 'function' }),

  // ── Fetch / Network ──
  snippetCompletion('fetch(\'${1:url}\')\n  .then(res => res.json())\n  .then(data => {\n    ${2}\n  })\n  .catch(err => console.error(err));', { label: 'fetch', detail: 'fetch API', type: 'function' }),
  snippetCompletion('const ${1:res} = await fetch(\'${2:url}\');\nconst ${3:data} = await ${1:res}.json();', { label: 'afetch', detail: 'async fetch', type: 'function' }),
  snippetCompletion('const ${1:res} = await fetch(\'${2:url}\', {\n  method: \'POST\',\n  headers: { \'Content-Type\': \'application/json\' },\n  body: JSON.stringify(${3:data}),\n});\nconst ${4:result} = await ${1:res}.json();', { label: 'fpost', detail: 'fetch POST', type: 'function' }),
  snippetCompletion('const ${1:res} = await fetch(\'${2:url}\', {\n  method: \'${3:PUT}\',\n  headers: { \'Content-Type\': \'application/json\' },\n  body: JSON.stringify(${4:data}),\n});', { label: 'fput', detail: 'fetch PUT/PATCH', type: 'function' }),
  snippetCompletion('const ${1:res} = await fetch(\'${2:url}\', { method: \'DELETE\' });', { label: 'fdel', detail: 'fetch DELETE', type: 'function' }),

  // ── Timers ──
  snippetCompletion('setTimeout(() => {\n  ${1}\n}, ${2:1000});', { label: 'sto', detail: 'setTimeout', type: 'function' }),
  snippetCompletion('setInterval(() => {\n  ${1}\n}, ${2:1000});', { label: 'si', detail: 'setInterval', type: 'function' }),
  snippetCompletion('clearTimeout(${1:timer});', { label: 'cto', detail: 'clearTimeout', type: 'function' }),
  snippetCompletion('clearInterval(${1:timer});', { label: 'ci', detail: 'clearInterval', type: 'function' }),
  snippetCompletion('requestAnimationFrame(${1:callback});', { label: 'raf', detail: 'requestAnimationFrame', type: 'function' }),

  // ── Classes ──
  snippetCompletion('class ${1:Name} {\n  constructor(${2}) {\n    ${3}\n  }\n\n  ${4:method}(${5}) {\n    ${6}\n  }\n}', { label: 'class', detail: 'class', type: 'class' }),
  snippetCompletion('class ${1:Name} extends ${2:Base} {\n  constructor(${3}) {\n    super(${4});\n    ${5}\n  }\n}', { label: 'classex', detail: 'class extends', type: 'class' }),
  snippetCompletion('get ${1:name}() {\n  return this.${2:_name};\n}', { label: 'get', detail: 'getter', type: 'function' }),
  snippetCompletion('set ${1:name}(${2:value}) {\n  this.${3:_name} = ${2:value};\n}', { label: 'set', detail: 'setter', type: 'function' }),
  snippetCompletion('static ${1:name}(${2}) {\n  ${3}\n}', { label: 'static', detail: 'static method', type: 'function' }),
  snippetCompletion('#${1:name} = ${2:value};', { label: 'priv', detail: 'private field', type: 'property' }),

  // ── Modules ──
  snippetCompletion('import ${1:name} from \'${2:module}\';', { label: 'impd', detail: 'import default', type: 'keyword' }),
  snippetCompletion('import { ${2} } from \'${1:module}\';', { label: 'imp', detail: 'import', type: 'keyword' }),
  snippetCompletion('import * as ${1:name} from \'${2:module}\';', { label: 'impa', detail: 'import all', type: 'keyword' }),
  snippetCompletion('import(\'${1:module}\').then(${2:mod} => {\n  ${3}\n});', { label: 'impdy', detail: 'dynamic import', type: 'keyword' }),
  snippetCompletion('const ${1:mod} = await import(\'${2:module}\');', { label: 'aimport', detail: 'async import', type: 'keyword' }),
  snippetCompletion('export default ${1:name};', { label: 'expd', detail: 'export default', type: 'keyword' }),
  snippetCompletion('export const ${1:name} = ${2};', { label: 'expc', detail: 'export const', type: 'keyword' }),
  snippetCompletion('export function ${1:name}(${2}) {\n  ${3}\n}', { label: 'expf', detail: 'export function', type: 'keyword' }),
  snippetCompletion('export { ${1} };', { label: 'exp', detail: 'export', type: 'keyword' }),

  // ── Storage ──
  snippetCompletion('localStorage.setItem(\'${1:key}\', JSON.stringify(${2:value}));', { label: 'lss', detail: 'localStorage set', type: 'function' }),
  snippetCompletion('const ${1:data} = JSON.parse(localStorage.getItem(\'${2:key}\') || \'null\');', { label: 'lsg', detail: 'localStorage get', type: 'function' }),
  snippetCompletion('localStorage.removeItem(\'${1:key}\');', { label: 'lsr', detail: 'localStorage remove', type: 'function' }),
  snippetCompletion('sessionStorage.setItem(\'${1:key}\', JSON.stringify(${2:value}));', { label: 'sss', detail: 'sessionStorage set', type: 'function' }),
  snippetCompletion('const ${1:data} = JSON.parse(sessionStorage.getItem(\'${2:key}\') || \'null\');', { label: 'ssg', detail: 'sessionStorage get', type: 'function' }),

  // ── Patterns ──
  snippetCompletion('/**\n * ${1:Description}\n * @param {${2:type}} ${3:name}\n * @returns {${4:type}}\n */', { label: 'jsdoc', detail: 'JSDoc block', type: 'text' }),
  snippetCompletion('/** @type {${1:type}} */', { label: 'jstype', detail: 'JSDoc @type', type: 'text' }),
  snippetCompletion('const ${1:name} = (() => {\n  ${2}\n})();', { label: 'module', detail: 'module pattern', type: 'function' }),
  snippetCompletion('const ${1:name} = Object.create(null);', { label: 'nullobj', detail: 'null prototype obj', type: 'function' }),
  snippetCompletion('const ${1:name} = new Map();', { label: 'nmap', detail: 'new Map', type: 'function' }),
  snippetCompletion('const ${1:name} = new Set();', { label: 'nset', detail: 'new Set', type: 'function' }),
  snippetCompletion('const ${1:name} = new WeakMap();', { label: 'nwmap', detail: 'new WeakMap', type: 'function' }),
  snippetCompletion('const ${1:name} = new WeakSet();', { label: 'nwset', detail: 'new WeakSet', type: 'function' }),
  snippetCompletion('const ${1:name} = Symbol(\'${2:description}\');', { label: 'sym', detail: 'Symbol', type: 'function' }),
  snippetCompletion('new URL(\'${1:path}\', ${2:window.location.origin})', { label: 'nurl', detail: 'new URL', type: 'function' }),
  snippetCompletion('new URLSearchParams(${1:window.location.search})', { label: 'nurlp', detail: 'URLSearchParams', type: 'function' }),
  snippetCompletion('const ${1:controller} = new AbortController();\nconst ${2:signal} = ${1:controller}.signal;', { label: 'abort', detail: 'AbortController', type: 'function' }),
  snippetCompletion('structuredClone(${1:obj})', { label: 'clone', detail: 'structuredClone', type: 'function' }),
  snippetCompletion('new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      ${1}\n    }\n  });\n}, { threshold: ${2:0.1} });', { label: 'iobs', detail: 'IntersectionObserver', type: 'function' }),
  snippetCompletion('new MutationObserver((mutations) => {\n  mutations.forEach(mutation => {\n    ${1}\n  });\n});', { label: 'mobs', detail: 'MutationObserver', type: 'function' }),
  snippetCompletion('new ResizeObserver((entries) => {\n  for (const entry of entries) {\n    ${1}\n  }\n});', { label: 'robs', detail: 'ResizeObserver', type: 'function' }),
  snippetCompletion('navigator.clipboard.writeText(${1:text});', { label: 'copy', detail: 'clipboard copy', type: 'function' }),
  snippetCompletion('const ${1:text} = await navigator.clipboard.readText();', { label: 'paste', detail: 'clipboard paste', type: 'function' }),

  // ── Regex ──
  snippetCompletion('const ${1:regex} = /${2:pattern}/${3:gi};', { label: 'regex', detail: 'regex literal', type: 'keyword' }),
  snippetCompletion('const ${1:regex} = new RegExp(\'${2:pattern}\', \'${3:gi}\');', { label: 'nregex', detail: 'new RegExp', type: 'function' }),

  // ── Math ──
  snippetCompletion('Math.floor(${1:value})', { label: 'mfloor', detail: 'Math.floor', type: 'function' }),
  snippetCompletion('Math.ceil(${1:value})', { label: 'mceil', detail: 'Math.ceil', type: 'function' }),
  snippetCompletion('Math.round(${1:value})', { label: 'mround', detail: 'Math.round', type: 'function' }),
  snippetCompletion('Math.random()', { label: 'mrand', detail: 'Math.random', type: 'function' }),
  snippetCompletion('Math.floor(Math.random() * ${1:max})', { label: 'mrandint', detail: 'random integer', type: 'function' }),
  snippetCompletion('Math.max(${1:a}, ${2:b})', { label: 'mmax', detail: 'Math.max', type: 'function' }),
  snippetCompletion('Math.min(${1:a}, ${2:b})', { label: 'mmin', detail: 'Math.min', type: 'function' }),
  snippetCompletion('Math.abs(${1:value})', { label: 'mabs', detail: 'Math.abs', type: 'function' }),

  // ── Date ──
  snippetCompletion('new Date()', { label: 'ndate', detail: 'new Date', type: 'function' }),
  snippetCompletion('Date.now()', { label: 'dnow', detail: 'Date.now', type: 'function' }),
  snippetCompletion('new Date().toISOString()', { label: 'diso', detail: 'toISOString', type: 'function' }),
  snippetCompletion('new Date().toLocaleDateString(\'${1:en-US}\')', { label: 'dlocale', detail: 'toLocaleDateString', type: 'function' }),

  // ── Debounce / Throttle ──
  snippetCompletion('function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}', { label: 'debounce', detail: 'debounce function', type: 'function' }),
  snippetCompletion('function throttle(fn, limit) {\n  let inThrottle;\n  return (...args) => {\n    if (!inThrottle) {\n      fn(...args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}', { label: 'throttle', detail: 'throttle function', type: 'function' }),
];

// ══════════════════════════════════════════════════════════════
// CSS Snippets
// ══════════════════════════════════════════════════════════════

const extraCssSnippets: Completion[] = [
  snippetCompletion('display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};', { label: 'flex-center', detail: 'flexbox center', type: 'keyword' }),
  snippetCompletion('display: grid;\ngrid-template-columns: ${1:repeat(3, 1fr)};\ngap: ${2:1rem};', { label: 'grid', detail: 'CSS grid', type: 'keyword' }),
  snippetCompletion('@media (max-width: ${1:768px}) {\n  ${2}\n}', { label: 'media', detail: 'media query', type: 'keyword' }),
  snippetCompletion('@keyframes ${1:name} {\n  from { ${2} }\n  to { ${3} }\n}', { label: '@keyframes', detail: 'keyframes', type: 'keyword' }),
  snippetCompletion('transition: ${1:all} ${2:0.3s} ${3:ease};', { label: 'transition', detail: 'transition', type: 'keyword' }),
  snippetCompletion('transform: ${1:translateX(0)};', { label: 'transform', detail: 'transform', type: 'keyword' }),
  snippetCompletion('background: linear-gradient(${1:135deg}, ${2:#000}, ${3:#333});', { label: 'gradient', detail: 'linear gradient', type: 'keyword' }),
  snippetCompletion('box-shadow: ${1:0 4px 6px} rgba(0, 0, 0, ${2:0.1});', { label: 'shadow', detail: 'box shadow', type: 'keyword' }),
  snippetCompletion('border-radius: ${1:8px};', { label: 'radius', detail: 'border radius', type: 'keyword' }),
  snippetCompletion('position: ${1:absolute};\ntop: ${2:0};\nleft: ${3:0};', { label: 'pos', detail: 'position', type: 'keyword' }),
  snippetCompletion('width: 100%;\nmax-width: ${1:1200px};\nmargin: 0 auto;\npadding: 0 ${2:1rem};', { label: 'container', detail: 'container layout', type: 'keyword' }),
  snippetCompletion(':root {\n  --${1:color}: ${2:#000};\n}', { label: ':root', detail: 'CSS variables', type: 'keyword' }),
  snippetCompletion('font-family: ${1:system-ui, -apple-system, sans-serif};\nfont-size: ${2:1rem};\nline-height: ${3:1.5};', { label: 'font', detail: 'font stack', type: 'keyword' }),
  snippetCompletion('* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}', { label: 'reset', detail: 'CSS reset', type: 'keyword' }),
  snippetCompletion('text-overflow: ellipsis;\nwhite-space: nowrap;\noverflow: hidden;', { label: 'truncate', detail: 'text truncate', type: 'keyword' }),
  snippetCompletion('animation: ${1:name} ${2:0.3s} ${3:ease} ${4:forwards};', { label: 'animation', detail: 'animation shorthand', type: 'keyword' }),
  snippetCompletion('place-items: center;', { label: 'center', detail: 'grid place center', type: 'keyword' }),
  snippetCompletion('aspect-ratio: ${1:16} / ${2:9};', { label: 'aspect', detail: 'aspect-ratio', type: 'keyword' }),
  snippetCompletion('backdrop-filter: blur(${1:10px});', { label: 'blur', detail: 'backdrop blur', type: 'keyword' }),
];

// ══════════════════════════════════════════════════════════════
// HTML Snippets
// ══════════════════════════════════════════════════════════════

const extraHtmlSnippets: Completion[] = [
  snippetCompletion('<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${1:Document}</title>\n</head>\n<body>\n  ${2}\n</body>\n</html>', { label: '!', detail: 'HTML5 boilerplate', type: 'keyword' }),
  snippetCompletion('<link rel="stylesheet" href="${1:style.css}">', { label: 'link:css', detail: 'stylesheet link', type: 'keyword' }),
  snippetCompletion('<script src="${1:script.js}"><\/script>', { label: 'script:src', detail: 'script with src', type: 'keyword' }),
  snippetCompletion('<meta name="${1:name}" content="${2:content}">', { label: 'meta', detail: 'meta tag', type: 'keyword' }),
  snippetCompletion('<table>\n  <thead>\n    <tr>\n      <th>${1}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>${2}</td>\n    </tr>\n  </tbody>\n</table>', { label: 'table', detail: 'table element', type: 'keyword' }),
  snippetCompletion('<video src="${1}" controls>${2}</video>', { label: 'video', detail: 'video element', type: 'keyword' }),
  snippetCompletion('<canvas id="${1:canvas}" width="${2:400}" height="${3:300}"></canvas>', { label: 'canvas', detail: 'canvas element', type: 'keyword' }),
  snippetCompletion('<picture>\n  <source srcset="${1}" type="image/${2:webp}">\n  <img src="${3}" alt="${4}">\n</picture>', { label: 'picture', detail: 'picture element', type: 'keyword' }),
  snippetCompletion('<details>\n  <summary>${1:Title}</summary>\n  ${2}\n</details>', { label: 'details', detail: 'details/summary', type: 'keyword' }),
  snippetCompletion('<template id="${1}">\n  ${2}\n</template>', { label: 'template', detail: 'template element', type: 'keyword' }),
];

// ══════════════════════════════════════════════════════════════
// Extension builder
// ══════════════════════════════════════════════════════════════

export function getCompletionExtensions(language: string): Extension[] {
  switch (language) {
    case 'html':
      return [
        htmlLanguage.data.of({ autocomplete: extraHtmlSnippets }),
        autocompletion(),
      ];
    case 'css':
      return [
        cssLanguage.data.of({ autocomplete: extraCssSnippets }),
        autocompletion(),
      ];
    case 'javascript':
    case 'typescript':
      return [
        javascriptLanguage.data.of({ autocomplete: jsSnippets }),
        autocompletion(),
      ];
    default:
      return [autocompletion()];
  }
}
