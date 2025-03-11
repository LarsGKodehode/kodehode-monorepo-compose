/**
 * The shape of the User type
 */
type User = {
  id: ReturnType<typeof crypto.randomUUID>,
  alias: string,
  avatar: URL,
}

/**
 * The shape of a ChatMessage
 */
type ChatMessage = {
  sender: User,
  timeStamp: Date,
  content: string,
}
