import { Box, Flex, Heading, Table} from '@radix-ui/themes'

const NextCardPredictions = () => {
  return (
    <div>
        <Heading mb="6" size="8" className='text-center'>Predictions for Next UFC Card</Heading>

        <Flex direction="column" gap="6">
            <Box>
                <Heading mb="5" size="5" className='text-center'>Main Card</Heading>
                <Table.Root layout="fixed">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell justify="center">Fight</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell justify="center">Prediction</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Waldo Cortes Acosta vs. Johnny Walker</Table.RowHeaderCell>
                            <Table.Cell justify="center">Johnny Walker</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Tatiana Suarez vs. Virna Jandiroba</Table.RowHeaderCell>
                            <Table.Cell justify="center">Tatiana Suarez</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Davey Grant vs. Elijah Smith</Table.RowHeaderCell>
                            <Table.Cell justify="center">Elijah Smith</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Billy Elikana vs. Lukas Fernando</Table.RowHeaderCell>
                            <Table.Cell justify="center">Lukas Fernando</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Priscilla Cachoera vs. Nina Milosevic</Table.RowHeaderCell>
                            <Table.Cell justify="center">Nina Milosevic</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Mitch Raposo vs. Marcus Degli</Table.RowHeaderCell>
                            <Table.Cell justify="center">Mitch Raposo</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Box>

            <Box>
                <Heading mb="5" size="5" className='text-center'>Prelims</Heading>
                <Table.Root layout="fixed">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell justify="center">Fight</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell justify="center">Prediction</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Waldo Cortes Acosta vs. Johnny Walker</Table.RowHeaderCell>
                            <Table.Cell justify="center">Johnny Walker</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Tatiana Suarez vs. Virna Jandiroba</Table.RowHeaderCell>
                            <Table.Cell justify="center">Tatiana Suarez</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Davey Grant vs. Elijah Smith</Table.RowHeaderCell>
                            <Table.Cell justify="center">Elijah Smith</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Billy Elikana vs. Lukas Fernando</Table.RowHeaderCell>
                            <Table.Cell justify="center">Lukas Fernando</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Priscilla Cachoera vs. Nina Milosevic</Table.RowHeaderCell>
                            <Table.Cell justify="center">Nina Milosevic</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell justify="center">Mitch Raposo vs. Marcus Degli</Table.RowHeaderCell>
                            <Table.Cell justify="center">Mitch Raposo</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Box>
        </Flex>
    </div>
  )
}

export default NextCardPredictions