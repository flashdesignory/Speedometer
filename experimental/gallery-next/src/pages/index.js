import Head from "next/head";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Page from "@/partials/page/page";
import { DataContextProvider } from "@/context/data-context";
import MasonryLayout from "@/components/masonry-layout/masonry-layout";
import JustifiedLayout from "@/components/justified-layout/justified-layout";

export default function App() {
    return (
        <>
            <Head>
                <title>Photo Gallery</title>
                <meta name="description" content="A photo gallery with different layouts." key="description" />
                <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />
            </Head>
            <DataContextProvider>
                <Router>
                    <Routes>
                        <Route
                            path="/masonry"
                            element={
                                <Page id="masonry">
                                    <MasonryLayout />
                                </Page>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <Page id="justified">
                                    <JustifiedLayout />
                                </Page>
                            }
                        />
                    </Routes>
                </Router>
            </DataContextProvider>
        </>
    );
}
