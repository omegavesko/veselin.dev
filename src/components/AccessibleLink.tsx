import { Link } from "gatsby"
import * as React from "react"
import * as styles from "../styles/accessible-link.module.css"
import { GatsbyLinkProps } from "gatsby"

export interface AccessibleLinkProps {}

const AccessibleLink: React.FC<GatsbyLinkProps<any>> = ({
  children,
  ...props
}) => {
  return (
    <Link className={styles.link} {...(props as any)}>
      {children}
    </Link>
  )
}

export default AccessibleLink
