import {pgTable,uuid,varchar,text,boolean,timestamp} from "drizzle-orm/pg-core";

export const usersTable = pgTable('users_table',{
  id:uuid("id").primaryKey().defaultRandom(),
  firstName:varchar("first_name",{length:25}).notNull(),
  lastName:varchar("last_name",{length:25}).notNull(),    
  profilePicture:text("profile_picture"),
  email:varchar("email",{length:322}).notNull().unique(),   
  emailVerified:boolean("email_verified").notNull().default(false),
  password:varchar("password",{length:66}).notNull(),
  salt:text("salt").notNull(),
  createdAt:timestamp("created_at",{mode:"string"}).notNull().defaultNow(),
  updatedAt:timestamp("updated_at",{mode:"string"}).$onUpdate(()=>new Date())

});