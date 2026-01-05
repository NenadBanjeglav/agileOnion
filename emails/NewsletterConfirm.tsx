import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import React from 'react'

type NewsletterConfirmProps = {
  confirmUrl: string
}

export function NewsletterConfirm({confirmUrl}: NewsletterConfirmProps) {
  return (
    <Html>
      <Head />
      <Preview>Još jedan korak — potvrdi pretplatu na Agile Onion.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>
            Potvrdi svoju prijavu na Agile Onion
          </Heading>
          <Section>
            <Text style={styles.text}>Pozdrav,</Text>
            <Text style={styles.text}>
              Hvala ti što si se prijavio/la na Agile Onion. Da bismo bili
              sigurni da je ovo tvoja adresa, klikni na dugme ispod i potvrdi
              prijavu.
            </Text>
            <Button href={confirmUrl} style={styles.button}>
              Potvrdi prijavu
            </Button>
            <Text style={styles.text}>
              Ako nisi ti slao/la ovu prijavu, slobodno ignoriši ovu poruku.
            </Text>
            <Text style={styles.text}>S poštovanjem,</Text>
            <Text style={styles.signature}>Agile Onion</Text>
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
  signature: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
  },
}
