import Navbar from '../components/Navbar.jsx'
import { createStyles, Container, List, Title, ThemeIcon, SimpleGrid, Text, Image, Button, Group, Center, Paper } from '@mantine/core'
import { IconCheck } from '@tabler/icons';
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
    /*
    parent: {
        display: 'flex',
        justifyContent: 'center',
    },
*/

    section: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },


    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    /*
    inner: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
*/

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

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 40,
        lineHeight: 1.2,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    /*
    location: {
        width: 150,
        height: 150,
        backgroundColor: theme.colors.violet,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',

        '&:hover': {
            cursor: 'pointer'
        }
    } */

}))

export default function Home() {
    const { classes, cx } = useStyles();

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
            </section>
            <section className={classes.section}>
                <Title>Browse By Location</Title>
            </section>
        </div >
    )
}


/**
 *
 *
 *                     <SimpleGrid cols={4} mt={10}>
                        <Link href="/location/nyc"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/boston"><Paper shadow='xs' className={classes.location}>Boston</Paper></Link>
                        <Link href="/location/philly"><Paper shadow='xs' className={classes.location}>Philadelphia</Paper></Link>
                        <Link href="/location/san-diego"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/san-francisco"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/dc"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/nyc"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/nyc"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                    </SimpleGrid>

    */
