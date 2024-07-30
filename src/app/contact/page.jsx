"use client";
import Head from 'next/head';
import { useState } from 'react';
import {Button} from "@/components/ui/button";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', { name, email, message });
    };

    return (
        <>
            <Head>
                <title>Contact Us</title>
                <meta name="description" content="Get in touch with us for inquiries and support." />
            </Head>
            <div className="container  mx-auto px-4 py-8">
                <h1 className="text-4xl mt-12 font-bold mb-4">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full bg-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full bg-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-lg font-medium mb-1">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="textarea textarea-bordered w-full bg-white"
                            rows="4"
                            required
                        />
                    </div>
                    <Button type="submit" >Send Message</Button>
                </form>
            </div>
        </>
    );
};

export default Contact;
