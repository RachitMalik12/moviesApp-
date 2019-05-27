
import * as Sentry from '@sentry/browser';

function init(){
    Sentry.init({ dsn: 'https://22b9fd9f7e8a45208982b7add985d675@sentry.io/1468833' });

}

function log(error){
    Sentry.captureException(error); 

}

export default {
    init, 
    log
}; 