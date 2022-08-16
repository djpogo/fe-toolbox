import { basename, extname } from 'path';
import { glob } from 'glob';
import { readFileSync } from 'fs';

export const findContext = (pagePath) => {
    let returnData = {};
    // strip system path /view/ and file extension from pagePath
    const page = pagePath.replace('/views/', '').replace(extname(pagePath), '');
    
    // find all json files and keep only global.* or [page].*
    const jsonFiles = glob.sync('./src/json/**/*.json')
        .filter(jsonFile => jsonFile.includes('global') || jsonFile.includes(page))
        .map(jsonFile => [jsonFile.replace('./src/json/', ''), jsonFile])
        // sort json file loading order
        // # global.json
        // # global.<scope>.json
        // # global.<scope2>.json
        // # <page>.json
        // # <page>.<scope>.json
        // # <page>.<scope2>.json
        .sort(([a], [b]) => a.match(/\./g).length > b.match(/\./g).length ? 1 : 0)
        .sort(([a], [b]) => a.includes('global') ? 1 : 0);

    // load json files
    jsonFiles.forEach(jsonFile => {
        const data = JSON.parse(readFileSync(jsonFile[1]));
        const fileName = basename(jsonFile[0]);
        
        // if more than 1 colon, this is a scope file
        if (fileName.match(/\./g).length > 1) {
            returnData[fileName.split('.')[1]] = data;
        } else {
            returnData = {
                ...returnData,
                ...data,
            };
        }        
    });
    return returnData;
}