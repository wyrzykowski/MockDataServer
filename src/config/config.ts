const env: string | undefined = process.env.NODE_ENV;
import config from './config.json';

const envConfig: any = config['settings'];
Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
});
