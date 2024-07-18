//"use server";
import { config } from 'dotenv';
config();


// Then proceed with AWS SDK configuration
import { PollyClient } from "@aws-sdk/client-polly";
//import { fromEnv } from "@aws-sdk/credential-provider-env";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";


const client = new PollyClient({
  region: "us-west-1",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: 'us-west-1' },
    identityPoolId: 'us-west-1:427df643-0d07-4c88-9ff2-3b1203ca384a',
  }),

});

export { client as Polly };
