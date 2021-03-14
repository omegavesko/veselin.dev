import * as React from "react"
import {
  SiToptal,
  SiLinkedin,
  SiGithub,
  SiGmail,
  SiTwitter
} from "react-icons/si"

export interface IndexPageProps {}

const Links: React.FC = () => (
  <ul className="flex flex-col gap-2 flex-wrap lg:flex-row lg:gap-x-5">
    <LinksItem icon={<SiToptal />} name={"veselin.romic"} />
    <LinksItem icon={<SiLinkedin />} name={"veselinromic"} />
    <LinksItem icon={<SiGithub />} name={"omegavesko"} />
    <LinksItem icon={<SiTwitter />} name={"omegavesko"} />
    <LinksItem icon={<SiGmail />} name={"hi@veselin.dev"} />
  </ul>
)

const LinksItem: React.FC<{
  icon: React.ReactNode
  name: React.ReactNode
}> = ({ icon, name }) => (
  <li className="flex items-center gap-3 text-lg text-gray-800 font-normal lg:gap-2 lg:text-base">
    {icon} {name}
  </li>
)

const Section: React.FC<{ title: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h2 className="mb-4 text-4xl text-gray-800 font-medium leading-tight">
      {title}
    </h2>
    {children}
  </section>
)

const TextSection: React.FC<{ title: React.ReactNode }> = ({
  title,
  children
}) => (
  <Section title={title}>
    <div className="flex flex-col gap-4 text-lg">{children}</div>
  </Section>
)

const Highlight: React.FC = ({ children }) => (
  <span className="text-blue-700">{children}</span>
)

const CVItem: React.FC<{
  title: React.ReactNode
  details: React.ReactNode
  active?: boolean
}> = ({ title, details, active = false, children }) => (
  <div
    className={`px-6 py-6 border-2 ${
      active ? "border-gray-800" : "border-gray-300"
    }`}
  >
    <h3 className="mb-1 text-3xl text-gray-800 leading-tight">{title}</h3>
    <span className="block mb-4 text-gray-800">{details}</span>
    {children}
  </div>
)

const Tags: React.FC = ({ children }) => (
  <div className="mt-4 flex flex-wrap gap-1">{children}</div>
)

const Tag: React.FC = ({ children }) => (
  <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
    {children}
  </span>
)

