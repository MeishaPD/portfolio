export function sanitizeMarkdown(text: string) {
  if (!text) return ''

  const processedText = text.replace(/```[\s\S]*?```/g, (match) => {
    const content = match.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '')

    if (content.includes('![') && content.includes('](')) {
      return content.trim()
    }

    return content.trim()
  })

  const final = processedText
    .replace(/!\((.*?)\)\[(.*?)\]/g, '![$1]($2)')
    .replace(/!\[(.*?)\]\s*\(\s*(.*?)\s*\)/g, '![$1]($2)')
    .replace(/\n{3,}/g, '\n\n')

  return final
}
