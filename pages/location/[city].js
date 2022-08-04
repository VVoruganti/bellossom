import Navbar from '../../components/Navbar.jsx'
import { createStyles, Table, Title, Group, SimpleGrid, Paper, Text, ScrollArea, MultiSelect } from '@mantine/core'
import { DateRangePicker, DateRangePickerValue, DatePicker } from '@mantine/dates';
import Link from 'next/link'
import { useRouter } from 'next/router'

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

    filters: {
        marginTop: 15,
        marginBottom: 15,
    },

    dancer: {
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

export default function Location() {
    const { classes, cx } = useStyles();
    const router = useRouter()

    const { city } = router.query

    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>{element.position}</td>
            <td>{element.name}</td>
            <td>{element.symbol}</td>
            <td>{element.mass}</td>
        </tr>
    ));

    const data = [
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'vue', label: 'Vue' },
        { value: 'riot', label: 'Riot' },
        { value: 'next', label: 'Next.js' },
        { value: 'blitz', label: 'Blitz.js' },
    ];

    return (
        <div>
            <Navbar />
            <main className={classes.parent}>
                <div className={classes.inner}>
                    <Title>{city}</Title>
                    <Group position='apart' className={classes.filters}>
                        <Text> Filters: </Text>
                        <MultiSelect
                            data={data}
                            placeholder="Dance Styles"
                        />
                        <DateRangePicker
                            placeholder="Pick dates range"
                        />
                    </Group>
                    <ScrollArea style={{ height: 150, width: '100%' }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Element position</th>
                                    <th>Element name</th>
                                    <th>Symbol</th>
                                    <th>Atomic mass</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </ScrollArea>
                    <SimpleGrid cols={4} mt={30}>
                        <Link href="/dancer/x"><Paper shadow='xs' className={classes.dancer}>Indian Name</Paper></Link>
                        <Link href="/dancer/x"><Paper shadow='xs' className={classes.dancer}>Indian Name</Paper></Link>
                        <Link href="/dancer/x"><Paper shadow='xs' className={classes.dancer}>Indian Name</Paper></Link>
                        <Link href="/dancer/x"><Paper shadow='xs' className={classes.dancer}>Indian Name</Paper></Link>
                        <Link href="/dancer/x"><Paper shadow='xs' className={classes.dancer}>Indian Name</Paper></Link>
                        <Link href="/dancer/x"><Paper shadow='xs' className={classes.dancer}>Indian Name</Paper></Link>
                        <Link href="/dancer/x"><Paper shadow='xs' className={classes.dancer}>Indian Name</Paper></Link>
                        <Link href="/dancer/x"><Paper shadow='xs' className={classes.dancer}>Indian Name</Paper></Link>
                    </SimpleGrid>
                </div>
            </main>
        </div>
    )
}
