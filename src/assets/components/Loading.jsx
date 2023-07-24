import { Center, Spinner,Stack } from "@chakra-ui/react"

const spinner = () => {
  return (
    <div className="loadiing">
      <Center  w='100%' h='100%'>
        <Stack isInline spacing={4}>
        <Spinner thickness="4px"  speed="0.65s"  emptyColor="gray.200"  color="blue.500"  size="xl"/>
          <h3>Cargando...</h3>
        </Stack>
      </Center>
    </div>
  )
}

export default spinner