const IndexPage: React.FC<IndexPageProps> = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto px-8 pt-12 pb-8">
        <h1 className="mb-4 text-6xl text-gray-800 font-medium leading-none">
          Veselin Romić
        </h1>
        <p className="mb-6 text-lg">Turning ☕ into 💾 since 19XX</p>

        <Links />

        {/* Main */}
        <div className="mt-8 flex flex-col gap-8">
          <TextSection title="About me">
            <p>
              👋 Hi! I'm Veselin, a <Highlight>software engineer</Highlight>{" "}
              with more than {new Date().getFullYear() - 2017} years of
              professional experience building and maintaining digital products,
              with a focus on the Web.
            </p>
          </TextSection>
          <TextSection title="About you (hopefully?)">
            <p>
              You're a company with a{" "}
              <Highlight>sustainable, ethical business model</Highlight> that
              doesn't harm your employees, your users, or the planet.
            </p>
            <p>
              You know that the best products are made by{" "}
              <Highlight>diverse, inclusive, autonomous teams</Highlight>, and
              that engineering is the heart of your company, not just a cost
              center to be micromanaged.
            </p>
            <p>
              Ideally, you're a <Highlight>remote</Highlight> company (or offer
              remote roles), but I'm open to relocating to{" "}
              <Highlight>the EU</Highlight> or <Highlight>Japan</Highlight> for
              the right role.
            </p>
          </TextSection>
          <TextSection title="Tech">
            <p>
              I specialize in building APIs, websites and cutting-edge web
              applications using tools like <Highlight>modern PHP</Highlight>{" "}
              and <Highlight>JavaScript</Highlight>.
            </p>
            <p>
              While I greatly enjoy the power and productivity of the modern JS
              ecosystem, I strongly prefer actually writing code in{" "}
              <Highlight>TypeScript</Highlight> (or a comparable
              statically-typed language), rather than vanilla JS.{" "}
              <span className="text-base text-gray-500">
                (For what it's worth, most of the JS community seems to agree
                with me on this these days.)
              </span>
            </p>
            <p>
              I have years of experience building fast, stable and maintainable
              backend systems, based on <Highlight>PHP</Highlight> or{" "}
              <Highlight>Node.js</Highlight>, and exposing a{" "}
              <Highlight>REST</Highlight> or <Highlight>GraphQL</Highlight> API.
            </p>
            <p>
              When it comes to building websites and user interfaces, I'm
              heavily invested into <Highlight>React</Highlight> and the tools
              that build on top of it (<Highlight>Gatsby</Highlight>,{" "}
              <Highlight>Next.js</Highlight>, etc.), but I'm also open to
              working with other frameworks, like <Highlight>Vue.js</Highlight>{" "}
              or <Highlight>Svelte</Highlight>.
            </p>
            <p>
              Or course, I'm also{" "}
              <Highlight>always open to learning new things</Highlight>, so I'm
              by no means restricting myself to the tech that I've listed here.
            </p>
          </TextSection>
          <Section title="Experience">
            <div className="flex flex-col gap-5">
              <CVItem
                title="Infostud Group"
                details={
                  <>
                    <span className="whitespace-nowrap">
                      Software Developer &middot;
                    </span>{" "}
                    <span className="whitespace-nowrap">
                      Full-time &middot;
                    </span>{" "}
                    <span className="whitespace-nowrap">
                      2017 &mdash; current
                    </span>
                  </>
                }
                active={true}
              >
                <div className="text-gray-800">
                  At Infostud I participated in the development of greenfield
                  projects across the entire stack (frontend, backend, DevOps),
                  as well as being responsible for maintenance of legacy code,
                  as part of Poslovi Infostud and HR Lab &mdash; the leading
                  platforms for job seekers and employers in Serbia.
                  Technology-wise, I primarily worked with PHP and
                  JavaScript/TypeScript, and deployed (new) projects as Docker
                  images to an internal Kubernetes cluster.
                  <ul className="cv-item-bullets mt-3 flex flex-col gap-3">
                    <li>
                      Participated in the rewrite of Poslovi Infostud's ATS
                      product (
                      <a href="https://prijava.infostud.com/">HR Lab ATS</a>)
                      using modern technologies such as PHP 7, React, GraphQL,
                      Docker, and Kubernetes. HR Lab ATS is now the most
                      widely-used ATS software in Serbia.
                    </li>
                    <li>
                      Maintained{" "}
                      <a href="https://prijava.infostud.com/">
                        Poslovi.infostud.com
                      </a>
                      , the leading job board in Serbia, with over 1 million
                      monthly unique users.
                    </li>
                    <li>
                      Built the current iteration of{" "}
                      <a href="https://prijava.infostud.com/">HRLab.rs</a>, the
                      website for the HR Lab brand, in collaboration with a
                      designer using React and Gatsby. Improved site performance
                      by 300% compared to the previous iteration of the site.
                    </li>
                    <li>
                      Implemented CI/CD pipelines for the team's codebases using
                      GitLab CI/CD, Docker, Kubernetes, and Helm.
                    </li>
                    <li>
                      Built HR Lab Payments, an internal payment platform that
                      integrates with PayPal and NestPay to enable HR Lab
                      products to quickly and easily accept payments by credit
                      card and other payment methods.
                    </li>
                    <li>
                      Built{" "}
                      <a href="https://prijava.infostud.com/">
                        prijava.infostud.com
                      </a>
                      , an OAuth 2-based front end for Infostud's internal LDAP
                      database. This resulted in a significantly friendlier user
                      experience for employees logging into internal tools.
                    </li>
                    <li>
                      Built{" "}
                      <a href="https://prijava.infostud.com/">
                        accounts.hrlab.rs
                      </a>
                      , an OAuth 2-based identity server for the HR Lab
                      platform. This enabled all other HR Lab products to easily
                      authenticate users through a central location.
                    </li>
                  </ul>
                </div>
                <Tags>
                  <Tag>PHP</Tag>
                  <Tag>JavaScript</Tag>
                  <Tag>TypeScript</Tag>
                  <Tag>Symfony</Tag>
                  <Tag>React</Tag>
                  <Tag>Docker</Tag>
                  <Tag>Kubernetes</Tag>
                  <Tag>GraphQL</Tag>
                  <Tag>Gatsby</Tag>
                  <Tag>DevOps</Tag>
                </Tags>
              </CVItem>
              <CVItem
                title="Sol Press"
                details={
                  <>
                    <span className="whitespace-nowrap">
                      Software Developer &middot;
                    </span>{" "}
                    <span className="whitespace-nowrap">
                      Freelance &middot;
                    </span>{" "}
                    <span className="whitespace-nowrap">2017 &mdash; 2020</span>
                  </>
                }
              >
                <div className="text-gray-800">
                  I worked on various projects for Sol Press over the course of
                  a few years, largely being responsible for building their
                  presence on the Web from scratch.
                  <ul className="cv-item-bullets mt-3 flex flex-col gap-3">
                    <li>
                      Built and maintained the corporate website (
                      <a href="#">solpress.co</a>). The website was initially
                      written in PHP (Laravel), and later reimagined as an
                      API-based application with WordPress as a headless CMS and
                      Laravel on the backend, and Vue.js (Nuxt.js) on the
                      frontend.
                    </li>
                    <li>
                      Built several one-off landing pages in a variety of
                      technologies.
                    </li>
                    <li>
                      Built a bespoke in-house CMS for landing page management,
                      written in PHP (Laravel) and Vue.js.
                    </li>
                    <li>
                      Set up a Shopify store at <a href="#">shop.solpress.co</a>
                      .
                    </li>
                  </ul>
                </div>
                <Tags>
                  <Tag>PHP</Tag>
                  <Tag>JavaScript</Tag>
                  <Tag>Vue.js</Tag>
                  <Tag>Laravel</Tag>
                  <Tag>Nuxt.js</Tag>
                  <Tag>WordPress</Tag>
                  <Tag>DevOps</Tag>
                </Tags>
              </CVItem>
              <CVItem
                title="Execom"
                details={
                  <>
                    <span className="whitespace-nowrap">Intern &middot;</span>{" "}
                    <span className="whitespace-nowrap">
                      Mar 2017 &mdash; Apr 2017
                    </span>
                  </>
                }
              >
                <div className="text-gray-800">
                  During my internship at Execom, I worked independently on
                  multiple Web-based projects for several weeks, using
                  technologies such as PHP (with the Symfony framework) and
                  AngularJS.
                </div>
                <Tags>
                  <Tag>PHP</Tag>
                  <Tag>JavaScript</Tag>
                  <Tag>Symfony</Tag>
                  <Tag>AngularJS</Tag>
                </Tags>
              </CVItem>
            </div>
          </Section>
          <Section title="Get in touch!">
            <Links />
          </Section>
        </div>
      </div>
      <footer className="flex items-center justify-center py-6 bg-gray-50 text-gray-600">
        <span>
          Built with ❤ using{" "}
          <a className="text-gray-600" href="https://prijava.infostud.com/">
            React
          </a>{" "}
          and{" "}
          <a className="text-gray-600" href="https://prijava.infostud.com/">
            Gatsby
          </a>
          .
        </span>
      </footer>
    </>
  )
}

export default IndexPage
