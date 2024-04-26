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
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });
    }, []);

    const handleRegistration = () => {
        if (
            name != '' &&
            email != '' &&
            password != '' &&
            confirmPassword != '' &&
            password == confirmPassword
        ) {
            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    const user = userCredential.user;

                    updateProfile(auth.currentUser, {
                        displayName: name
                    });

                    navigate('/');
                }
            )
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
            <Text fontSize={'3xl'} color='#4A5568' mb='5'>Create an account</Text>

            {/* Registration Form */}
            <Card>
                <CardBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type='text'
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            value={name}
                        />
                    </FormControl>

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

                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type='password'
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                            value={confirmPassword}
                        />
                    </FormControl>

                    <Button mt='5' colorScheme='twitter' onClick={handleRegistration}>Create account</Button>
                    <Box mt='5'>
                        <Link to='/'>
                            <ChakraLink>Already have an account? Login here.</ChakraLink>
                        </Link>
                    </Box>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Register