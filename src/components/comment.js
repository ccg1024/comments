import { useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import { IconBtn } from "./icon-btn"
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa"
import { usePost } from "../context/post-context"
import { CommentList } from "./comment-list"
import { CommentForm } from "./comment-from"
import { useAsyncFn } from "../hooks/useAsync"
import {
  createComment,
  deleteComment,
  toggleCommentLike,
  updateComment,
} from "../services/comments"
import { useUser } from "../hooks/useUser"

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

export function Comment({ id, message, user, createAt, likeCount, likedByMe }) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const {
    post,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike,
  } = usePost()
  const createCommentFn = useAsyncFn(createComment)
  const updateCommentFn = useAsyncFn(updateComment)
  const deleteCommentFn = useAsyncFn(deleteComment)
  const toggleCommentLikeFn = useAsyncFn(toggleCommentLike)
  const childComments = getReplies(id)
  const currentUser = useUser()

  function onCommentReply(message) {
    return createCommentFn
      .execute({ postId: post.id, message, parentId: id })
      .then((comment) => {
        setIsReplying(false)
        createLocalComment(comment)
      })
  }
  function onCommentUpdate(message) {
    return updateCommentFn
      .execute({ postId: post.id, message, id })
      .then((comment) => {
        setIsEditing(false)
        updateLocalComment(id, comment.message)
      })
  }
  function onCommentDelete() {
    return deleteCommentFn
      .execute({ postId: post.id, id })
      .then((comment) => deleteLocalComment(comment.id))
  }
  function onToggleCommentLike() {
    return toggleCommentLikeFn
      .execute({ id, postId: post.id })
      .then(({ addLike }) => {
        toggleLocalCommentLike(id, addLike)
      })
  }

  return (
    <>
      <Box
        padding={4}
        borderWidth="1px"
        borderStyle="solid"
        borderColor="blue.200"
        borderRadius="md"
        marginY={4}
      >
        <Box as="header" display="flex" justifyContent="space-between">
          <Box as="span" fontWeight="bold">
            {user.name}
          </Box>
          <Box as="span">{dateFormatter.format(Date.parse(createAt))}</Box>
        </Box>

        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={message}
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
          />
        ) : (
          <Box paddingX={2}>{message}</Box>
        )}
        <Box marginTop={2}>
          <IconBtn
            onClick={onToggleCommentLike}
            isLoading={toggleCommentLikeFn.loading}
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? "Unlike" : "Like"}
          >
            {likeCount}
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />
          {user.id === currentUser.id && (
            <>
              <IconBtn
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
              />
              <IconBtn
                isLoading={deleteCommentFn.loading}
                onClick={onCommentDelete}
                Icon={FaTrash}
                aria-label="Delete"
                color="red"
              />
            </>
          )}
        </Box>
      </Box>
      {isReplying && (
        <Box marginLeft={8}>
          <CommentForm
            autoFocus
            loading={createCommentFn.loading}
            error={createCommentFn.error}
            onSubmit={onCommentReply}
          />
        </Box>
      )}
      {childComments?.length > 0 && (
        <>
          <Button
            top={0}
            left="50%"
            transform="translate(-50%, 0)"
            position="absolute"
            display={areChildrenHidden ? "block" : "none"}
            onClick={() => setAreChildrenHidden(false)}
            colorScheme="teal"
            variant="ghost"
          >
            show replay
          </Button>
          <Box
            display={areChildrenHidden ? "none" : "block"}
            position="relative"
          >
            <Box
              paddingLeft={4}
              borderLeft="1px"
              borderStyle="solid"
              borderColor="gray.400"
            >
              <CommentList comments={childComments} />
            </Box>
            <Button
              position="absolute"
              top={0}
              right="50%"
              transform="translate(50%, 0)"
              display={areChildrenHidden ? "none" : "block"}
              onClick={() => setAreChildrenHidden(true)}
              colorScheme="teal"
              variant="ghost"
            >
              hidden reply
            </Button>
          </Box>
        </>
      )}
    </>
  )
}
