
import {kafkaClient} from './kafka-client.js'

async function setup(){
    const admin = kafkaClient.admin();
    try {
        console.log('kafka is connecting')
        await admin.connect();
        console.log('kafka is connected')

        const created = await admin.createTopics({
            topics: [{ topic: 'location-Update', numPartitions: 2 }]
        })
        console.log('createTopics result:', created)
    } catch (err) {
        console.error('kafka admin error:', err)
    } finally {
        await admin.disconnect().catch(()=>{})
    }

}

setup()