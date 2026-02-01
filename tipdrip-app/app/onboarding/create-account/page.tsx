"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Center, Spinner, VStack, Text } from "@chakra-ui/react"

export default function OnboardingSetup() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return;

    // 1. If user is NOT logged in, send them to sign-up
    if (!session) {
      router.push("/sign-up");
      return;
    }

    // 2. If user ALREADY has a Stripe account, send them to their history
    if (session.user.stripeAccountId) {
      // Use the user's name or a unique ID for the route
      const username = session.user.username || "user";
      router.push(`/history/${username}`);
      return;
    }

    // 3. Otherwise, create a new Stripe link
    const startStripeOnboarding = async () => {
      try {
        const response = await fetch("/api/create-account", {
          method: "POST",
        });
        const data = await response.json();
        
        if (data.url) {
          window.location.href = data.url;
        }
      } catch (error) {
        console.error("Failed to start onboarding", error);
      }
    };

    startStripeOnboarding();
  }, [session, status, router]);

  return (
    <Center h="100vh">
      <VStack gap={4}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text fontSize="lg" fontWeight="medium">
          Verifying account status...
        </Text>
      </VStack>
    </Center>
  )
}