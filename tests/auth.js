import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
require('dotenv').config()

const client = jwksClient({
  jwksUri: process.env.AUTH_DOMAIN,
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function(err, key) {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

export const verifyAuth0Token = async token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(decoded);
    });
  });
};
