import { Kafka } from 'kafkajs'

export const kafkaClient = new Kafka({
    clientId: 'chainClient',
    brokers: ['localhost:9092'],
})