export default async function getCoord(address, city, state){
    const addy = `${address}+${city}+${state}`
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=${process.env.GOOGLE_API}`;
    let results = await fetch(url)
    if (results.ok){
        console.log(results.json())
        // return results.json()
    }
}