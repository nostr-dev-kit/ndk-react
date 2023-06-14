import Head from "next/head";

import GetProfile from "@/components/getProfile";
import Install from "@/components/install";
import Provider from "@/components/provider";

export default function Home() {
  return (
    <>
      <Head>
        <title>@nostr-dev-kit/ndk-react</title>
        <meta
          name="description"
          content="NDK React is a React library that makes it easy to build Nostr-related applications using React (and NextJS)."
        />
      </Head>
      <main className="">
        <div className="bg-white px-6 py-32 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-slate mx-auto lg:prose-lg">
              <h1>@nostr-dev-kit/ndk-react</h1>
              <p>
                NDK-React is a React library that makes it easy to build
                Nostr-related applications using React (and NextJS). It provides
                a set of components that wrap the NDK library and make it easy
                to use in React.
              </p>
              <Install />
              <Provider />
              <GetProfile />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
