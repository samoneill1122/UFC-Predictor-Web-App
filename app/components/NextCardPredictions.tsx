'use cache'

import { Box, Flex, Heading, Table} from '@radix-ui/themes'
import FightPredictionTable from './FightPredictionTable'
import axios from 'axios'

const NextCardPredictions = async () => {
    const res1 = await axios.get("https://api.ufcalendar.com/v1/events?org=ufc", {
        headers: {
            Authorization: "Bearer ufcalendar_51ab348a4b3f8b52646d29f2ae8586265f8bb6c4",
            Accept: 'application/json'
        }
    });
    const nextUFCEventId = res1.data.data[0].id;
    
    const res2 = await axios.get("https://api.ufcalendar.com/v1/events/" + nextUFCEventId, {
        headers: {
            Authorization: "Bearer ufcalendar_51ab348a4b3f8b52646d29f2ae8586265f8bb6c4",
            Accept: 'application/json'
        }
    });
    const card = res2.data.data.card;
    const fighters = card.filter((c: any) => c.status !== "cancelled").map((c: any) => ({fighter_b: c.fighter_a.name, fighter_r: c.fighter_b.name, card_section: c.card_section}));

    let fights = []
    for (const f of fighters) {
        console.log(f);
        try {
            const res = await axios.post("http://localhost:8000/predict-fight", {
                fighter_b: f.fighter_b,
                fighter_r: f.fighter_r
            });
            fights.push({
                fightName: `${f.fighter_b} vs. ${f.fighter_r}`,
                prediction: res.data,
                card_section: f.card_section
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status)
                console.error(error.response?.data.detail);
            } else {
                console.error(error);
            }
        } 
    }
    const mainCardFights = fights.filter(f => f.card_section === "main").map(({fightName, prediction}) => ({fightName, prediction}));
    const prelimFights = fights.filter(f => f.card_section !== "main").map(({fightName, prediction}) => ({fightName, prediction}));

  return (
    <div>
        <Heading mb="6" size="8" className='text-center'>Predictions for Next UFC Card</Heading>
        <Flex direction="column" gap="6">
            <Box>
                <FightPredictionTable heading='Main Card' fights={mainCardFights} />
            </Box>
            <Box>
                <FightPredictionTable heading='Prelims' fights={prelimFights} />
            </Box>
        </Flex>
    </div>
  )
}

export default NextCardPredictions