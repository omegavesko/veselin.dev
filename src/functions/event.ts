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

  // Override user agent

  analyticsRequestBody.append("ua", event.headers["user-agent"])

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
