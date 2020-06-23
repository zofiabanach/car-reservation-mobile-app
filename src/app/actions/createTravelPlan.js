import axios from 'axios';

import { API_URL } from '../../utils';
import { createTravelPlanMutation } from '../../queries';

export default async ({ props }) => {
    const travelPlan = {
        reservation_id: props.reservationId,
        address_id: props.addressId,
        plan_order: 1 // TODO Different plan orders
    }

    const query = createTravelPlanMutation;
    const variables = travelPlan;
    try {
        const response = await axios.post(API_URL, {
            query,
            variables
        });

    } catch (error) {
        console.log(error)
    }
}