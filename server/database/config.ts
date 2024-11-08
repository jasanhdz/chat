import { config } from "@/config";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(config.DB_CNN_STRING)

    console.log('db online')
  } catch (error) {
    console.error(error)
    throw new Error('Error en la bse de datos - vea logs')
  }
}
