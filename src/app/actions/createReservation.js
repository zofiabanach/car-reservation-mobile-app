import axios from 'axios';
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

import { API_URL } from '../../utils';
import { createReservationMutation } from '../../queries';

export default async ({ props }) => {
    const query = createReservationMutation;
    const variables = props.reservationToSave;
    try {
        const response = await axios.post(API_URL, {
            query,
            variables
        });

        const reservationId = response.data.data.createReservation.id;

        toast.notify('Reservation has been created', { position: 'bottom' })

        return { reservationId }
        
    } catch (error) {
        console.log(error)
        toast.notify('Failed to create a reservation', { position: 'bottom' })
    }
}
