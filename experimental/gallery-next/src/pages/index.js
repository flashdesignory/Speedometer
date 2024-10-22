import Head from "next/head";

import data from "public/data/unsplash.json";
import Page from "@/partials/page/page"
import JustifiedLayout from "@/components/justified-layout/justified-layout";

export default function Home() {
    return (
        <>
          <Head>
                <title>Photos Justified!</title>
                <meta name="description" content="A justified layout for photos with Next.js." key="description" />
                <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />
            </Head>
            <Page id="index">
              <JustifiedLayout data={data} />
            </Page>
        </>
    );
}
