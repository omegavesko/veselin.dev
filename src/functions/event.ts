import { Handler, APIGatewayEvent } from "aws-lambda"
import axios from "axios"
import { URLSearchParams } from "url"
import anonymizeIP from "ip-anonymize"
import { getAnonymousUserIdWithSecret } from "anonymous-user-id"

interface RequestBody {
  type: "pageview" | "event"
  params: any
}

interface Response {
  statusCode: number
}

const handler: Handler<APIGatewayEvent, Response> = async event => {
  const body: RequestBody = JSON.parse(event.body)

  const analyticsRequestBody = new URLSearchParams()
  analyticsRequestBody.append("v", "1")

  // enable IP anonymization, even though we're doing it here anyway
  analyticsRequestBody.append("aip", "1")

  analyticsRequestBody.append(
    "uid",
    getAnonymousUserIdWithSecret(process.env.ANONYMOUS_USER_ID_SECRET, {
      domain: event.requestContext.domainName,
      ip: event.headers["client-ip"] ?? event.requestContext.identity.sourceIp,
      userAgent:
        event.headers["user-agent"] ?? event.requestContext.identity.userAgent,
    })
  )

  // Override user agent
  analyticsRequestBody.append("ua", event.headers["user-agent"])

  // Override user IP (but anonymize it first)
  analyticsRequestBody.append("uip", anonymizeIP(event.headers["client-ip"]))

  // Set event data

  analyticsRequestBody.append("tid", process.env.GOOGLE_ANALYTICS_TRACKING_ID)
  analyticsRequestBody.append("t", body.type)

  for (const paramName in body.params) {
    analyticsRequestBody.append(paramName, body.params[paramName])
  }

  // Send event to Google Analytics

  console.log("Sending request to Google Analytics:", analyticsRequestBody)

  const response = await axios.post(
    "https://www.google-analytics.com/collect",
    analyticsRequestBody.toString()
  )

  return { statusCode: 200 }
}

export { handler }
