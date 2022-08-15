import Navbar from '../components/Navbar.jsx'
import { createStyles, Container, Box, List, Title, ThemeIcon, BackgroundImage, SimpleGrid, Text, Image, Button, Group, Center, Paper } from '@mantine/core'
import { IconCheck } from '@tabler/icons';
import Link from 'next/link'
import prisma from '../lib/prisma';

const useStyles = createStyles((theme) => ({

    section: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },


    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },

    locationHighlight: {
        position: 'relative',
        backgroundColor: theme.colors.indigo,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 40,
        lineHeight: 1.2,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },


    location: {
        height: 150,
        '&:hover': {
            boxShadow: `${theme.shadows.md} !important`,
            transform: 'scale(1.05)',
            cursor: "pointer",
        },
    }

}))

export default function Home({ locations, workshops }) {
    const { classes } = useStyles();


    const locationCards = locations.map((location, idx) => {
        return (
            // TODO dynamic link generation based on location enum
            <Link key={idx} href="/location/nyc" passHref>
                <BackgroundImage className={classes.location} component="a" src={location.picture} radius="sm" >
                    <Center style={{ width: '100%', height: '100%' }}>
                        <Text color="white" weight={500}><span className={classes.locationHighlight}> {location.name}</span></Text>
                    </Center>
                </BackgroundImage >
            </Link>
        )
    })


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
                        <div className={classes.content}>
                            <Title order={1} className={classes.title} >A <span className={classes.highlight}>Modern</span> way to keep track of Workshops</Title>
                            <Text color="dimmed" mt="md">Sign up for workshops from reputated dancers in your area, whether you're new or a pro join a community near you.</Text>
                            <List
                                mt={30}
                                spacing="sm"
                                size="sm"
                                icon={
                                    <ThemeIcon size={20} radius="xl">
                                        <IconCheck size={12} stroke={1.5} />
                                    </ThemeIcon>
                                }
                            >
                                <List.Item>
                                    <b>Centralized</b> – No need to stalk social media or rely on word of mouth to keep track of events
                                </List.Item>
                                <List.Item>
                                    <b>Discover</b> – Find teachers and styles around you that you've never tried before
                                </List.Item>
                                <List.Item>
                                    <b>Managed Bookings</b> – Sign up straight through the platform and even sign up for <b>waitlists</b>
                                </List.Item>
                            </List>


                        </div>
                        <Image src="/creative_woman.svg" className={classes.image} />
                    </div>
                </Container>
            </main>
            <section className={classes.section}>
                <Container style={{ width: "50%" }}>
                    <Paper shadow="xs" p="md" component="a" href="https://tally.so/r/nrjvXv" target="_blank">
                        <Text align="center" className={classes.highlight}> Click here to sign up for updates on the status of the platform </Text>
                    </Paper>
                </Container>
            </section>
            <section className={classes.section}>
                <Title>Upcoming Events </Title>
                <SimpleGrid cols={3} mt={10} style={{ width: '80%' }}>
                    {workshopCards}
                </SimpleGrid>
            </section>
            <section className={classes.section}>
                <Title>Browse By Location</Title>
                <SimpleGrid cols={3} mt={10} style={{ width: '80%' }}>
                    {locationCards}
                </SimpleGrid>
            </section>
        </div >
    )
}

export async function getServerSideProps(context) {

    const locations = await prisma.location.findMany()
    const workshops = await prisma.workshop.findMany({ take: 6 })

    workshops.forEach((workshop) => {
        Object.entries(workshop).forEach(([key, prop]) => {
            if (prop instanceof Date) {
                workshop[key] = prop.toString();
            }
        });
    });

    return {
        props: {
            locations,
            workshops
        }, // will be passed to the page component as props
    }
}
