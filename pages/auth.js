import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
} from '@mantine/core';
import { useEffect } from 'react';


export default function Home() {

    useEffect(() => {
        require('@passageidentity/passage-elements/passage-auth');
    }, []);

    return (
        <div>
            <passage-auth app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-auth>
        </div>
    )
}
