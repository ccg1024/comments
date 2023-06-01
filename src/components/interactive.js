import { IconBtn } from './icon-btn'
import { usePost } from '../context/post-context'
import { useAsyncFn } from '../hooks/useAsync'
import { useState } from 'react'
import {
  createComment,
  deleteComment,
  toggleCommentLike,
  updateComment
} from '../services/comments'
import { FaHeart, FaRegHeart, FaReply, FaEdit, FaTrash } from 'react-icons/fa'
import { Flex, Box, Text } from '@chakra-ui/react'
import { CommentForm } from './comment-from'
import { useUser } from '../hooks/useUser'

export function CommentInteractive({
  userId,
  likeCount,
  likedByMe,
  message,
  commentId
}) {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const {
    post,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike
  } = usePost()
  const createCommentFn = useAsyncFn(createComment)
  const updateCommentFn = useAsyncFn(updateComment)
  const deleteCommentFn = useAsyncFn(deleteComment)
  const toggleCommentLikeFn = useAsyncFn(toggleCommentLike)
  const currentUser = useUser()

  function onCommentReply(message) {
    return createCommentFn
      .execute({ postId: post.id, message, parentId: commentId })
      .then(comment => {
        setIsReplying(false)
        createLocalComment(comment)
      })
  }
  function onCommentUpdate(message) {
    return updateCommentFn
      .execute({ postId: post.id, message, id: commentId })
      .then(comment => {
        setIsEditing(false)
        updateLocalComment(commentId, comment.message)
      })
  }
  function onCommentDelete() {
    return deleteCommentFn
      .execute({ postId: post.id, id: commentId })
      .then(comment => deleteLocalComment(comment.id))
  }
  function onToggleCommentLike() {
    return toggleCommentLikeFn
      .execute({ id: commentId, postId: post.id })
      .then(({ addLike }) => {
        toggleLocalCommentLike(commentId, addLike)
      })
  }

  return (
    <>
      <Flex justifyContent="right">
        <IconBtn
          onClick={onToggleCommentLike}
          isDisabled={toggleCommentLikeFn.loading}
          Icon={likedByMe ? FaHeart : FaRegHeart}
          aria-label={likedByMe ? 'Unlike' : 'Like'}
        >
          {likeCount}
        </IconBtn>
        <IconBtn
          onClick={() => setIsReplying(prev => !prev)}
          isActive={isReplying}
          Icon={FaReply}
          aria-label={isReplying ? 'Cancel Reply' : 'Reply'}
        />
        {userId === currentUser.id && (
          <>
            <IconBtn
              onClick={() => setIsEditing(prev => !prev)}
              isActive={isEditing}
              Icon={FaEdit}
              aria-label={isEditing ? 'Cancel Edit' : 'Edit'}
            />
            <IconBtn
              isDisabled={deleteCommentFn.loading}
              onClick={onCommentDelete}
              Icon={FaTrash}
              aria-label="Delete"
              color="red"
            />
          </>
        )}
      </Flex>
      {toggleCommentLikeFn.error && (
        <Text marginY={2} fontWeight="bold" color="red">
          Error: {toggleCommentLikeFn.error}
        </Text>
      )}
      {createCommentFn.error && (
        <Text marginY={2} fontWeight="bold" color="red">
          Error: {createCommentFn.error}
        </Text>
      )}
      {updateCommentFn.error && (
        <Text marginY={2} fontWeight="bold" color="red">
          Error: {updateCommentFn.error}
        </Text>
      )}
      {deleteCommentFn.error && (
        <Text marginY={2} fontWeight="bold" color="red">
          Error: {deleteCommentFn.error}
        </Text>
      )}
      {isReplying && (
        <Box marginTop={8}>
          <CommentForm
            autoFocus
            loading={createCommentFn.loading}
            error={createCommentFn.error}
            onSubmit={onCommentReply}
          />
        </Box>
      )}
      {isEditing && (
        <Box marginTop={8}>
          <CommentForm
            autoFocus
            initialValue={message}
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
          />
        </Box>
      )}
    </>
  )
}
