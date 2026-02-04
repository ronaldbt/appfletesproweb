/**
 * Extrae la tabla de contenidos de un artículo del blog.
 * Prioridad: 1) page.toc (frontmatter), 2) page.body (extracción de headings)
 * Funciona para TODOS los artículos sin necesidad de frontmatter.
 */
export function useArticleToc(page) {
  return computed(() => {
    if (!page?.value) return []

    // 1. Si tiene headings en frontmatter, usarlo
    const frontmatterToc = page.value.headings || page.value.tableOfContents || page.value.toc
    if (Array.isArray(frontmatterToc) && frontmatterToc.length > 0) {
      return frontmatterToc
    }

    // 2. Si body tiene toc.links (generado por Nuxt Content)
    const bodyToc = page.value.body?.toc?.links
    if (Array.isArray(bodyToc) && bodyToc.length > 0) {
      return bodyToc.map(link => ({
        title: link.text || link.title || link.label || '',
        id: link.id || slugify(link.text || link.title || '')
      }))
    }

    // 3. Extraer headings del body (AST)
    const body = page.value.body
    if (!body?.children) return []

    const headings = []
    const extractText = (node) => {
      if (!node) return ''
      if (node.type === 'text' && node.value) return node.value
      if (node.children) {
        return node.children.map(extractText).join('')
      }
      return ''
    }

    const traverse = (nodes) => {
      if (!Array.isArray(nodes)) return
      for (const node of nodes) {
        // hast (HTML AST): type: 'element', tagName: 'h2'
        const tagName = node.tagName || node.tag || ''
        // mdast (Markdown AST): type: 'heading', depth: 2
        const isHeading = ['h2', 'h3'].includes(tagName) || (node.type === 'heading' && [2, 3].includes(node.depth))
        if (isHeading) {
          const text = extractText(node)
          const id = node.properties?.id || (node.data?.id) || slugify(text)
          if (text) headings.push({ title: text, id })
        }
        if (node.children) traverse(node.children)
      }
    }

    traverse(body.children)
    return headings
  })
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
