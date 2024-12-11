/**
 * 手动实现 logger4js 日志记录功能
 */
import fs from "fs";
import dayjs from "dayjs";
import { LOGGER_CONFIG } from "../../Config";

type LogMessage = string | number | object | unknown;
type LogType = "INFO" | "ERROR" | "WARN" | "DEBUG" | "SUCCESS";

class Logger {
  info(...argus: LogMessage[]) {
    const time = this.getTime();
    console.log("\x1b[94m %s \x1b[0m %s", `[${time}] [INFO] -`, ...argus);
    this.writeLogFile(time, "INFO", ...argus);
  }
  error(...argus: LogMessage[]) {
    const time = this.getTime();
    console.log("\x1b[31m %s \x1b[0m %s", `[${time}] [ERROR] -`, ...argus);
    this.writeLogFile(time, "ERROR", ...argus);
  }
  warn(...argus: LogMessage[]) {
    const time = this.getTime();
    console.log("\x1b[93m %s \x1b[0m %s", `[${time}] [WARN] -`, ...argus);
    this.writeLogFile(time, "WARN", ...argus);
  }
  debug(...argus: LogMessage[]) {
    const time = this.getTime();
    console.log("\x1b[90m %s \x1b[0m %s", `[${time}] [DEBUG] -`, ...argus);
    this.writeLogFile(time, "DEBUG", ...argus);
  }

  success(...argus: LogMessage[]) {
    const time = this.getTime();
    console.log("\x1b[92m %s \x1b[0m %s", `[${time}] [SUCCESS] -`, ...argus);
    this.writeLogFile(time, "SUCCESS", ...argus);
  }

  // 获取时间戳
  private getTime = () => dayjs().format("YYYY-MM-DD HH:MM:ss");

  // 写入日志文件
  private writeLogFile = (
    time: string,
    type: LogType,
    ...argus: LogMessage[]
  ) => {
    const { filepath, filename } = LOGGER_CONFIG;
    const message = argus
      .map((i) => (typeof i === "object" ? JSON.stringify(i) : i))
      .join(" ");

    // 保存日志文件的信息，还可以进行拓展，包括执行当前日志的用户信息等
    const data = `[${time}] [${type}] - ${message}\n`;

    // 尝试查找目录、目录不存在，则自动创建目录
    if (!fs.existsSync(filepath)) fs.mkdirSync(filepath);

    try {
      fs.appendFileSync(filepath + "/" + filename, data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      fs.writeFile(filepath + "/" + filename, data, (err) => {
        logger.error(err!.message.toString());
      });
    }
  };
}

export const logger = new Logger();
