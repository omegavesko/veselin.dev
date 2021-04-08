import { Handler, APIGatewayEvent } from "aws-lambda"
import axios from "axios"
import { URLSearchParams } from "url"

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

  // Override IP and user agent

  analyticsRequestBody.append("uip", event.headers["client-ip"])
  analyticsRequestBody.append("ua", event.headers["user-agent"])

  // Set event data

  analyticsRequestBody.append("tid", process.env.GOOGLE_ANALYTICS_TRACKING_ID)
  analyticsRequestBody.append("t", body.type)

  for (const paramName in body.params) {
    analyticsRequestBody.append(paramName, body.params[paramName])
  }

  // Send event to Google Analytics

  await axios.post(
    "https://www.google-analytics.com/collect",
    analyticsRequestBody.toString()
  )

  return { statusCode: 200 }
}

export { handler }
