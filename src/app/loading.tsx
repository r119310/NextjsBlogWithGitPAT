import { Main, Section, Side } from "@/components/layout/PageLayout"
import LoadingCircle from "@/components/LoadingCircle"

export default function Loading() {
  return <Main>
    <Side />
    <Section>
      <LoadingCircle />
    </Section>
  </Main>
}