import { useState, useEffect } from 'react';

import {
    FormControl,
    FormLabel,
    Input,
    Heading,
    Container,
    Button,
    Link as ChakraLink,
    Box,
    Card,
    CardBody,
    Text
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });
    }, []);

    const handleLogin = () => {

        if (email != '' && password != '') {
            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/');
                }).catch((error) => {
                    Swal.fire({
                        text: 'Invalid email or password!',
                        icon: "error",
                        confirmButtonColor: "#3085d6"
                    });
                });
        } else {
            Swal.fire({
                text: "There are invalid parameters. Please try again.",
                icon: "error",
                confirmButtonColor: "#3085d6"
            });
        }
    }

    return (
        <Container maxW='1024' p='40'>

            <Heading size='3xl' mb='5'>Welcome to Twitter!</Heading>
            <Text fontSize={'3xl'} color='#4A5568' mb='5'>Login to your account</Text>

            {/* Login Form */}
            <Card>
                <CardBody>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type='email'
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type='password'
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                        />
                    </FormControl>

                    <Button mt='5' colorScheme='twitter' onClick={handleLogin}>Login</Button>
                    <Box mt='5'>
                        <Link to='/register'>
                            <ChakraLink>Don't have an account? Register here.</ChakraLink>
                        </Link>
                    </Box>

                </CardBody>
            </Card>
        </Container>
    )
}

export default Login