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

type NewsletterWelcomeProps = {
  latestPostUrl: string
  latestPostTitle?: string
  latestPostImageUrl?: string
  logoUrl?: string
}

export function NewsletterWelcome({
  latestPostUrl,
  latestPostTitle,
  latestPostImageUrl,
  logoUrl,
}: NewsletterWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Hvala ti na pretplati – dobrodošao/la u Agile Onion.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {logoUrl ? (
            <Img
              src={logoUrl}
              alt="Agile Onion"
              style={styles.logo}
            />
          ) : null}
          <Heading style={styles.heading}>Dobrodošao/la u Agile Onion</Heading>
          <Section>
            <Text style={styles.text}>Pozdrav,</Text>
            <Text style={styles.text}>
              Hvala ti što si se pretplatio/la na Agile Onion. Ovo nije klasičan
              newsletter. Ovde dobijaš konceptualni pristup razvoju mindseta,
              karijere i konkretnih veština. Ovo je blog za sve one ljude koji
              žele sledeći nivo razvoja.
            </Text>
            <Text style={styles.text}>Šta možeš očekivati:</Text>
            <Text style={styles.listItem}>
              - Tri kvalitetna teksta svakog meseca sa fokusom na agilne
              principe koji se mogu odmah primeniti;
            </Text>
            <Text style={styles.listItem}>
              - Alate i metode za pobednički mindset i održiv profesionalni
              razvoj;
            </Text>
            <Text style={styles.listItem}>
              - Inspiraciju i smernice za planiranje sledećih koraka u tvojoj
              karijeri.
            </Text>
            <Text style={styles.text}>
              Kao prvi korak, pročitaj najnoviji tekst na blogu i započni svoj
              prvi sprint:
            </Text>
            {latestPostImageUrl ? (
              <Img
                src={latestPostImageUrl}
                alt={latestPostTitle ?? 'Najnoviji tekst na blogu'}
                width="600"
                height="360"
                style={styles.postImage}
              />
            ) : null}
            <Link href={latestPostUrl} style={styles.link}>
              {latestPostTitle ?? 'Najnoviji tekst na blogu'}
            </Link>
            <Text style={styles.text}>S poštovanjem,</Text>
            <Text style={styles.signature}>Agile Onion</Text>
            <Text style={styles.psLabel}>PS:</Text>
            <Text style={styles.text}>
              Odvoji 5 minuta za sebe i napiši odgovor na jedno pitanje: Koji
              je to sledeći korak u mom razvoju koji već dugo odlažem? Ne moraš
              ništa da menjaš još, samo postani svestan/na toga.
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
  listItem: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#111827',
    margin: '0 0 4px',
  },
  link: {
    color: '#00b3d5',
    textDecoration: 'underline',
  },
  logo: {
    display: 'block',
    margin: '0 auto 16px',
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
  },
  postImage: {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    margin: '8px 0 16px',
  },
  signature: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
  },
  psLabel: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
    marginTop: '16px',
  },
}
