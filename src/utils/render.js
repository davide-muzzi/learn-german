import DOMPurify from 'dompurify'
import { marked } from 'marked'

export function render(md) {
  return DOMPurify.sanitize(marked(md))
}