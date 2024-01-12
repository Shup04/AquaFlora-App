import Realm from 'realm'
import { ReminderSchema, TankSchema, WaterParameterSchema } from './schemas'

const realm = new Realm({ 
  schema: [TankSchema, ReminderSchema, WaterParameterSchema], 
  deleteRealmIfMigrationNeeded: true, 
  
});


export default realm;