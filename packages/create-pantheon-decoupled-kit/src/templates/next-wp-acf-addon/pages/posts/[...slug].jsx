import { NextSeo } from 'next-seo';
import { ContentWithImage } from '@pantheon-systems/nextjs-kit';
import { setOutgoingHeaders } from '../../lib/setOutgoingHeaders';

import Layout from '../../components/layout';
import PageHeader from '../../components/page-header';

import { PostGridItem } from '../../components/grid';
import { withGrid } from '@pantheon-systems/nextjs-kit';

import { getFooterMenu } from '../../lib/Menus';
import { getPostByUri, getPostPreview } from '../../lib/Posts';

export default function PostTemplate({ menuItems, post, preview }) {
	const PostGrid = withGrid(PostGridItem);

	return (
		<Layout footerMenu={menuItems} preview={preview}>
			<NextSeo
				title="Decoupled Next WordPress Demo"
				description="Generated by create next app."
			/>
			<ContentWithImage
				title={post.title}
				content={post.content}
				date={new Date(post.date).toDateString()}
				imageProps={
					post.featuredImage
						? {
								src: post.featuredImage?.node.sourceUrl,
								alt: post.featuredImage?.node.altText,
						  }
						: undefined
				}
				contentClassName="ps-wp-content"
			/>
			{post.relatedContent?.relatedContent ? (
				<section>
					<header className="prose text-2xl mx-auto mt-20">
						<h2 className="text-center mx-auto">Related Content</h2>
					</header>
					<PostGrid
						contentType="posts"
						data={post.relatedContent.relatedContent}
					/>
				</section>
			) : null}
		</Layout>
	);
}

export async function getServerSideProps({
	params: { slug },
	res,
	preview,
	previewData,
}) {
	const { menuItems, menuItemHeaders } = await getFooterMenu();
	const { post, headers: postHeaders = false } = preview
		? await getPostPreview(previewData.key)
		: await getPostByUri(slug);

	if (!post) {
		return {
			notFound: true,
		};
	}

	const headers = postHeaders && [menuItemHeaders, postHeaders];
	headers.length > 0 && setOutgoingHeaders({ headers, res });

	return {
		props: {
			menuItems,
			post,
			preview: Boolean(preview),
		},
	};
}
