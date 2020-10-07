
export enum LogType{
  info,
  warn,
  error
}

export default function logger(
  message:string,
  logType:LogType=LogType.info
){
  switch(logType){
    case LogType.error:
      console.error(`[ERROR] ${message}`)
      break;
    case LogType.warn:
      console.log(`[WARNING] ${message}`)
      break;
    default:
      console.log(`[INFO] ${message}`)
  }
}
