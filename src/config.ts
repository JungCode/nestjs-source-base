import 'dotenv/config';

export const config = {
  apiKey: {
    internalApiKey: process.env.INTERNAL_API_KEY || '',
  },
  app: {
    clientDomain: process.env.CLIENT_DOMAIN,
    domain: process.env.APP_DOMAIN || '',
    env: process.env.APP_ENV || 'local',
    googleMapKey: process.env.VITE_GOOGLE_MAPS_API_KEY,
    logLevel: process.env.APP_LOG_LEVEL || 'info',
    port: Number(process.env.APP_PORT || 3000),
    serverDomain: process.env.SERVER_DOMAIN,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    bucket: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
    s3ExpiredTime: Number(process.env.S3_EXPIRED_TIME || 7 * 60 * 60 * 24),
    scheduledJobLambdaArn: process.env.AWS_SCHEDULED_JOB_LAMBDA_ARN,
    schedulerRoleArn: process.env.AWS_SCHEDULER_ROLE_ARN,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    ses: {
      from: process.env.AWS_SES_FROM,
    },
  },
  bcrypt: {
    salt: process.env.SALT_ROUND || 5,
  },
  db: {
    logEnable: process.env.TYPEORM_LOG_ENABLE || 'false',
    typeormCli: process.env.TYPEORM_CLI || 'false',
    url: process.env.POSTGRES_URL || '',
  },
  eTransfer: {
    clientId: process.env.E_TRANSFER_CLIENT_ID,
    clientSecret: process.env.E_TRANSFER_CLIENT_SECRET,
    email: process.env.E_TRANSFER_EMAIL,
    refreshToken: process.env.E_TRANSFER_REFRESH_TOKEN,
    scanEmailNumber: Number(process.env.SCAN_EMAIL_NUMBER || 200),
  },
  jwt: {
    accessTokenTtl: Number(process.env.JWT_ACCESS_TOKEN_TTL || 5 * 60), //  5 minutes
    positionTokenTtl: Number(
      process.env.JWT_POS_TOKEN_TTL || 30 * 24 * 60 * 60,
    ), // 30 days
    refreshTokenTtl: Number(
      process.env.JWT_REFRESH_TOKEN_TTL || 7 * 24 * 60 * 60,
    ), // 7 days
    secret: process.env.JWT_SECRET!,
  },
  otel: {
    exporterOltpCompression:
      process.env.OTEL_EXPORTER_OTLP_COMPRESSION || 'gzip',
    exporterOltpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    exportIntervalMillis: Number(
      process.env.OTEL_METRIC_EXPORT_INTERVAL || 300_000,
    ),
    logLevel: process.env.OTEL_LOG_LEVEL || 'info',
    serviceName: process.env.OTEL_SERVICE_NAME || 'simon-api',
  },
  queue: {
    exportCSVSqsQueueUrl: process.env.EXPORT_CSV_SQS_QUEUE_URL,
    notificationSqsQueueUrl: process.env.NOTIFICATION_SQS_QUEUE_URL,
    reportBusinessStatementSqsQueueUrl:
      process.env.REPORT_BUSINESS_STATEMENT_SQS_QUEUE_URL,
  },
  rateLimit: {
    defaultLimit: Number(process.env.DEFAULT_RATE_LIMIT ?? '10'),
    defaultRateLimitTtlMs: Number(
      process.env.DEFAULT_RATE_LIMIT_TTL ?? '60000',
    ),
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:16379/0',
  },
  reminder: {
    before1Day: Number(process.env.EIGHT_AM_BEFORE_1_DAY_REMINDER || 24 * 60),
    before1Hour: Number(process.env.ONE_HOUR_BEFORE_REMINDER || 60),
    before2Day: Number(
      process.env.EIGHT_AM_BEFORE_2_DAY_REMINDER || 2 * 24 * 60,
    ),
    before7Day: Number(
      process.env.EIGHT_AM_BEFORE_7_DAY_REMINDER || 7 * 24 * 60,
    ),
    before15Min: Number(process.env.FIFTEEN_MIN_BEFORE_REMINDER || 15),
    before20Min: Number(process.env.TWENTY_MIN_BEFORE_REMINDER || 20),
    before30Min: Number(process.env.THIRTY_MIN_BEFORE_REMINDER || 30),
    fifteenMinutes: Number(process.env.FIFTEEN_MINUTES || 15),
    halfHour: Number(process.env.HALF_HOUR || 30),
    next1Hour: Number(process.env.NEXT_1_HOUR_REMINDER || 60),
    next4Hour: Number(process.env.NEXT_4_HOUR_REMINDER || 4 * 60),
    next6Hour: Number(process.env.NEXT_6_HOUR_REMINDER || 6 * 60),
    next24Hour: Number(process.env.NEXT_24_HOUR_REMINDER || 24 * 60),
    next48Hour: Number(process.env.NEXT_48_HOUR_REMINDER || 48 * 60),
    oneHour: Number(process.env.ONE_HOUR || 60),
    thirtyMinutes: Number(process.env.THIRTY_MINUTES || 30),
    twoDayHours: Number(process.env.TWO_DAY_HOURS || 48 * 60),
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },
  sessionTimeout: {
    accountingUser:
      Number(process.env.SESSION_TIMEOUT_BY_ACCOUNTING_USER) || 60 * 60,
    subUser: Number(process.env.SESSION_TIMEOUT_BY_SUB_USER) || 4 * 60 * 60,
    superiorUser:
      Number(process.env.SESSION_TIMEOUT_BY_SUPERIOR_USER) || 2 * 60 * 60,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSigningSecret: process.env.STRIPE_WEBHOOK_SIGNING_SECRET || '',
  },
  tbm: {
    timeOut: Number(process.env.TBM_FORM_TIME_OUT) || 20,
    timeTBMConcerns: Number(process.env.TIME_TBM_CONCERNS) || 30 * 60 * 24,
  },
  territory: {
    numberOfMaxLDUInOneFSA: 200,
  },
  timezone: {
    default: process.env.DEFAULT_TIMEZONE || 'America/Toronto',
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
    appSid: process.env.TWILIO_APP_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    callerId: process.env.TWILIO_CALLER_ID,
    callingTimeOut: Number(process.env.CALLING_TIME_OUT) || 20,
    quebecCallCenter: process.env.QUEBEC_CALL_CENTER,
    recordMaxLength: Number(process.env.RECORD_MAX_LENGTH) || 60, //second
    swCallCenter: process.env.SW_CALL_CENTER,
  },
  twoFactorAuthentication: {
    issuerName: process.env.ISSUER_NAME,
  },
  vapid: {
    vapidMailTo: process.env.VAPID_MAIL_TO,
    vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
    vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
  },
};
