import React, { useState } from 'react';
import { createStyles, Header, Text, Container, Group, Burger } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import Link from 'next/link';
import { NextLink } from '@mantine/next';

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
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
        label: "Find a Workshop",
        link: "/workshops"
    },
    {
        label: "Teachers",
        link: "/locations"
    },
    {
        label: "Contact",
        link: "###"
    },
    {
        label: "Events",
        link: "https://www.notion.so"
    }
]

export default function HeaderSimple() {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <NextLink
            key={link.label}
            href={link.link}
            className={classes.link}
        >
            {link.label}
        </NextLink>
    ));

    return (
        <Header height={60} className={classes.header} >
            <NextLink href="/" style={{ color: 'blue' }}>Dance Planner</NextLink>
            <Group spacing={5} className={classes.links}>
                {items}
            </Group>

            <Burger
                opened={opened}
                onClick={() => toggleOpened()}
                className={classes.burger}
                size="sm"
            />
        </Header>
    );
}
