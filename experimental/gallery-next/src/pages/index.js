import Head from "next/head";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import data from "public/data/unsplash.json";
import Page from "@/partials/page/page";
import JustifiedLayout from "@/components/justified-layout/justified-layout";
import MasonryLayout from "@/components/masonry-layout/masonry-layout";

export default function App() {
    return (
        <>
            <Head>
                <title>Photo Gallery</title>
                <meta name="description" content="A photo gallery with different layouts." key="description" />
                <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />
            </Head>

            <Router>
                <Routes>
                    <Route path="/masonry" element={<Page id="masonry"><MasonryLayout data={data} /></Page>} />
                    <Route path="/" element={<Page id="justified"><JustifiedLayout data={data} /></Page>} />
                </Routes>
            </Router>
        </>
    );
}
