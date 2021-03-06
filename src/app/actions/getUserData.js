import axios from 'axios';
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

import { API_URL } from '../../utils';
import { getPersonByEmailQuery } from '../../queries';

export default async ({ props, store, path }) => {
    const query = getPersonByEmailQuery;
    const variables = {
        email: props.email
    };

    try {
        const response = await axios.post(API_URL, {
            query,
            variables
        });

        if (response.statusText === "OK" && response.data && response.data.data && response.data.data.person) {
            store.set(`user`, response.data.data.person)
        } else {
            toast.notify('Failed to find user', { position: 'bottom' })
        }

    } catch (error) {
        toast.notify('An error has occured', { position: 'bottom' })
    }
}