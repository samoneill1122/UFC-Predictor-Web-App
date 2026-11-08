'use cache'

import { Box, Flex, Heading, Table} from '@radix-ui/themes'
import FightPredictionTable from './FightPredictionTable'
import axios from 'axios'

const NextCardPredictions = async () => {
    let mainFights: any = []
    let prelimFights: any = []
    try {
        const res = await axios.post("http://localhost:3000/api/predictions");
        mainFights = res.data.main
        prelimFights = res.data.prelims
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
        <Heading mb="6" size="8" className='text-center'>Predictions for Next UFC Card</Heading>
        <Flex direction="column" gap="6">
            <Box>
                <FightPredictionTable heading='Main Card' fights={mainFights} />
            </Box>
            <Box>
                <FightPredictionTable heading='Prelims' fights={prelimFights} />
            </Box>
        </Flex>
    </div>
  )
}

export default NextCardPredictions