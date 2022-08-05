'use strict';
const AWS = require('aws-sdk');

const elasticTranscoder = new AWS.ElasticTranscoder({
    region: 'us-east-1'
});

exports.handler = function(event, context, callback){
    console.log('Welcome');
    
    //Mejorar el manejo de errores
    const key = event.Records[0].s3.object.key;
    
    //the input file may have spaces so replace them with '+'
    const sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));
    
    //remove the extension
    const outputKey = sourceKey.split('.')[0];
    const params = {
        PipelineId: '1657593655194-ls1f2p',
        Input: {
            Key: sourceKey
        },
        Outputs: [
            {
                Key: outputKey + '-1080p' + '.mp4',
                PresetId: '1351620000001-000001' //Generic 1080p
            },
            {
                Key: outputKey + '-720p' + '.mp4',
                PresetId: '1351620000001-000010' //Generic 720p
            },
            {
                Key: outputKey + '-web-720p' + '.mp4',
                PresetId: '1351620000001-100240' //Web Friendly 720p
            }
        ]};
    elasticTranscoder.createJob(params, function (error, data) {
        if (error){
            callback(error);
        }
    });
};