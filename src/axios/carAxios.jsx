import axios from 'axios';

axios.defaults.baseURL = "https://localhost:44360"

export async function getAllCars() {
    console.log("cars");
   return await axios.get('/api/Car')
    .then((response) => {
        console.log(response)
        return response.data
    })
    .catch((e) => {
        console.log(e)
        return 0
    })
}


// export async function getCarByName(name) {
//     debugger
//     name=String(name)
//     return await axios.get('/Car/getByName',name)
//      .then((response) => {
//          console.log(response)
//          return response.data
//      })
//      .catch((e) => {
//          console.log(e)
//          return 0
//      })
//  }
 export async function getCarById(id) {
    id=String(id)
    return await axios.get(`/api/Car/${id}`)
     .then((response) => {
         console.log(response)
         return response.data
     })
     .catch((e) => {
         console.log(e)
         return 0
     })
 }

export async function addCar(car) {
   return await axios.post('/api/Car',car)
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((e) => {
            console.log(e)
            return 0
        })
}

export async function deleteCar(carId) {
    await axios.delete('/api/Car',carId)
        .then((response) => {
            return response.data.statusCode
        })
        .catch((e) => {
            console.log(e)
        })
}