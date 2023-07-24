import { Card, Stack, CardBody, CardFooter, Heading, Divider, ButtonGroup, Button,Text, Image} from '@chakra-ui/react'
import { Link} from 'react-router-dom';

export const Item = ({name, price, image, id}) => {
  return (
    <div className='divCaard'>
        <Card className='caard' maxW='sm' key={id}>
            <CardBody className='caardInfo'>
                <Image className='caardInfo__img' src={image} alt=''borderRadius='lg'/>
                <Stack mt='6' spacing='3'>
                <Heading size='md'></Heading>
                <h3 className='h3 tittleCard'>
                   {name}
                </h3>
                <Text color='blue.600' fontSize='2xl'>
                    ${price}
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter className='vermas'>
                <ButtonGroup spacing='2'>
                    <Link to={`/item/${id}`}>
                    <Button  variant='solid' colorScheme='blue'>
                        Ver mas
                    </Button>
                    </Link>
                </ButtonGroup>
            </CardFooter>
        </Card>
    </div>
  )
}
