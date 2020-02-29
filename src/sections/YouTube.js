// import React from 'react';
// import { StaticQuery, graphql } from 'gatsby';
// import Fade from 'react-reveal/Fade';
// import Section from '../components/Section';
// import Triangle from '../components/Triangle';
// import { CardContainer } from '../components/Card';
// import SectionCard from '../components/SectionCard';

// const Background = () => (
//   <div>
//     <Triangle
//       color="backgroundDark"
//       height={['15vh', '10vh']}
//       width={['100vw', '100vw']}
//       invertX
//     />

//     <Triangle
//       color="secondary"
//       height={['50vh', '40vh']}
//       width={['70vw', '40vw']}
//       invertY
//     />

//     <Triangle
//       color="primaryDark"
//       height={['40vh', '15vh']}
//       width={['100vw', '100vw']}
//       invertX
//       invertY
//     />
//   </div>
// );

// const parseVideo = videoFromGraphql => {
//   const { id, date, title, description, videoId, thumbnail } = videoFromGraphql;

//   return {
//     id,
//     title,
//     date,
//     description,
//     image: thumbnail.url,
//     url: `https://youtu.be/${videoId}`,
//   };
// };

// const edgeToArray = data => data.edges.map(edge => edge.node);

// const YouTube = () => (
//   <StaticQuery
//     query={graphql`
//       query YouTubeVideoQuery {
//         isYoutubeUserDefine: __type(
//           name: "contentfulAboutYoutubeUserQueryString_2"
//         ) {
//           name
//         }
//         allYoutubeVideo(limit: 8, sort: { fields: publishedAt, order: DESC }) {
//           edges {
//             node {
//               id
//               title
//               description
//               videoId
//               date: publishedAt(formatString: "D MMM YYYY")
//               thumbnail {
//                 url
//               }
//             }
//           }
//         }
//       }
//     `}
//     render={({ allYoutubeVideo, isYoutubeUserDefine }) => {
//       const posts = edgeToArray(allYoutubeVideo).map(parseVideo);
//       return (
//         isYoutubeUserDefine && (
//           <Section.Container id="youtube" Background={Background}>
//             <Section.Header name="YouTube" icon="📺" label="youtube" />
//             <CardContainer minWidth="300px">
//               {posts.map(p => (
//                 <Fade bottom>
//                   <SectionCard key={p.id} {...p} />
//                 </Fade>
//               ))}
//             </CardContainer>
//           </Section.Container>
//         )
//       );
//     }}
//   />
// );

// export default YouTube;
