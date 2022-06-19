export default async function getCoord(address, city, state, key){
    const addy = `${address?.split(' ').join('+')},+${city},+${state}`
    const url1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=${key}`
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${key}`
    const response = await fetch(url1)

    if (response.ok) {
        const data = await response.json();
        const newAddy = data.results[0]?.geometry?.location ? data.results[0]?.geometry?.location : { lat: 34.247569, lng: -116.891459 }
        return newAddy;
    }
}