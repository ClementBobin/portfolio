/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://portfolio-clement.vercel.app',
	generateRobotsTxt: true,
	changefreq: 'weekly',
	priority: 0.7,
	sitemapSize: 5000,
	exclude: ['/private', '/api/*'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
		],
	},
};