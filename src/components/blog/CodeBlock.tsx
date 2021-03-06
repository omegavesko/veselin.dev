import * as React from "react"
import Highlight, { defaultProps, PrismTheme } from "prism-react-renderer"
import darkTheme from "prism-react-renderer/themes/vsDark"
import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined"
  ? (global as any)
  : (window as any)
).Prism = Prism

// Import additional language definitions not included by default in prism-react-renderer
// https://github.com/FormidableLabs/prism-react-renderer#faq

require("prismjs/components/prism-php")
require("prismjs/components/prism-csharp")
require("prismjs/components/prism-docker")
require("prismjs/components/prism-http")
require("prismjs/components/prism-ini")
require("prismjs/components/prism-neon")
require("prismjs/components/prism-nginx")
require("prismjs/components/prism-twig")
require("prismjs/components/prism-toml")

const lightTheme: PrismTheme = {
  plain: {
    color: "#000000",
    backgroundColor: "#F9FAFB",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "rgb(0, 128, 0)",
      },
    },
    {
      types: ["builtin"],
      style: {
        color: "rgb(0, 112, 193)",
      },
    },
    {
      types: ["number", "variable", "inserted"],
      style: {
        color: "rgb(9, 134, 88)",
      },
    },
    {
      types: ["operator"],
      style: {
        color: "rgb(0, 0, 0)",
      },
    },
    {
      types: ["constant", "char"],
      style: {
        color: "rgb(129, 31, 63)",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "rgb(128, 0, 0)",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "rgb(255, 0, 0)",
      },
    },
    {
      types: ["deleted", "string"],
      style: {
        color: "rgb(163, 21, 21)",
      },
    },
    {
      types: ["changed", "punctuation"],
      style: {
        color: "rgb(4, 81, 165)",
      },
    },
    {
      types: ["function", "keyword"],
      style: {
        color: "rgb(0, 0, 255)",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(38, 127, 153)",
      },
    },
  ],
}

export interface CodeBlockProps {}

const CodeBlock: React.FC<CodeBlockProps> = props => {
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  React.useEffect(() => {
    const refreshTheme = function (this: MediaQueryList) {
      setIsDarkMode(this.matches)
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", refreshTheme)

    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", refreshTheme)
    }
  }, [setIsDarkMode])

  const theme = isDarkMode ? darkTheme : lightTheme

  const className = (props.children as any).props.className || ""
  const matches = className.match(/language-(?<lang>.*)/)

  return (
    <Highlight
      {...defaultProps}
      code={(props.children as any).props.children.trim()}
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ""
      }
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`rounded-xl py-6 px-8 text-sm leading-relaxed overflow-auto ${
            !isDarkMode && "bg-gray-100"
          } ${className}`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
