import axios from 'axios';
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

import { API_URL } from '../../utils';
import { createDamageQuery } from '../../queries'


export default async ({ props }) => {
    const variables = {
        car_id: props.damage.selectedCar.id,
        person_id: props.userId,
        photo: props.damage.photo,
        description: props.damage.description,
        damaged_at: props.damage.damaged_at
    };
    const query = createDamageQuery;

    try {
        const response = await axios.post(API_URL, {
            query,
            variables
        });

        toast.notify('Damage has been registered', { position: 'bottom' })

    } catch (error) {
        console.log(error);
        toast.notify('Failed to register the damage', { position: 'bottom' })
    }
}