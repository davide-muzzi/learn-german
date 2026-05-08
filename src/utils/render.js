import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.use({
  gfm: true,       
  breaks: true,     
})

marked.use({
  extensions: [{
    name: 'checkbox',
    level: 'inline',
    start(src) { return src.indexOf('- [') },
    tokenizer(src) {
      const match = src.match(/^- \[( |x)\] (.+)/)
      if (match) return {
        type: 'checkbox',
        raw: match[0],
        checked: match[1] === 'x',
        text: match[2]
      }
    },
    renderer(token) {
      return `<li><input type="checkbox" ${token.checked ? 'checked' : ''} disabled> ${token.text}</li>`
    }
  }]
})

export function render(md) {
  if (!md?.trim()) return ''
  return DOMPurify.sanitize(marked.parse(md), {
    ALLOWED_TAGS: [
      'h1','h2','h3','h4','h5','h6',
      'p','br','hr',
      'strong','em','del','code','pre',
      'ul','ol','li','input',
      'blockquote',
      'a','img',
      'table','thead','tbody','tr','th','td',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'checked', 'disabled', 'type'],
  })
}