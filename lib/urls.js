const { PAYMENT_URL } = process.env;

export const getPaymentUrl = ({ sourceUrl, accountNumber, amount }) =>
  `${PAYMENT_URL}?returnurl=${sourceUrl}&returntext=Back to Order Certificate&ignoreconfirmation=true&data=keep this and return it at the end&payforbasketmode=true&showcontactpage=no&recordxml=<records><record><reference>${accountNumber}</reference><fund>07</fund><amount>${amount}</amount></record></records>`;

export const absoluteUrl = (req, setLocalhost) => {
  var protocol = "https:";
  var host = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host;
  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host,
  };
};

export const getProtocol = () => {
  return process.env.NODE_ENV === "production" ? "https" : "http";
};
