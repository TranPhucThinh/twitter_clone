import dotenv from 'dotenv'
import { Collection, MongoClient, type Db } from 'mongodb'
import User from '~/models/schemas/User.schema'
dotenv.config()

class DatabaseService {
  private client: MongoClient
  private db!: Db

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI as string)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USER_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
