/**
 * Example of generating basic authentication token
 */
// import { generateToken04 } from './zegoServerAssistant';
import { generateToken04 } from "../../../server/utils/zegoServerAssistant.js/index.js";

// Please modify the appID to your own appId, appid is a number
// For example: 1234567890
const appID = 453556669; // type: number

// Please modify the serverSecret to your own serverSecret, serverSecret is a string
// For example: 'sdfsdfsd323sdfsdf'
const serverSecret = "266a1b3ba729a0580a2119f2964fd4fe";// type: 32 byte length string

// Please modify the userId to the user's user_id
const userId = 'iidri98367';// type: string

const effectiveTimeInSeconds = 3600; //type: number; unit: s; token expiration time, in seconds

// When generating the basic authentication token, the payload needs to be set to an empty string
const payload = ''; 
// Build token 
const token =  generateToken04(appID, userId, serverSecret, effectiveTimeInSeconds, payload);
console.log('token:',token);
