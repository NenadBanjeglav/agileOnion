import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import React from 'react'

type NewsletterPostProps = {
  postTitle: string
  postUrl: string
  postExcerpt?: string
  postImageUrl?: string
  logoUrl?: string
  unsubscribeUrl: string
  customMessage?: string
}

export function NewsletterPost({
  postTitle,
  postUrl,
  postExcerpt,
  postImageUrl,
  logoUrl,
  unsubscribeUrl,
  customMessage,
}: NewsletterPostProps) {
  return (
    <Html>
      <Head />
      <Preview>Novi tekst na Agile Onion blogu.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {logoUrl ? (
            <Img
              src={logoUrl}
              alt="Agile Onion"
              width="96"
              height="96"
              style={styles.logo}
            />
          ) : null}
          <Heading style={styles.heading}>Novi tekst na blogu</Heading>
          <Section>
            {customMessage ? (
              <Text style={styles.text}>{customMessage}</Text>
            ) : null}
            <Text style={styles.text}>{postTitle}</Text>
            {postImageUrl ? (
              <Img
                src={postImageUrl}
                alt={postTitle}
                width="600"
                height="360"
                style={styles.postImage}
              />
            ) : null}
            {postExcerpt ? <Text style={styles.text}>{postExcerpt}</Text> : null}
            <Link href={postUrl} style={styles.button}>
              Pročitaj tekst
            </Link>
            <Text style={styles.footer}>
              Ako više ne želiš da primaš ove mejlove, možeš da se odjaviš{' '}
              <Link href={unsubscribeUrl} style={styles.footerLink}>
                ovde
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '32px',
    margin: '0 auto',
    borderRadius: '12px',
    border: '1px solid #e5e5e5',
  },
  heading: {
    fontSize: '24px',
    margin: '0 0 16px',
    color: '#111827',
  },
  text: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#111827',
  },
  button: {
    backgroundColor: '#00b3d5',
    color: '#ffffff',
    padding: '12px 18px',
    borderRadius: '999px',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '12px 0 18px',
  },
  logo: {
    display: 'block',
    margin: '0 auto 16px',
  },
  postImage: {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    margin: '8px 0 16px',
  },
  footer: {
    fontSize: '13px',
    color: '#6b7280',
  },
  footerLink: {
    color: '#00b3d5',
    textDecoration: 'underline',
  },
}
