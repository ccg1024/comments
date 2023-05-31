import { Fragment } from 'react'
import { usePost } from '../context/post-context'
import { SubComment } from './sub-comment'

export function SubCommentList({ comments, repliedUser }) {
  const { getReplies } = usePost()
  return comments.map(comment => {
    const childComments = getReplies(comment.id)
    return (
      <Fragment key={comment.id}>
        <SubComment {...comment} repliedUser={repliedUser} />

        {childComments?.length > 0 && (
          <SubCommentList comments={childComments} repliedUser={comment.user} />
        )}
      </Fragment>
    )
  })
}
