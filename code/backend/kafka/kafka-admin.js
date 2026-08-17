
import {kafkaClient} from './kafka-client.js'

async function setup(){
    const admin = kafkaClient.admin();
    console.log('kafka is connecting')
    await admin.connect();
    console.log('kafka is connected')

    const created = await admin.createTopics({
        topics: [{ topic: 'location-Update', numPartitions: 2 }]
    })
    console.log('createTopics result:', created)
    await admin.disconnect().catch(()=>{})

}

setup()