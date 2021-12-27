import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export function readMarkdownLocale(dir) {
  const pt = fs.readFileSync(path.join('content', dir, 'pt-BR.md'), 'utf8')

  const en = fs.readFileSync(path.join('content', dir, 'en-US.md'), 'utf8')

  return {
    'pt-BR': marked(pt),
    'en-US': marked(en),
  }
}
