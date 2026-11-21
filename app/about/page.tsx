import { Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const AboutPage = () => {
  return (
    <div className='mt-7 p-4 bg-gray-200 rounded-sm'>
      <Text size="3">
        <Flex direction="column" gap="4">
          <Text>
            You'll be shocked to hear that UFC Fight Predictor is a website to... predict UFC fights!
          </Text>
          <Text>
            On the home page you will find predictions for the next upcoming UFC card, alongside 
            how confident the model is of the prediction. For example, a confidence of 52% implies a
            close fight that could potentially go either way, whereas a confidence of 80% implies the 
            model thinks it will be a more clear-cut win.
          </Text>
          <Text>
            At the start of every week and after the previous week's card, the current predictions will
            be archived and will appear in the <Link href="/past-predictions" className='text-blue-500'>Past Predictions</Link> page, showing the winner of each bout.
            Predictions will then be made for the next card and will appear on the home page.
          </Text>
          <Text>
            The model used to predict the fights is a work in progress and constantly evolving to hopefully
            produce more reasonable predictions with each iteration. 
          </Text>
          <Text>
            Please note that this site was developed just for fun and should not be taken as any kind
            of betting advice.
          </Text>
        </Flex>
      </Text>
    </div>
  )
}

export default AboutPage