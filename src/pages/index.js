import 'normalize.css'

import React from "react"
import styled from "styled-components"
import Helmet from "react-helmet"

import { config, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import SEO from "../components/seo"

import background from '../images/background.png'
import avatar from '../images/avatar.jpg'

config.autoAddCss = false;

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:300,400,500,600');

  min-height: 100vh;

  background: #1c1c1c url(${background}) center/cover;
  color: #eee;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Barlow Semi Condensed', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const Content = styled.div`
  text-align: center;
  text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.75);
`

const Avatar = styled.img`
  width: 10rem;
  border-radius: 50%;
  border: 0.25rem solid #eee;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
`

const Name = styled.h1`
  font-size: 3.5rem;
  margin: 0 0 -0.35rem 0;
  font-weight: 300;
`

const Tagline = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 400;
`

const SocialIcons = styled.section`
  margin-top: 1rem;
  a {
    color: inherit;
    .icon {
      margin: 0 0.25rem;
      transition: transform .2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }
  }
`

const Introduction = styled.section`
  font-weight: 300;
  margin: 1rem;

  font-size: 1.4rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.75);

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
    font-weight: 400;

    transition: border 300ms ease;

    &:hover {
      border-bottom: 1px solid rgba(255, 255, 255, 1);
    }
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;
    br {
      display: none;
    }
  }
`

const IndexPage = () => (
  <>
    <Helmet>
      <style>
        {/* Inline the FontAwesome CSS manually to prevent a flash of huge icons before the clientside JS loads */}
        {dom.css()}
      </style>
    </Helmet>
    <SEO keywords={[`veselin`, `romić`, `developer`]} />
    <Container>
      <Content>
        <Avatar src={avatar}></Avatar>
        <Name>Veselin Romić</Name>
        <Tagline>Software Engineer</Tagline>
        <SocialIcons>
          <a href="https://www.linkedin.com/in/veselinromic/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className="icon" icon={faLinkedin} size="2x" />
          </a>
          <a href="https://twitter.com/omegavesko" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className="icon" icon={faTwitterSquare} size="2x" />
          </a>
          <a href="https://github.com/omegavesko" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className="icon" icon={faGithubSquare} size="2x" />
          </a>
        </SocialIcons>
        <Introduction>
          <p>Hi! I'm Veselin.</p>
          <p>I help build and maintain <a href="https://poslovi.infostud.com/" target="_blank" rel="noopener noreferrer">poslovi.infostud.com</a>, <br/>the largest job board in Serbia.</p>
          <p>I also work on a lot of interesting things at <a href="https://solpress.co/" target="_blank" rel="noopener noreferrer">Sol Press</a>.</p>
          <p>Want to get in touch? Use the social buttons above, <br/>or email me at <a href="mailto:omegavesko@gmail.com">omegavesko@gmail.com</a>.</p>
        </Introduction>
      </Content>
    </Container>
  </>
)

export default IndexPage
