import Head from 'next/head';
import Link from 'next/link';
import {Button} from "@/components/ui/button";

const About = () => {
    return (
        <>
            <Head>
                <title>About Us</title>
                <meta name="description" content="Learn more about us and our AI chat webapp." />
            </Head>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mt-12 mb-4">About Us</h1>
                <p className="text-lg mb-4">
                    Welcome to our AI chat webapp! We are dedicated to providing an intelligent and interactive chat experience.
                </p>
                <p className="text-lg mb-4">
                    Our mission is to enhance communication through advanced AI technology. Our team is passionate about
                    creating tools that make interaction seamless and engaging.
                </p>
                <Button href="/">Back to Home</Button>
            </div>
        </>
    );
};

export default About;
