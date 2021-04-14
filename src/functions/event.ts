import { Handler, APIGatewayEvent } from "aws-lambda"
import axios from "axios"
import { URLSearchParams } from "url"
import * as uuid from "uuid"
import anonymizeIP from "ip-anonymize"

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

  // GA makes us send a cid parameter, so we send a new UUID every time
  // because we don't actually want to track users across requests
  analyticsRequestBody.append("cid", uuid.v4())

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

  console.log("Sending request to Google Analytics:")
  console.log(analyticsRequestBody)

  const response = await axios.post(
    "https://www.google-analytics.com/collect",
    analyticsRequestBody.toString()
  )

  console.log("Received response:")
  console.log(response)

  return { statusCode: 200 }
}

export { handler }
