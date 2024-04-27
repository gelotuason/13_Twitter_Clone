import {
    Container,
    Button,
    Flex,
    Spacer,
    Box,
    Heading,
    Card,
    Text,
    FormControl,
    FormLabel,
    Input,
    Divider
} from "@chakra-ui/react";
import Tweet from './Tweet';
import { useNavigate } from "react-router-dom";
import firebaseApp from './firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, addDoc, collection, Timestamp, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function Home() {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    const [userProfile, setUserProfile] = useState('');
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        // Authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserProfile({
                    email: user.email,
                    name: user.displayName
                })
            } else {
                navigate("/login");
            }
        });

        // Retrieve tweets
        onSnapshot(collection(db, "tweets"), snapshot => {
            setTweets(snapshot.docs.map(t => t.data()));
        });


    }, []);

    const formatDate = () => {
        let timestamp = new Date(Timestamp.now().toDate())
        
        let mm = timestamp.getMonth();
        let dd = timestamp.getDate();
        let yyyy = timestamp.getFullYear();

        let formattedTimestamp = `${mm}/${dd}/${yyyy}`;

        return formattedTimestamp;
    }

    const createTweet = () => {
        setButtonLoading(true);
        if (tweet !== '') {

            const tweetData = {
                body: tweet,
                user_email: userProfile.email,
                name: userProfile.name,
                date_posted: formatDate()
            };

            addDoc(collection(db, "tweets"), tweetData).then(() => {
                setTweet('');
                setButtonLoading(false);
            });


        } else {
            alert("Tweet cannot be empty!").then(() => {
                setButtonLoading(false)
            });
        }
    }

    const logout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    }

    return (
        <Container maxW="1024px" pt="100">
            <Heading fontWeight="black" size="3xl" color="#1DA1F2">
                Twitter
            </Heading>
            <Flex>
                <Box w="250px">
                    <Card mt={5} p={5}>
                        <Text fontWeight="bold">{userProfile.name}</Text>
                        <Text>{userProfile.email}</Text>
                        <Button mt={5} size="xs" onClick={logout}>Logout</Button>
                    </Card>
                </Box>
                <Spacer />
                <Box w="700px">
                    <Card mt={5} p={5}>
                        <FormControl>
                            <FormLabel>What's on your mind? 💬</FormLabel>
                            <Input disabled={buttonLoading} type="text" onChange={(e) => { setTweet(e.target.value) }} value={tweet} />
                        </FormControl>
                        <Button isLoading={buttonLoading} w="100px" colorScheme='twitter' mt={3} size="sm" onClick={createTweet}>Tweet</Button>
                    </Card>

                    <Divider my={5}></Divider>

                    {
                        tweets.map((tweetRecord) => (
                            <Tweet
                                key={tweetRecord.id}
                                body={tweetRecord.body}
                                email={tweetRecord.user_email}
                                name={tweetRecord.name}
                                date_posted={tweetRecord.date_posted.toString()}
                            ></Tweet>
                        ))
                    }

                </Box>
            </Flex>
        </Container>
    );
}

export default Home;