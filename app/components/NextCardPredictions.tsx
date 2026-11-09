'use cache'

import { Box, Button, Flex, Heading, Table} from '@radix-ui/themes'
import FightPredictionTable from './FightPredictionTable'
import axios from 'axios'

const NextCardPredictions = async () => {
    let cardTitle = "";
    let mainPredictions: any = [];
    let prelimPredictions: any = [];
    try {
        const res1 = await axios.get("http://localhost:3000/api/next-card");
        cardTitle = res1.data;
        const res2 = await axios.get("http://localhost:3000/api/predictions");
        console.log(res2);
        mainPredictions = res2.data.filter((pred: any) => pred.cardSection === "main");
        prelimPredictions = res2.data.filter((pred: any) => pred.cardSection === "prelims");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
    }

  return (
    <div>
        <Heading mb="2" size="8" className='text-center'>Predictions for Next UFC Card</Heading>
        <Heading mb="6" size="6" className='text-center' color='red'>{cardTitle}</Heading>
        <Flex direction="column" gap="6">
            <Box>
                <FightPredictionTable heading='Main Card' predictions={mainPredictions} />
            </Box>
            <Box>
                <FightPredictionTable heading='Prelims' predictions={prelimPredictions} />
            </Box>
        </Flex>
    </div>
  )
}

export default NextCardPredictions