import Koa from 'koa';
import cache from 'koa-redis-cache';
import config from '../common/config';
import routes from './routes';

const app = new Koa();
const { REDIS_HOST, REDIS_PORT } = config.redis;

app
    .use(
        cache({
            expire: 5,
            redis: {
                host: REDIS_HOST,
                port: REDIS_PORT
            }
        })
    )
    .use(routes.routes());

export const apiServer = app;
