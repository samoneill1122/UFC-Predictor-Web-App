import { Heading, Table } from '@radix-ui/themes'
import React from 'react'

interface Props {
    heading: string,
    fights: Fight[]
}

interface Fight {
    fight_title: string,
    prediction: string
}

const FightPredictionTable = ({heading, fights}: Props) => {
  return (
    <>
        <Heading mb="5" size="5" className='text-center'>{heading}</Heading>
        <Table.Root layout="fixed">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell justify="center">Fight</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify="center">Prediction</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {fights.map(f => (
                    <Table.Row key={f.fight_title}>
                        <Table.RowHeaderCell justify="center">{f.fight_title}</Table.RowHeaderCell>
                        <Table.Cell justify="center">{f.prediction}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </>
  )
}

export default FightPredictionTable