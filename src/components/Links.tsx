import * as React from "react"
import { SiGithub, SiGmail, SiLinkedin, SiTwitter } from "react-icons/si"

const LinksItem: React.FC<{
  icon: React.ReactNode
  name: React.ReactNode
}> = ({ icon, name }) => (
  <li className="flex items-center gap-3 text-lg text-gray-800 font-normal transition dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-300 lg:gap-2 lg:text-base">
    {icon} {name}
  </li>
)

export interface LinksProps {}

const Links: React.FC<LinksProps> = () => {
  return (
    <ul className="flex flex-col gap-2 flex-wrap lg:flex-row lg:gap-x-5">
      <a href="https://www.linkedin.com/in/veselinromic/">
        <LinksItem icon={<SiLinkedin />} name={"veselinromic"} />
      </a>
      <a href="https://github.com/omegavesko">
        <LinksItem icon={<SiGithub />} name={"omegavesko"} />
      </a>
      <a href="https://twitter.com/omegavesko">
        <LinksItem icon={<SiTwitter />} name={"omegavesko"} />
      </a>
      <a href="mailto:hi@veselin.dev">
        <LinksItem icon={<SiGmail />} name={"hi@veselin.dev"} />
      </a>
    </ul>
  )
}

export default Links
