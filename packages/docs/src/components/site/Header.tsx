import Head from "next/head";

export default function Header() {
  return (
    <Head>
      <title>@nostr-dev-kit/ndk-react</title>
      <meta
        name="description"
        content="NDK React is a React library that makes it easy to build Nostr-related applications using React (and NextJS)."
      />
      <link
        rel="icon"
        sizes="32x32"
        href="/ndk.svg"
      />
    </Head>
  );
}
