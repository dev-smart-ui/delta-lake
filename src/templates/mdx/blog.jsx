import * as React from "react";
import { graphql } from "gatsby";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import MDX from "src/components/MDX";
import { TypographyContainer } from "src/components/Typography";
import Section from "src/components/Section";
import styled from "styled-components";
import BlogAuthorsName from "src/components/BlogAuthorsName";
import CallToActions from "src/components/CallToActions";
import OneColumnLayout from "./components/OneColumnLayout";

const PostMeta = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.textSecondary};
  padding: 0 0 ${(props) => props.theme.spacing.md};
`;

const BlogMdxTemplate = ({ data, children }) => {
  const { frontmatter = {} } = data.mdx;
  const { title, author, date } = frontmatter;

  const renderPostMeta = () => (
    <PostMeta>
      {date} by <BlogAuthorsName name={author} />
    </PostMeta>
  );

  return (
    <PageLayout>
      <OneColumnLayout>
        <Section
          title={title}
          primary
          container={false}
          subtitle={renderPostMeta}
        >
          <TypographyContainer>
            <MDX>{children}</MDX>
          </TypographyContainer>
        </Section>
        <CallToActions authors={author} />
      </OneColumnLayout>
    </PageLayout>
  );
};

export const Head = ({ data }) => {
  const { frontmatter = {}, fields } = data.mdx;
  const { title, description, thumbnail } = frontmatter;
  const { slug } = fields;

  return (
    <SEO
      title={title}
      description={description}
      slug={slug}
      thumbnailPath={
        thumbnail?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
      }
    />
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        description
        author
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
        date(formatString: "MMMM D, YYYY")
      }
      fields {
        slug
      }
    }
  }
`;

export default BlogMdxTemplate;
