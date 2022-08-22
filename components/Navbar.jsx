import React, { useState } from 'react';
import { createStyles, Header, Button, Text, Container, Image, Group, Burger } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { NextLink } from '@mantine/next';
import { Passage } from '@passageidentity/passage-js';



const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[6] : theme.colors.violet[2],
        },
    },
}));

const links = [
    {
        label: "Workshops",
        link: "/workshops"
    },
    {
        label: "Teachers",
        link: "/teachers"
    },
    {
        label: "My Profile",
        link: "/profile"
    },
]

export default function HeaderSimple({ isAuthorized }) {
    const [opened, toggleOpened] = useToggle([false, true]);
    const { classes } = useStyles();

    const router = useRouter()
    const passage = new Passage(process.env.NEXT_PUBLIC_PASSAGE_APP_ID);

    const items = links.map((link) => (
        <NextLink
            key={link.label}
            href={link.link}
            className={classes.link}
        >
            {link.label}
        </NextLink>
    ));

    const signIn = (e) => {
        e.preventDefault();
        router.push('/auth')
    }

    const signOut = (e) => {
        e.preventDefault();
        passage.signOut();
        router.push('/');
    }

    return (
        <Header height={HEADER_HEIGHT} >
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size="sm"
                    />
                    <NextLink href="/" style={{ color: 'blue' }}><Image src="/dummy_logo.svg" width={200} /></NextLink>
                </Group>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Button onClick={isAuthorized ? signOut : signIn}>{isAuthorized ? "Sign Out" : "Sign In"}</Button>
            </Container>
        </Header>
    );
}
