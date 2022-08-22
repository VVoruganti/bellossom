import Navbar from "../components/Navbar.jsx"
import Passage from '@passageidentity/passage-node';
import { useEffect } from 'react';

export default function Profile({ isAuthorized, appID }) {

    useEffect(() => {
        require('@passageidentity/passage-elements/passage-profile');
    }, []);

    const authorizedBody = <passage-profile app-id={appID}></passage-profile>
    const unauthorizedBody = <></>

    return (
        <>
            <Navbar isAuthorized={isAuthorized} />
            <div >
                <div >
                    {isAuthorized ? authorizedBody : unauthorizedBody}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    // getServerSideProps runs server-side only and will never execute on the client browser
    // this allows the safe use of a private Passage API Key
    const appID = process.env.NEXT_PUBLIC_PASSAGE_APP_ID;
    const passage = new Passage({
        appID,
        apiKey: process.env.PASSAGE_API_KEY,
        authStrategy: "HEADER",
    });
    try {
        const authToken = context.req.cookies['psg_auth_token'];
        const req = {
            headers: {
                authorization: `Bearer ${authToken}`,
            },
        };
        const userID = await passage.authenticateRequest(req);
        if (userID) {
            return { props: { isAuthorized: true, appID: appID } };
        } else {
            return {
                redirect: {
                    statusCode: 302,
                    destination: '/auth'
                }
            }
        }
    } catch (error) {
        // authentication failed
        return { props: { isAuthorized: false, appID: appID } };
    }
}
