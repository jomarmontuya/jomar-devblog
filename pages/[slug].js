import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { createHash } from 'crypto'
import Head from 'next/head'

const BlogPost = ({ post, blockMap, emailHash }) => {
    console.log(post)
    // console.log(blockMap )

    //Generate JSON LD Blog Schmema
    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BLOG.link}/${post?.slug}`,
        },
        author: {
            '@type': 'Person',
            name: BLOG.author,
        },
        description: post?.summary,
        headline: post?.title,
        // image: {
        //     '@type': 'ImageObject',
        //     url: post.cover.url,
        // },
        datePublished: post?.date,
        dateModified: post?.date,
    }

    console.log(blogSchema)

    if (!post) return null
    return (
        <>
            <Head>
                {/* Generate JSON LD */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
            </Head>
            <Layout blockMap={blockMap} frontMatter={post} emailHash={emailHash} fullWidth={post.fullWidth} />
        </>
    )
}

export async function getStaticPaths() {
    const posts = await getAllPosts({ includePages: true })
    return {
        paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
        fallback: true,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const posts = await getAllPosts({ includePages: true })
    const post = posts.find((t) => t.slug === slug)
    const blockMap = await getPostBlocks(post.id)
    const emailHash = createHash('md5').update(BLOG.email).digest('hex').trim().toLowerCase()

    return {
        props: { post, blockMap, emailHash },
        revalidate: 1,
    }
}

export default BlogPost
