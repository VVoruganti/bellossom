import Navbar from '../components/Navbar.jsx'
import {
    createStyles,
    Container,
    Switch, Title, Text, Center, Paper,
    Group
} from '@mantine/core'
import { useState } from 'react';
import Link from 'next/link'
import prisma from '../lib/prisma';

const useStyles = createStyles((theme) => ({

    inner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: theme.spacing.xl,
        alignItems: 'center',
        width: '90%'
    },

    gallery: {
        paddingTop: theme.spacing.md,
        width: '100%',
    }

}))

export default function Workshops({ workshops }) {
    const [tableOrGrid, setTableOrGrid] = useState(true)

    const { classes } = useStyles();

    const workshopCards = workshops.map((workshop, idx) => {
        return (
            // TODO dynamic link generation based on id
            <Link key={idx} href="/workshop/id" passHref>
                <Paper className={classes.location} component="a" shadow='xs' radius="sm" >
                    <Center style={{ width: '100%', height: '100%' }}>
                        <Text color="white" weight={500}><span className={classes.locationHighlight}> {workshop.id}</span></Text>
                    </Center>
                </Paper >
            </Link>
        )
    });

    return (
        <div>
            <Navbar />
            <main >
                <Container>
                    <div className={classes.inner}>
                        <Title className={classes.title} >All Workshops</Title>
                        <Text color="dimmed" mt="md">Sign up for workshops from reputated dancers in your area, whether you're new or a pro join a community near you.</Text>
                        <div className={classes.gallery}>
                            <Group>
                                <Text>Toggle the view -&gt;</Text>
                                <Switch size='lg' onLabel="Table" offLabel="Grid" checked={tableOrGrid} onChange={(event) => setTableOrGrid(event.currentTarget.checked)} />
                            </Group>
                            {
                                tableOrGrid ?
                                    <p>Table</p> :
                                    <p>Grid</p>}
                        </div>
                    </div>
                </Container>
            </main>
        </div >
    )
}

export async function getServerSideProps(context) {

    const workshops = await prisma.workshop.findMany()

    workshops.forEach((workshop) => {
        Object.entries(workshop).forEach(([key, prop]) => {
            if (prop instanceof Date) {
                workshop[key] = prop.toString();
            }
        });
    });

    return {
        props: {
            workshops
        }, // will be passed to the page component as props
    }
}
