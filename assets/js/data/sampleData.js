let articlesCache = null;

export async function loadArticles() {
    if (articlesCache) {
        return articlesCache;
    }
    
    try {
        const response = await fetch('/api/articles-list');
        const data = await response.json();
        const articleIds = data.articleIds;
        
        const articleModules = await Promise.all(
            articleIds.map(async (id) => {
                try {
                    const module = await import(`./articles/article-${id}.js`);
                    const articleKey = Object.keys(module).find(key => key.startsWith('article'));
                    return module[articleKey];
                } catch (error) {
                    console.error(`Error loading article ${id}:`, error);
                    return null;
                }
            })
        );
        
        articlesCache = articleModules.filter(article => article !== null);
        return articlesCache;
    } catch (error) {
        console.error('Error fetching articles list:', error);
        return [];
    }
}

import { article1 } from './articles/article-1.js';
import { article2 } from './articles/article-2.js';
import { article3 } from './articles/article-3.js';
import { article4 } from './articles/article-4.js';

export const articles = [
    article4,
    article3,
    article2,
    article1
];
