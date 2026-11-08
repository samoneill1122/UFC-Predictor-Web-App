import axios from "axios";

export async function getNextUFCEventId() {
    try {
        const res = await axios.get("https://api.ufcalendar.com/v1/events?org=ufc", {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                Accept: 'application/json'
            }
        });
        return res.data.data[0].id
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
    }
}