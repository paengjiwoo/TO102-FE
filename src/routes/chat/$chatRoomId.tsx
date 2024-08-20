import { createFileRoute } from '@tanstack/react-router'

const Chat: React.FC = () => {
  return (
    <div>
      <div>채팅방</div>
      <nav></nav>

      <div></div>

      <div></div>

      <div></div>
    </div>
  )
}
export const Route = createFileRoute('/chat/$chatRoomId')({
  component: Chat
})