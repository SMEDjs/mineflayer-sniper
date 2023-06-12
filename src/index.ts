import { Bot, createBot } from 'mineflayer';
import { getShotAngle } from "./shoot.ts";
import { ChatMessage } from "prismarine-chat";
import { Entity } from "prismarine-entity";
import { predictNextPosition } from "./predict.ts"

class BotController {
  private bot: Bot;
  private incomingArrow: Entity | null;
  private target: Entity | null;
  private lastTargetPos: Array<any>;

  constructor() {
    this.bot = createBot({
      host: 'SMEDcccccccc.aternos.me',
      username: 'ALPHABET',
      auth: "offline",
      port: 63403,
    });
    this.incomingArrow = null;
    this.target = null;
    this.lastTargetPos = [];
  }

  start() {
    this.bot.once("spawn", this.shoot.bind(this))
    this.bot.on("message", this.handleMessage.bind(this));
    this.bot.on("physicsTick", this.handlePhysicsTick.bind(this));
    this.bot.on("error", this.handleError.bind(this));
    setInterval(() => this.handleTimeTick(), 100)
  }

  shoot() {
    setInterval(async () => {
      if (!this.target) return this.bot.chat("No player found.");
      this.bot.activateItem();
      await this.wait(1200)
      const { pitch, yaw } = getShotAngle(this.bot, this.target, this.lastTargetPos);
      this.bot.look(yaw, pitch, true);
      await this.wait(100)
      this.bot.deactivateItem();
      this.bot.chat("Shot!");
    }, 1500)
  }

  async handleMessage(msg: ChatMessage) {
   
  }

  handleTimeTick() {
    if(!this.target) return;
    this.lastTargetPos.push(this.target.position.clone())
    if(this.lastTargetPos.length > 5) this.lastTargetPos.shift()
  }

  handlePhysicsTick() {
    this.target = this.bot.nearestEntity(e => e.type === "player");
    this.incomingArrow = this.bot.nearestEntity(entity => entity.name === 'arrow');
  }

  handleError(err: Error) {
    console.log(err);
  }

  wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
  
}

const botController = new BotController();
botController.start();
