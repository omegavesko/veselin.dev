import * as React from "react"

const StandardLink: React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = ({ children, className, ...props }) => (
  <a
    className={`${className} text-gray-800 font-medium underline dark:text-gray-200`}
    {...props}
  >
    {children}
  </a>
)

export default StandardLink
