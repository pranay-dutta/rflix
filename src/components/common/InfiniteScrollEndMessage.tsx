import { Heading, Highlight } from '@chakra-ui/react'

const InfiniteScrollEndMessage = () => {
  return (
    <Heading textAlign="center" my={10}>
      <Highlight query={"the end"} styles={{ color: 'red.400' }}>
        You've reached the end 🌟
      </Highlight>
    </Heading>
  )
}

export default InfiniteScrollEndMessage