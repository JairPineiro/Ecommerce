import { useAuthContext } from "@/Hook/useAuthContext";

export const Secret = () => {
  const { userPayload } = useAuthContext()
  return (
    <>
      <h1>Secret</h1>
      {
        userPayload.role === 'ADMIN'
        ? <h2> Hola Admin! bienvenido ✋</h2>
        : <h2> Hola Customer! bienvenido ✋  </h2>
      }
    </>
  )
}
