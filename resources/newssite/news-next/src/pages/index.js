import { useLayoutEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Page from "@/partials/page/page";
import Head from "next/head";
import { DataContextProvider } from "@/context/data-context";
import { connectToBenchmark } from "speedometer-utils/workload-testing-utils.mjs";
import { getBenchmarkSuitesManager } from "@/workload-test.mjs";

export default function App() {
    // Using 'useLayoutEffect' here, since this will connect the workload after all DOM mutations happened.
    // This ensures that all elemetns are in the DOM, prior to signaling to the Benchmark that the workload is ready to run a test suite.
    useLayoutEffect(() => {
        const disconnect = connectToBenchmark(getBenchmarkSuitesManager(), "news-next", 1);
        return disconnect;
    }, []);

    return (
        <>
            <Head>
                <title>The Daily Broadcast</title>
                <meta name="description" content="A news site developed with Next.js." key="description" />
            </Head>
            <DataContextProvider>
                <Router>
                    <Routes>
                        <Route path="/business" element={<Page id="business" />} />
                        <Route path="/health" element={<Page id="health" />} />
                        <Route path="/opinion" element={<Page id="opinion" />} />
                        <Route path="/politics" element={<Page id="politics" />} />
                        <Route path="/us" element={<Page id="us" />} />
                        <Route path="/world" element={<Page id="world" />} />
                        <Route path="/home" element={<Page id="home" />} />
                        <Route path="/" element={<Page id="home" />} />
                    </Routes>
                </Router>
            </DataContextProvider>
        </>
    );
}
