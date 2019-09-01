import express from 'express';
import db from './mockData/db';

export interface Options{
    findBy?: string;
    findByParam?: string;
}

export interface EndpointBasesWithOption{
    endpointBase: string;
    data: object[];
    options: object[];
}

const router: express.Router = express.Router();
const endpointBasesWithOptions: EndpointBasesWithOption[] = [];



const findParam = (address: string, param: string) => {
    const paramIndex = address.indexOf(param);
    const afterParamString = address.substr(paramIndex);
    const afterParamSlashIndex = afterParamString.indexOf('/');
    const afterParamSlashIndexPosition = (afterParamSlashIndex !== -1) ? afterParamSlashIndex + paramIndex : afterParamSlashIndex;
    return {start: paramIndex, end: afterParamSlashIndexPosition};
}

// If there was no slash
const getValueOfParam = (address: string, paramPosition: any) => {
    if (paramPosition.end !== -1) {
        return address.substr(paramPosition.start, paramPosition.end);
    } else {
        return address.substr(paramPosition.start);
    }
}

const groupEndpoints = (endpointPath: any, data: any, options: any) => {
    const paramPosition = endpointPath.indexOf(':');
    const queryPosition = endpointPath.indexOf('?');
    const endpointBaseEndIndex = paramPosition !== -1 ? paramPosition : queryPosition;
    const endpointBase = endpointBaseEndIndex !== -1 ? endpointPath.substr(0, endpointBaseEndIndex - 1) :  endpointPath;
    const existingEndpoint = endpointBasesWithOptions.find((element) => {
        return element.endpointBase === endpointBase;
    });

    if(existingEndpoint){
        const existingEndpointIndex = endpointBasesWithOptions.indexOf(existingEndpoint);
        endpointBasesWithOptions[existingEndpointIndex].options.push(options);
    }
    else {
        const currentOptions: Options[] = [options];
        const currentData: any[] = [data];
        endpointBasesWithOptions.push({
            endpointBase: endpointBase,
            data: currentData,
            options: currentOptions,
         });
    }
    console.log('exist', existingEndpoint);


    console.log('base:', endpointBase, "koniec");
};

const getMethod = ( path: any, data: any, options: Options) => {
    groupEndpoints(path, data, options );
    return router.get(path,  (req: express.Request, res: express.Response) => {
        // Find By Id
        if(options.hasOwnProperty('findByParam') && options.hasOwnProperty('findBy')) {
            const findByParam: any  = options.findByParam;
            const findBy: any  = options.findByParam;
            const paramPosition = findParam(path, findByParam);
            console.log(paramPosition);
            const paramId = getValueOfParam(req.url, paramPosition);
            console.log("res", paramId);
            const resData = data.items.filter((x: any) => x.id.toString() === paramId);
            if(resData.length){
                res.send(resData[0]); 
            }else{
                res.status(404).send();
            }
            console.log("res", resData);
        }
        // res.send(data);
    });

};

const postMethod = ( path: any, data: any, options: Options) => {
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
    console.log(addressString);
 // TODO: ogarnac opcje, ggy kilka razy podany ten sam path, dorobic zeby szlo po obiekcie w glab
    // if(item.options){
    //     if(item.options.hasOwnProperty('findByParam') && item.options.hasOwnProperty('findBy')) {
    //         console.log('find by', item.options.findBy, item.options.findByParam );
    //         const paramPosition = findParam(addressString, item.options.findByParam );
    //         console.log(paramPosition);
    //     }
    // }

    const options: any = item.hasOwnProperty('options') && item.options;
    switch (currentMethod) {
        case 'getM' : return getMethod(addressString, item.data, options );
        case 'postM' : return postMethod(addressString, item.data, options );
        default: return getMethod(addressString, item.data, options );
    }
})






export default rootRouter;
