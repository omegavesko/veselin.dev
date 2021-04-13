/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/styles/global.css"
import "@fontsource/fira-sans"
import "@fontsource/fira-sans/500.css"
import "@fontsource/fira-code"

export const onRouteUpdate = ({ location }) => {
  if (process.env.NODE_ENV !== `production`) {
    return null
  }

  const sendPageView = () => {
    const pagePath = location
      ? location.pathname + location.search + location.hash
      : undefined

    fetch("/.netlify/functions/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "pageview",
        params: {
          dh: window.location.hostname,
          dp: pagePath,
          dt: document.title,
          dr: document.referrer,
        },
      }),
    })
  }

  // wrap inside a timeout to make sure react-helmet is done with its changes (https://github.com/gatsbyjs/gatsby/issues/11592)

  if (`requestAnimationFrame` in window) {
    requestAnimationFrame(() => {
      requestAnimationFrame(sendPageView)
    })
  } else {
    // simulate 2 rAF calls
    setTimeout(sendPageView, 32)
  }

  return null
}
