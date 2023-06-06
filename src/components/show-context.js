import { createElement, Fragment, memo, useEffect, useState } from 'react'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import rehypeReact from 'rehype-react'
import * as remarkTags from './remark-tags'

function transformText(context) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, {
      createElement,
      Fragment,
      passNode: true,
      components: {
        code: remarkTags.RemarkCode,
        p: remarkTags.RemarkText
      }
    })
    .processSync(context).result
}

const ShowContext = memo(({ context }) => {
  const [content, setContent] = useState('')

  useEffect(() => {
    const md = transformText(context)
    setContent(md)
  }, [context])

  return <>{content}</>
})

export default ShowContext
