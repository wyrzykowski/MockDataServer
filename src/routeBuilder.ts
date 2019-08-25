import express from 'express';
import db from './mockData/db';

const router: express.Router = express.Router();


const getMethod = ( path: any, data: any) => {
    return router.get(path,  ({ }, res: express.Response) => {
        res.send(data);
    });
};

const postMethod = ( path: any, data: any) => {
    return router.post(path,  ({ }, res: express.Response) => {
        res.send(data);
    });
};

const rootRouter = db.map((item, index) => {
    const httpMehod: any = {
         getM: item.endpoint.replace('GET', ''),
         postM: item.endpoint.replace('POST', ''),
         putM: item.endpoint.replace('PUT', ''),
         patchM: item.endpoint.replace('PATCH', ''),
         deleteM:  item.endpoint.replace('DELETE', ''),
         optionsM: item.endpoint.replace('OPTIONS', ''),
         headM: item.endpoint.replace('HEAD', ''),
         connectM: item.endpoint.replace('CONNECT', ''),
         traceM: item.endpoint.replace('TRACE', ''),
    };

    let currentMethod = '';
    Object.keys(httpMehod).forEach((key,index) => {
       if (httpMehod[key] !== item.endpoint) currentMethod = key;
    });
 
    const addressString = httpMehod[currentMethod];
    console.log(addressString)
 
    if(item.options){
        if(item.options.hasOwnProperty('findByParam') && item.options.hasOwnProperty('findBy')) {
            console.log('find by');
        }
    }


    switch (currentMethod) {
        case 'getM' : return getMethod(addressString, item.data );
        case 'postM' : return postMethod(addressString, item.data );
        default: return getMethod(addressString, item.data );
    }
})






export default rootRouter;
