import Signers from "@/components/Signers";
import GetStarted from "@/components/GetStarted";
import Events from "@/components/Events";
import Nav from "@/components/site/Nav";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Nav />
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
              <GetStarted />
              <Signers />
              <Events />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
