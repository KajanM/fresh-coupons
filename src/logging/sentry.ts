import * as Sentry from "@sentry/react";
import {Integrations} from "@sentry/tracing";
import {config} from "../config/config";

Sentry.init({
  environment: config.environment,
  dsn: config.sentryDsn,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: .5,
});
