import { Heading, Table } from '@radix-ui/themes'
import React from 'react'

interface Props {
    heading: string,
    predictions: Prediction[]
}

interface Prediction {
    id: number,
    fightId: number,
    eventId: number,
    fightTitle: string,
    cardSection: string,
    prediction: string,
    winner: string
}

const FightPredictionTable = ({heading, predictions}: Props) => {
  return (
    <>
        <Heading mb="3" size="5" className='text-center'>{heading}</Heading>
        <Table.Root layout="fixed" className='bg-gray-200 rounded-sm'>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell justify="center">Fight</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify="center">Prediction</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {predictions.map(p => (
                    <Table.Row key={p.id}>
                        <Table.RowHeaderCell justify="center">{p.fightTitle}</Table.RowHeaderCell>
                        <Table.Cell justify="center" className={p.prediction === "Unable to predict" ? "text-red-600" : ""}>{p.prediction}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </>
  )
}

export default FightPredictionTable