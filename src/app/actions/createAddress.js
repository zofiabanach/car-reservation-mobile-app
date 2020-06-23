import axios from 'axios';

import { API_URL } from '../../utils';
import { createAddressMutation } from '../../queries';

export default async ({ state, props }) => {

    const query = createAddressMutation;
    const variables = props.address;
    try {
        const response = await axios.post(API_URL, {
            query,
            variables
        });

        const addressId = response.data.data.createAddress.id

        return { addressId }

    } catch (error) {
        console.log(error)
    }
}
