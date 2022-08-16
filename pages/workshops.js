import Navbar from '../components/Navbar.jsx'
import {
    createStyles,
    Container,
    Switch,
    Title,
    Spoiler,
    Text,
    Image,
    Card,
    Group,
    Table,
    Button,
    SimpleGrid,
    Badge,
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
    },

    gallery: {
        paddingTop: theme.spacing.md,
        width: '100%',
    }

}))

export default function Workshops({ workshops }) {
    const [tableOrGrid, setTableOrGrid] = useState(true)

    const { classes } = useStyles();

    let table = [];
    let grid = [];

    for (const workshop of workshops) {
        table.push(
            <tr key={workshop.id}>
                <td>{workshop.dancer.name}</td>
                <td>{workshop.location.name}</td>
                <td>{(new Date(workshop.date)).toISOString().split("T")[0]}</td>
                <td><Badge color="pink" variant="light">{workshop.type}</Badge></td>
                <td><Button component="a" href={workshop.signup} target="_blank">Sign Up</Button></td>
            </tr>
        )

        grid.push(
            <Card shadow="xs" p="md" >
                <Card.Section component="a" href={workshop.signup} target="_blank">
                    <Image
                        src={workshop.dancer.picture}
                        height={100}
                        alt={workshop.dancer.name}
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{workshop.dancer.name}</Text>
                    <Badge color="pink" variant="light">
                        {workshop.type.toLowerCase()}
                    </Badge>
                </Group>

                <Spoiler maxHeight={72} showLabel="Show More" hideLabel="Hide" size="sm" color="dimmed">
                    {workshop.description}
                </Spoiler>
                <Button variant="light" color="blue" fullWidth mt="md" radius="md" component="a" href={workshop.signup} target="_blank">
                    Sign up now
                </Button>
            </Card>
        )
        // TODO change button text to change based on the full status of the workshop
    }

    const finalTable = (
        <Table>
            <thead>
                <tr>
                    <th>Dancer</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Sign Up Link</th>
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
                        <Title className={classes.title} >All Workshops</Title>
                        <Text color="dimmed" mt="md">Sign up for workshops from reputated dancers in your area, whether you're new or a pro join a community near you.</Text>
                        <div className={classes.gallery}>
                            <Group>
                                <Text>Toggle the view -&gt;</Text>
                                <Switch size='lg' onLabel="Table" offLabel="Grid" checked={tableOrGrid} onChange={(event) => setTableOrGrid(event.currentTarget.checked)} />
                            </Group>
                            {
                                tableOrGrid ?

                                    finalTable

                                    :
                                    finalGrid}
                        </div>
                    </div>
                </Container>
            </main>
        </div >
    )
}

export async function getServerSideProps(context) {

    const workshops = await prisma.workshop.findMany({
        include: {
            location: true,
            dancer: true
        }
    })

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
