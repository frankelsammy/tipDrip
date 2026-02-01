
import SignupForm from "@/components/SignupForm"
import { Box, Container } from "@chakra-ui/react"

export default function SignupPage() {
  return (
    <Container maxW="lg" centerContent py={20}>
      <SignupForm />
    </Container>
  )
}