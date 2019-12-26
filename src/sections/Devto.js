import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import TagText from '../components/TagText';
import ImageSubtitle from '../components/ImageSubtitle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="secondary"
      height={['50vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const Post = ({ title, text, image, url, date, tags }) => (
  <Card onClick={() => window.open(url, '_blank')} pb={4}>
    <EllipsisHeading m={3} p={1}>
      {title}
    </EllipsisHeading>
    {image && <CoverImage src={image} height="200px" alt={title} />}
    <Text m={3}>
      {`${text} `}
      <TagText>{`${tags.map(tag => ` #${tag}`).join('')}`}</TagText>
    </Text>
    <ImageSubtitle bg="primaryLight" color="white" x="right" y="bottom" round>
      {date}
    </ImageSubtitle>
  </Card>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

const parsePost = postFromGraphql => {
  // eslint-disable-next-line camelcase
  const {
    id,
    title,
    description,
    cover_image,
    canonical_url,
    created_at,
    tags,
  } = postFromGraphql.article;
  return {
    id,
    title,
    date: created_at,
    text: description,
    image: cover_image,
    url: canonical_url,
    tags,
  };
};

const edgeToArray = data => data.edges.map(edge => edge.node);

const Devto = () => (
  <StaticQuery
    query={graphql`
      query DevtoPostQuery {
        site {
          siteMetadata {
            isDevtoUserDefined
          }
        }
        allDevArticles(
          limit: 6
          sort: { fields: article___created_at, order: DESC }
        ) {
          edges {
            node {
              article {
                id
                title
                description
                cover_image
                canonical_url
                created_at(formatString: "MMM YYYY")
                tags
              }
            }
          }
        }
      }
    `}
    render={({ allDevArticles, site }) => {
      const { isDevtoUserDefined } = site.siteMetadata;
      const posts = edgeToArray(allDevArticles).map(parsePost);
      return (
        isDevtoUserDefined && (
          <Section.Container id="writing" Background={Background}>
            <Section.Header name="Writing" icon="✍️" label="writing" />
            <CardContainer minWidth="300px">
              {posts.map(p => (
                <Fade key={p.id} bottom>
                  <Post key={p.id} {...p} />
                </Fade>
              ))}
            </CardContainer>
          </Section.Container>
        )
      );
    }}
  />
);

export default Devto;
