import Navbar from '../components/Navbar.jsx'
import { createStyles, Container, Title, SimpleGrid, Text, Button, Group, Center, Paper } from '@mantine/core'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
    parent: {
        display: 'flex',
        justifyContent: 'center',
    },
    inner: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    subscribers: {
        backgroundColor: theme.colors.indigo,
        width: '50%',
        textAlign: 'center',
        color: 'white'
    },

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
    }

}))

export default function Home() {
    const { classes, cx } = useStyles();

    return (
        <div>
            <Navbar />
            <main className={classes.parent}>
                <div className={classes.inner}>
                    <Title>Dance Workshops</Title>
                    <Text>Use this site to keep track of dance workshops near you</Text>
                    <Paper shadow='xs' p='md' className={classes.subscribers}>Subscribers</Paper>
                    <SimpleGrid cols={4} mt={10}>
                        <Link href="/location/nyc"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/boston"><Paper shadow='xs' className={classes.location}>Boston</Paper></Link>
                        <Link href="/location/philly"><Paper shadow='xs' className={classes.location}>Philadelphia</Paper></Link>
                        <Link href="/location/san-diego"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/san-francisco"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/dc"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/nyc"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                        <Link href="/location/nyc"><Paper shadow='xs' className={classes.location}>New York</Paper></Link>
                    </SimpleGrid>
                </div>
            </main>
        </div>
    )
}
