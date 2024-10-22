import Layout from "@/partials/layout/layout";

export default function Page({ id, children }) {
    return (
        <>
            <Layout id={id}>{children}</Layout>
        </>
    );
}
