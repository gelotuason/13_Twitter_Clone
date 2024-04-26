import {
    Card, 
    Text,
    Divider 
} from '@chakra-ui/react';

function Tweet() {

    return (
        <Card mt='5' px='5' pb='5' pt='2'>
            <Text fontWeight='bold'>John Doe</Text>
            <Text fontSize='xs' color='gray'>🕛 a few minutes ago</Text>
            <Divider my='5' color='lightgray'></Divider>
            <Text>
                The quick brown
            </Text>
        </Card>
    )
}

export default Tweet;