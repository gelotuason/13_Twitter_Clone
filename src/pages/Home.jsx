import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Container, 
    Button, 
    Flex, 
    Spacer, 
    Heading, 
    Card, 
    Text, 
    FormControl, 
    FormLabel, 
    Input,
} from '@chakra-ui/react';
import Tweet from './Tweet';
import firebaseApp from './firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Home() {

    let navigate = useNavigate();

    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserProfile({
                    email: user.email,
                    name: user.displayName
                })
                console.log(user);
            } else {
                navigate('/login');
            }
        });
    }, []);

    const logout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => {
            navigate('/login');
        });
    }

    return (

        <Container maxW='1024px' pt='100px'>
            <Heading size='3xl' color='#1DA1F2'>Twitter</Heading>
            <Flex>
                <Box w='250px'>
                    <Card mt='5' p='5'>
                        <Text fontWeight='bold'>{userProfile.name}</Text>
                        <Text>{userProfile.email}</Text>
                        <Button mt='3' size='xs' onClick={logout}>Logout</Button>
                    </Card>
                </Box>
                <Spacer />
                <Box w='700px'>
                    <Card mt='5' p='5'>
                        <FormControl>
                            <FormLabel>What's on your mind?</FormLabel>
                            <Input type='text' />
                        </FormControl>
                        <Button w='100px' mt='3' size='sm' colorScheme='twitter'>Tweet</Button>
                    </Card>

                    <Tweet></Tweet>

                </Box>
            </Flex>
        </Container>

    )
}

export default Home;