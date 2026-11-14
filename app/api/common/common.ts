import axios from "axios";

export async function getNextUFCEvent() {
    try {
        const res = await axios.get("https://api.ufcalendar.com/v1/events?org=ufc", {
            headers: {
                Authorization: `Bearer ${process.env.UFC_CALENDAR_API_KEY}`,
                Accept: 'application/json'
            }
        });
        return res.data.data[0];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
    }
}