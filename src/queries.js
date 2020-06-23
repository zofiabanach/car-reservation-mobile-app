export const getCarsQuery = `query {
        cars {
          id,
          name,
          registration,
          office {
            name,
          }
    }
}`

export const getPersonByEmailQuery = `query 
  person($email: String!) {
  person (email: $email) {
    id, name, surname, email, office_id,
    office {
      name
    }
  }
}`

export const createAddressMutation = `mutation 
  createNewAddress($address: String, $postal_code: String, $city: String, $country: String, $lat: String, $lng:String){
  createAddress(address: $address, postal_code: $postal_code, city: $city, country:$country, lat: $lat, lng: $lng){
      id, 
      address, 
      postal_code, 
      city, 
      country, 
      lat, 
      lng
  }
}`

export const createReservationMutation = `mutation 
  createNewReservation($carId: ID!, $personId: ID!, $startAt: String!, $endAt: String!){
  createReservation(car_id: $carId, person_id: $personId, start_at: $startAt, end_at:$endAt){
      id,
      person {
          name, surname
      },
      car {
          name, registration
      },
      start_at, end_at
  }
}`

export const createTravelPlanMutation = `mutation 
  CreateNewTravelplan($reservation_id: ID!, $address_id: ID!, $plan_order: Int){
  createTravelplan(reservation_id: $reservation_id, address_id: $address_id, plan_order: $plan_order){
      id,
      plan_order
  }
}`

export const getOfficeWithCarsQuery = `query
  office ($id: ID!) {
  office (id: $id) {
    id,
    name,
    cars {
      id, name, registration
    }
  }
}`

export const getCarByIdQuery = `query 
  car ($id: ID!) {
  car (id: $id) {
    id,
    name,
    registration,
    reservations {
        id, start_at, end_at,
        person {
            name, surname
        }
    },
}
}`

export const isCarAvailableQuery = `query 
  isCarAvailable($startDate: String!, $endDate: String!, $carId: ID!) {
  isCarAvailable(startDate: $startDate, endDate: $endDate, carId: $carId)
 }`

export const createDamageQuery = ` mutation 
        createDamage($car_id: ID!, $person_id: ID!, $photo: Upload, $description: String, $damaged_at: String) {
        createDamage(car_id: $car_id, person_id: $person_id, photo: $photo, description: $description, damaged_at: $damaged_at) {
          id,
          car {
              name, registration
          },
          description
        }
      }
    `