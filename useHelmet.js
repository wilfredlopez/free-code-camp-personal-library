const helmet = require("helmet");

function useHelmet(app) {
  app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));

  app.use(helmet.frameguard({ action: "deny" }));

  app.use(helmet.xssFilter());

  app.use(helmet.noSniff());

  app.use(helmet.ieNoOpen());

  //   var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
  //   app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));

  //   app.use(helmet.dnsPrefetchControl());

  app.use(helmet.noCache());
  // app.use(
  //   helmet.contentSecurityPolicy({
  //     directives: {
  //       defaultSrc: ["'self'"],
  //       scriptSrc: ["'self'", "trusted-cdn.com"]
  //     }
  //   })
  // );
}
module.exports = useHelmet;
