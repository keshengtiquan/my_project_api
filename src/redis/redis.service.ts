import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType

  async listGet(key: string){
    return await this.redisClient.lRange(key,0,-1);
  }

  async getHash(key: string){
    return await this.redisClient.hGetAll(key);
  }

  async listSet(key: string, list: string[], ttl?: number){
    for(let i=0; i < list.length; i++){
      await this.redisClient.lPush(key, list[i]);
    }
    if(ttl){
      await this.redisClient.expire(key, ttl);
    }
  }

  async stringSet(key: string, value: string, ttl?: number){
    await this.redisClient.set(key, value);
    if(ttl){
      await this.redisClient.expire(key, ttl);
    }
  }

  async setObject(key: string, obj: any, ttl?: number) {
    
    const objKeys = Object.keys(obj);
    for (let i = 0; i < objKeys.length; i++) {
      const property = objKeys[i];
      let value = obj[property];
      if(value === null) {
        value = ''
      }
      await this.redisClient.hSet(key, property, value);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
  
}
