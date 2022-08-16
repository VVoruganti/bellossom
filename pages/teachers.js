import Navbar from '../components/Navbar.jsx'
import {
    createStyles,
    Container,
    Table,
    Spoiler,
    Button,
    SimpleGrid,
    Image,
    Switch,
    Title,
    Text,
    Card,
    Avatar,
    Group
} from '@mantine/core'
import { useState } from 'react';
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

export default function Teachers({ dancers }) {
    const [gridOrTable, setGridOrTable] = useState(true)

    const { classes } = useStyles();

    let table = [];
    let grid = [];

    for (const dancer of dancers) {
        table.push(
            <tr key={dancer.id}>
                <td><Avatar src={dancer.picture} alt={dancer.name} /></td>
                <td>{dancer.name}</td>
                <td>{dancer.website}</td>
                <td>{dancer.email}</td>
            </tr>
        )

        grid.push(
            <Card shadow="xs" p="md" >
                <Card.Section component="a" href={dancer.website} target="_blank">
                    <Image
                        src={dancer.picture}
                        height={100}
                        alt={dancer.name}
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{dancer.name}</Text>
                </Group>

                <Spoiler maxHeight={72} showLabel="Show More" hideLabel="Hide" size="sm" color="dimmed">
                    {dancer.description}
                </Spoiler>
                <Button variant="light" color="blue" fullWidth mt="md" radius="md" component="a" href={dancer.website} target="_blank">
                    Check them out
                </Button>
            </Card>
        )
        // TODO change button text to change based on the full status of the workshop
    }

    const finalTable = (
        <Table>
            <thead>
                <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Website</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
                {table}
            </tbody>
        </Table>);

    const finalGrid = (
        <SimpleGrid cols={3} mt={30}>
            {grid}
        </SimpleGrid>
    );

    return (
        <div>
            <Navbar />
            <main >
                <Container>
                    <div className={classes.inner}>
                        <Title className={classes.title} >All Dancers</Title>
                        <Text color="dimmed" mt="md">Sign up for workshops from reputated dancers in your area, whether you're new or a pro join a community near you.</Text>
                        <div className={classes.gallery}>
                            <Group>
                                <Text>Toggle the view -&gt;</Text>
                                <Switch size='lg' onLabel="Table" offLabel="Grid" checked={gridOrTable} onChange={(event) => setGridOrTable(event.currentTarget.checked)} />
                            </Group>
                            {
                                gridOrTable ?
                                    finalGrid
                                    :
                                    finalTable}
                        </div>
                    </div>
                </Container>
            </main>
        </div >
    )
}

export async function getServerSideProps(context) {

    const dancers = await prisma.dancer.findMany()

    return {
        props: {
            dancers
        }, // will be passed to the page component as props
    }
}
